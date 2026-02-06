import { prisma } from '../config/database';
import {
  InvoiceStatus,
  SdiStatus,
  RecipientType,
  FatturaType,
  PaymentMethodCode,
  PaymentStatus,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  total: number;
}

interface CreateInvoiceInput {
  schoolId: string;
  recipientType: RecipientType;
  recipientName: string;
  recipientAddress: {
    street: string;
    city: string;
    province: string;
    cap: string;
    country: string;
  };
  recipientVatNumber?: string;
  recipientFiscalCode?: string;
  recipientCodiceSDI?: string;
  recipientPEC?: string;
  lineItems: LineItem[];
  documentType?: FatturaType;
  paymentMethod?: PaymentMethodCode;
  paymentTerms?: string;
  dueDate?: Date;
  notes?: string;
  isElectronic?: boolean;
}

interface InstallmentPlanInput {
  enrollmentId: string;
  totalAmount: number;
  numberOfInstallments: number;
  startDate: Date;
  frequency: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'QUARTERLY';
}

export class InvoiceService {
  // ============================================
  // INVOICE NUMBER GENERATION
  // ============================================

  private static async generateInvoiceNumber(schoolId: string, year: number): Promise<string> {
    // Get the count of invoices for this school in this year
    const count = await prisma.invoice.count({
      where: {
        schoolId,
        invoiceDate: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
    });

    // Format: YYYY/NNNN (e.g., 2024/0001)
    const number = (count + 1).toString().padStart(4, '0');
    return `${year}/${number}`;
  }

  // ============================================
  // INVOICE CREATION
  // ============================================

  static async createInvoice(input: CreateInvoiceInput) {
    const year = new Date().getFullYear();
    const invoiceNumber = await this.generateInvoiceNumber(input.schoolId, year);

    // Calculate totals
    const subtotal = input.lineItems.reduce((sum, item) => sum + item.total, 0);
    const vatRate = input.lineItems[0]?.vatRate || 22; // Default Italian VAT
    const vatAmount = subtotal * (vatRate / 100);
    const totalAmount = subtotal + vatAmount;

    return prisma.invoice.create({
      data: {
        schoolId: input.schoolId,
        invoiceNumber,
        invoiceDate: new Date(),
        dueDate: input.dueDate,
        subtotal: new Decimal(subtotal),
        vatRate: new Decimal(vatRate),
        vatAmount: new Decimal(vatAmount),
        totalAmount: new Decimal(totalAmount),
        status: InvoiceStatus.DRAFT,
        isElectronic: input.isElectronic ?? false,
        recipientType: input.recipientType,
        recipientCodiceSDI: input.recipientCodiceSDI,
        recipientPEC: input.recipientPEC,
        recipientVatNumber: input.recipientVatNumber,
        recipientFiscalCode: input.recipientFiscalCode,
        documentType: input.documentType ?? FatturaType.TD01,
        paymentMethod: input.paymentMethod,
        paymentTerms: input.paymentTerms,
        lineItems: input.lineItems as any,
        notes: input.notes,
      },
      include: {
        school: true,
      },
    });
  }

  static async createInvoiceFromEnrollment(
    enrollmentId: string,
    options?: {
      isElectronic?: boolean;
      recipientType?: RecipientType;
      recipientCodiceSDI?: string;
      recipientPEC?: string;
    }
  ) {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        course: {
          include: {
            school: true,
          },
        },
      },
    });

    if (!enrollment) {
      throw new Error('Enrollment not found');
    }

    const lineItems: LineItem[] = [
      {
        description: `Iscrizione al corso: ${enrollment.course.name}`,
        quantity: 1,
        unitPrice: Number(enrollment.amountDue || enrollment.course.price || 0),
        vatRate: 22,
        total: Number(enrollment.amountDue || enrollment.course.price || 0),
      },
    ];

    return this.createInvoice({
      schoolId: enrollment.course.schoolId,
      recipientType: options?.recipientType ?? RecipientType.B2C,
      recipientName: enrollment.student.user.name,
      recipientAddress: {
        street: '',
        city: '',
        province: '',
        cap: '',
        country: 'IT',
      },
      recipientCodiceSDI: options?.recipientCodiceSDI,
      recipientPEC: options?.recipientPEC,
      lineItems,
      isElectronic: options?.isElectronic ?? false,
    });
  }

  // ============================================
  // INVOICE STATUS MANAGEMENT
  // ============================================

  static async issueInvoice(invoiceId: string) {
    return prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: InvoiceStatus.ISSUED,
      },
    });
  }

  static async markAsSent(invoiceId: string) {
    return prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: InvoiceStatus.SENT,
      },
    });
  }

  static async markAsPaid(invoiceId: string) {
    return prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: InvoiceStatus.PAID,
        paidAt: new Date(),
      },
    });
  }

  static async cancelInvoice(invoiceId: string) {
    return prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        status: InvoiceStatus.CANCELLED,
      },
    });
  }

  // ============================================
  // ITALIAN ELECTRONIC INVOICING (SDI)
  // ============================================

  static async generateFatturaPA(invoiceId: string): Promise<string> {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        school: true,
      },
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (!invoice.isElectronic) {
      throw new Error('Invoice is not marked for electronic invoicing');
    }

    // Validate required fields for electronic invoice
    if (!invoice.school.vatNumber) {
      throw new Error('School VAT number (Partita IVA) is required for electronic invoicing');
    }

    if (!invoice.recipientCodiceSDI && !invoice.recipientPEC) {
      throw new Error('Either Codice Destinatario SDI or PEC is required');
    }

    // Generate FatturaPA XML
    const xml = this.generateFatturaPAXml(invoice);

    // In production, you would:
    // 1. Sign the XML with a qualified digital certificate
    // 2. Send to SDI (Sistema di Interscambio)
    // For now, we just return the XML

    // Update invoice with XML
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        xmlUrl: `invoices/${invoiceId}/fattura.xml`, // Would be actual storage URL
        sdiStatus: SdiStatus.NOT_SENT,
      },
    });

    return xml;
  }

  private static generateFatturaPAXml(invoice: any): string {
    const lineItems = invoice.lineItems as LineItem[];

    // Simplified FatturaPA XML structure
    // In production, this would be a complete, valid FatturaPA 1.2 XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<p:FatturaElettronica xmlns:p="http://ivaservizi.agenziaentrate.gov.it/docs/xsd/fatture/v1.2"
                       xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       versione="FPR12">
  <FatturaElettronicaHeader>
    <DatiTrasmissione>
      <IdTrasmittente>
        <IdPaese>IT</IdPaese>
        <IdCodice>${invoice.school.vatNumber}</IdCodice>
      </IdTrasmittente>
      <ProgressivoInvio>${invoice.invoiceNumber.replace('/', '')}</ProgressivoInvio>
      <FormatoTrasmissione>${invoice.recipientType === 'PA' ? 'FPA12' : 'FPR12'}</FormatoTrasmissione>
      <CodiceDestinatario>${invoice.recipientCodiceSDI || '0000000'}</CodiceDestinatario>
      ${invoice.recipientPEC ? `<PECDestinatario>${invoice.recipientPEC}</PECDestinatario>` : ''}
    </DatiTrasmissione>
    <CedentePrestatore>
      <DatiAnagrafici>
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>${invoice.school.vatNumber}</IdCodice>
        </IdFiscaleIVA>
        ${invoice.school.fiscalCode ? `<CodiceFiscale>${invoice.school.fiscalCode}</CodiceFiscale>` : ''}
        <Anagrafica>
          <Denominazione>${escapeXml(invoice.school.name)}</Denominazione>
        </Anagrafica>
        <RegimeFiscale>RF01</RegimeFiscale>
      </DatiAnagrafici>
      <Sede>
        <Indirizzo>${escapeXml(invoice.school.legalAddress?.street || invoice.school.billingAddress?.street || 'N/A')}</Indirizzo>
        <CAP>${invoice.school.legalAddress?.cap || invoice.school.billingAddress?.zip || '00000'}</CAP>
        <Comune>${escapeXml(invoice.school.legalAddress?.city || invoice.school.billingAddress?.city || 'N/A')}</Comune>
        <Provincia>${invoice.school.legalAddress?.province || 'XX'}</Provincia>
        <Nazione>IT</Nazione>
      </Sede>
    </CedentePrestatore>
    <CessionarioCommittente>
      <DatiAnagrafici>
        ${invoice.recipientVatNumber ? `
        <IdFiscaleIVA>
          <IdPaese>IT</IdPaese>
          <IdCodice>${invoice.recipientVatNumber}</IdCodice>
        </IdFiscaleIVA>` : ''}
        ${invoice.recipientFiscalCode ? `<CodiceFiscale>${invoice.recipientFiscalCode}</CodiceFiscale>` : ''}
      </DatiAnagrafici>
    </CessionarioCommittente>
  </FatturaElettronicaHeader>
  <FatturaElettronicaBody>
    <DatiGenerali>
      <DatiGeneraliDocumento>
        <TipoDocumento>${invoice.documentType}</TipoDocumento>
        <Divisa>${invoice.currency}</Divisa>
        <Data>${invoice.invoiceDate.toISOString().split('T')[0]}</Data>
        <Numero>${invoice.invoiceNumber}</Numero>
        <ImportoTotaleDocumento>${Number(invoice.totalAmount).toFixed(2)}</ImportoTotaleDocumento>
      </DatiGeneraliDocumento>
    </DatiGenerali>
    <DatiBeniServizi>
      ${lineItems.map((item, index) => `
      <DettaglioLinee>
        <NumeroLinea>${index + 1}</NumeroLinea>
        <Descrizione>${escapeXml(item.description)}</Descrizione>
        <Quantita>${item.quantity.toFixed(2)}</Quantita>
        <PrezzoUnitario>${item.unitPrice.toFixed(2)}</PrezzoUnitario>
        <PrezzoTotale>${item.total.toFixed(2)}</PrezzoTotale>
        <AliquotaIVA>${item.vatRate.toFixed(2)}</AliquotaIVA>
      </DettaglioLinee>`).join('')}
      <DatiRiepilogo>
        <AliquotaIVA>${Number(invoice.vatRate).toFixed(2)}</AliquotaIVA>
        <ImponibileImporto>${Number(invoice.subtotal).toFixed(2)}</ImponibileImporto>
        <Imposta>${Number(invoice.vatAmount).toFixed(2)}</Imposta>
        <EsigibilitaIVA>I</EsigibilitaIVA>
      </DatiRiepilogo>
    </DatiBeniServizi>
    ${invoice.paymentMethod ? `
    <DatiPagamento>
      <CondizioniPagamento>TP02</CondizioniPagamento>
      <DettaglioPagamento>
        <ModalitaPagamento>${invoice.paymentMethod}</ModalitaPagamento>
        ${invoice.dueDate ? `<DataScadenzaPagamento>${invoice.dueDate.toISOString().split('T')[0]}</DataScadenzaPagamento>` : ''}
        <ImportoPagamento>${Number(invoice.totalAmount).toFixed(2)}</ImportoPagamento>
      </DettaglioPagamento>
    </DatiPagamento>` : ''}
  </FatturaElettronicaBody>
</p:FatturaElettronica>`;

    return xml;
  }

  static async sendToSDI(invoiceId: string) {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (!invoice.xmlUrl) {
      throw new Error('FatturaPA XML not generated yet');
    }

    // Update status to sending
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        sdiStatus: SdiStatus.SENDING,
        sdiTransmissionDate: new Date(),
      },
    });

    // In production, you would:
    // 1. Connect to SDI via PEC or web service
    // 2. Send the signed XML
    // 3. Wait for acknowledgment
    // 4. Process the response

    // Simulate successful transmission
    // In production, this would be updated based on SDI response
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        sdiStatus: SdiStatus.DELIVERED,
        sdiIdentifier: `IT${Date.now()}`, // Would be actual SDI identifier
        sdiResponseDate: new Date(),
        status: InvoiceStatus.SENT,
      },
    });

    return prisma.invoice.findUnique({
      where: { id: invoiceId },
    });
  }

  static async handleSDINotification(
    invoiceId: string,
    status: SdiStatus,
    message?: string
  ) {
    const updateData: any = {
      sdiStatus: status,
      sdiResponseDate: new Date(),
    };

    if (message) {
      updateData.sdiErrorMessage = message;
    }

    // Map SDI status to invoice status
    switch (status) {
      case SdiStatus.ACCEPTED:
        updateData.status = InvoiceStatus.SENT;
        break;
      case SdiStatus.REJECTED:
      case SdiStatus.FILE_REJECTED:
      case SdiStatus.DECODING_ERROR:
        updateData.status = InvoiceStatus.DRAFT; // Allow re-submission
        break;
    }

    return prisma.invoice.update({
      where: { id: invoiceId },
      data: updateData,
    });
  }

  // ============================================
  // INSTALLMENT PLANS
  // ============================================

  static async createInstallmentPlan(input: InstallmentPlanInput) {
    const installmentAmount = input.totalAmount / input.numberOfInstallments;

    // Calculate due dates based on frequency
    const dueDates = this.calculateInstallmentDueDates(
      input.startDate,
      input.numberOfInstallments,
      input.frequency
    );

    // Create the plan with installments
    return prisma.installmentPlan.create({
      data: {
        enrollmentId: input.enrollmentId,
        totalAmount: new Decimal(input.totalAmount),
        numberOfInstallments: input.numberOfInstallments,
        installmentAmount: new Decimal(installmentAmount),
        startDate: input.startDate,
        frequency: input.frequency,
        status: 'ACTIVE',
        installments: {
          create: dueDates.map((dueDate, index) => ({
            number: index + 1,
            amount: new Decimal(installmentAmount),
            dueDate,
            status: 'PENDING',
          })),
        },
      },
      include: {
        installments: {
          orderBy: { number: 'asc' },
        },
        enrollment: {
          include: {
            student: {
              include: { user: true },
            },
            course: true,
          },
        },
      },
    });
  }

  private static calculateInstallmentDueDates(
    startDate: Date,
    count: number,
    frequency: string
  ): Date[] {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < count; i++) {
      dates.push(new Date(currentDate));

      switch (frequency) {
        case 'WEEKLY':
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case 'BIWEEKLY':
          currentDate.setDate(currentDate.getDate() + 14);
          break;
        case 'MONTHLY':
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        case 'QUARTERLY':
          currentDate.setMonth(currentDate.getMonth() + 3);
          break;
      }
    }

    return dates;
  }

  static async payInstallment(installmentId: string, amount: number, paymentId?: string) {
    const installment = await prisma.installment.findUnique({
      where: { id: installmentId },
      include: { plan: true },
    });

    if (!installment) {
      throw new Error('Installment not found');
    }

    const installmentAmount = Number(installment.amount);
    const paidAmount = amount;

    let status: 'PAID' | 'PARTIAL' = 'PAID';
    if (paidAmount < installmentAmount) {
      status = 'PARTIAL';
    }

    // Update installment
    await prisma.installment.update({
      where: { id: installmentId },
      data: {
        status,
        paidAt: new Date(),
        paidAmount: new Decimal(paidAmount),
        paymentId,
      },
    });

    // Check if all installments are paid
    const plan = await prisma.installmentPlan.findUnique({
      where: { id: installment.planId },
      include: { installments: true },
    });

    if (plan) {
      const allPaid = plan.installments.every(
        inst => inst.status === 'PAID' || inst.status === 'WAIVED'
      );

      if (allPaid) {
        await prisma.installmentPlan.update({
          where: { id: plan.id },
          data: { status: 'COMPLETED' },
        });

        // Update enrollment payment status
        await prisma.enrollment.update({
          where: { id: plan.enrollmentId },
          data: { paymentStatus: PaymentStatus.PAID },
        });
      }
    }

    return prisma.installment.findUnique({
      where: { id: installmentId },
      include: { plan: true },
    });
  }

  static async getOverdueInstallments(schoolId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return prisma.installment.findMany({
      where: {
        status: 'PENDING',
        dueDate: { lt: today },
        plan: {
          enrollment: {
            course: {
              schoolId,
            },
          },
        },
      },
      include: {
        plan: {
          include: {
            enrollment: {
              include: {
                student: {
                  include: { user: true },
                },
                course: true,
              },
            },
          },
        },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  static async updateOverdueInstallments() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Mark pending installments as overdue
    await prisma.installment.updateMany({
      where: {
        status: 'PENDING',
        dueDate: { lt: today },
      },
      data: {
        status: 'OVERDUE',
      },
    });

    // Update enrollment payment status for plans with overdue installments
    const overduePlans = await prisma.installmentPlan.findMany({
      where: {
        installments: {
          some: { status: 'OVERDUE' },
        },
      },
    });

    for (const plan of overduePlans) {
      await prisma.enrollment.update({
        where: { id: plan.enrollmentId },
        data: { paymentStatus: PaymentStatus.OVERDUE },
      });
    }
  }

  // ============================================
  // REPORTING
  // ============================================

  static async getInvoiceSummary(schoolId: string, year: number, month?: number) {
    const where: any = {
      schoolId,
      invoiceDate: {
        gte: new Date(year, month ? month - 1 : 0, 1),
        lt: month ? new Date(year, month, 1) : new Date(year + 1, 0, 1),
      },
    };

    const invoices = await prisma.invoice.findMany({ where });

    const summary = {
      totalInvoices: invoices.length,
      totalAmount: 0,
      totalVat: 0,
      byStatus: {} as Record<string, { count: number; amount: number }>,
      bySdiStatus: {} as Record<string, number>,
    };

    for (const invoice of invoices) {
      summary.totalAmount += Number(invoice.totalAmount);
      summary.totalVat += Number(invoice.vatAmount);

      // By status
      if (!summary.byStatus[invoice.status]) {
        summary.byStatus[invoice.status] = { count: 0, amount: 0 };
      }
      summary.byStatus[invoice.status].count++;
      summary.byStatus[invoice.status].amount += Number(invoice.totalAmount);

      // By SDI status (for electronic invoices)
      if (invoice.sdiStatus) {
        summary.bySdiStatus[invoice.sdiStatus] = (summary.bySdiStatus[invoice.sdiStatus] || 0) + 1;
      }
    }

    return summary;
  }
}

// Helper function for XML escaping
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default InvoiceService;
