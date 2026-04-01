import axios, { AxiosInstance } from 'axios'
import { prisma } from '../config/database'

const QB_CLIENT_ID = process.env.QUICKBOOKS_CLIENT_ID
const QB_CLIENT_SECRET = process.env.QUICKBOOKS_CLIENT_SECRET
const QB_REALM_ID = process.env.QUICKBOOKS_REALM_ID // Company ID
const QB_REFRESH_TOKEN = process.env.QUICKBOOKS_REFRESH_TOKEN
const QB_ENVIRONMENT = process.env.QUICKBOOKS_ENVIRONMENT || 'sandbox' // 'sandbox' or 'production'

const QB_BASE_URL = QB_ENVIRONMENT === 'production'
  ? 'https://quickbooks.api.intuit.com'
  : 'https://sandbox-quickbooks.api.intuit.com'

class QuickBooksService {
  private accessToken: string | null = null
  private tokenExpiry: Date | null = null

  isConfigured(): boolean {
    return !!(QB_CLIENT_ID && QB_CLIENT_SECRET && QB_REALM_ID && QB_REFRESH_TOKEN)
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.accessToken
    }

    if (!QB_CLIENT_ID || !QB_CLIENT_SECRET || !QB_REFRESH_TOKEN) {
      throw new Error('QuickBooks credentials not configured')
    }

    const credentials = Buffer.from(`${QB_CLIENT_ID}:${QB_CLIENT_SECRET}`).toString('base64')

    const response = await axios.post(
      'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: QB_REFRESH_TOKEN
      }),
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    this.accessToken = response.data.access_token
    this.tokenExpiry = new Date(Date.now() + (response.data.expires_in - 60) * 1000)

    return this.accessToken!
  }

  private async api(method: 'get' | 'post', path: string, data?: any): Promise<any> {
    const token = await this.getAccessToken()
    const url = `${QB_BASE_URL}/v3/company/${QB_REALM_ID}${path}`

    const response = await axios({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    return response.data
  }

  // ============================================
  // CUSTOMERS (Organizations)
  // ============================================

  async syncCustomer(org: {
    id: string; name: string; email?: string | null; phone?: string | null;
    vatNumber?: string | null; billingAddress?: string | null;
    quickbooksCustomerId?: string | null
  }): Promise<string> {
    const customerData: any = {
      DisplayName: org.name,
      CompanyName: org.name,
      PrimaryEmailAddr: org.email ? { Address: org.email } : undefined,
      PrimaryPhone: org.phone ? { FreeFormNumber: org.phone } : undefined,
      Notes: org.vatNumber ? `VAT: ${org.vatNumber}` : undefined
    }

    if (org.billingAddress) {
      customerData.BillAddr = { Line1: org.billingAddress }
    }

    if (org.quickbooksCustomerId) {
      // Get current SyncToken for update
      const existing = await this.api('get', `/customer/${org.quickbooksCustomerId}`)
      customerData.Id = org.quickbooksCustomerId
      customerData.SyncToken = existing.Customer.SyncToken
      const result = await this.api('post', '/customer', { Customer: customerData })
      return result.Customer.Id
    }

    // Check if customer exists by name
    const query = await this.api('get',
      `/query?query=SELECT * FROM Customer WHERE DisplayName = '${org.name.replace(/'/g, "\\'")}'`
    )

    if (query.QueryResponse?.Customer?.length > 0) {
      const existingId = query.QueryResponse.Customer[0].Id
      customerData.Id = existingId
      customerData.SyncToken = query.QueryResponse.Customer[0].SyncToken
      const result = await this.api('post', '/customer', { Customer: customerData })
      await prisma.organization.update({ where: { id: org.id }, data: { quickbooksCustomerId: existingId } })
      return result.Customer.Id
    }

    // Create new
    const result = await this.api('post', '/customer', { Customer: customerData })
    const qbId = result.Customer.Id
    await prisma.organization.update({ where: { id: org.id }, data: { quickbooksCustomerId: qbId } })
    return qbId
  }

  // ============================================
  // ITEMS / SERVICES (Courses)
  // ============================================

  async syncItem(course: {
    id: string; name: string; price?: number | null; currency?: string | null;
    description?: string | null; quickbooksItemId?: string | null
  }): Promise<string> {
    const itemData: any = {
      Name: course.name.substring(0, 100), // QB limit
      Description: course.description?.substring(0, 4000) || '',
      Type: 'Service',
      UnitPrice: course.price || 0,
      IncomeAccountRef: { value: '1' } // Default income account — configure per setup
    }

    if (course.quickbooksItemId) {
      const existing = await this.api('get', `/item/${course.quickbooksItemId}`)
      itemData.Id = course.quickbooksItemId
      itemData.SyncToken = existing.Item.SyncToken
      const result = await this.api('post', '/item', { Item: itemData })
      return result.Item.Id
    }

    // Search by name
    const query = await this.api('get',
      `/query?query=SELECT * FROM Item WHERE Name = '${course.name.substring(0, 100).replace(/'/g, "\\'")}'`
    )

    if (query.QueryResponse?.Item?.length > 0) {
      const existingId = query.QueryResponse.Item[0].Id
      await prisma.course.update({ where: { id: course.id }, data: { quickbooksItemId: existingId } })
      return existingId
    }

    const result = await this.api('post', '/item', { Item: itemData })
    const qbId = result.Item.Id
    await prisma.course.update({ where: { id: course.id }, data: { quickbooksItemId: qbId } })
    return qbId
  }

  // ============================================
  // INVOICES
  // ============================================

  async syncInvoice(invoice: {
    id: string; invoiceNumber: string; invoiceDate: Date;
    dueDate?: Date | null; totalAmount: number; currency?: string;
    organizationId?: string | null; schoolId: string;
    lineItems?: any; quickbooksInvoiceId?: string | null
  }): Promise<string> {
    // Get the QuickBooks customer ID
    let customerRef: string | undefined
    if (invoice.organizationId) {
      const org = await prisma.organization.findUnique({ where: { id: invoice.organizationId } })
      if (org?.quickbooksCustomerId) {
        customerRef = org.quickbooksCustomerId
      } else if (org) {
        customerRef = await this.syncCustomer(org)
      }
    }

    const invoiceData: any = {
      DocNumber: invoice.invoiceNumber,
      TxnDate: invoice.invoiceDate.toISOString().split('T')[0],
      DueDate: invoice.dueDate?.toISOString().split('T')[0],
      CustomerRef: customerRef ? { value: customerRef } : undefined,
      Line: [
        {
          Amount: Number(invoice.totalAmount),
          DetailType: 'SalesItemLineDetail',
          SalesItemLineDetail: {
            Qty: 1,
            UnitPrice: Number(invoice.totalAmount)
          },
          Description: `Invoice ${invoice.invoiceNumber}`
        }
      ],
      CurrencyRef: { value: invoice.currency || 'EUR' }
    }

    if (invoice.quickbooksInvoiceId) {
      const existing = await this.api('get', `/invoice/${invoice.quickbooksInvoiceId}`)
      invoiceData.Id = invoice.quickbooksInvoiceId
      invoiceData.SyncToken = existing.Invoice.SyncToken
      const result = await this.api('post', '/invoice', { Invoice: invoiceData })
      return result.Invoice.Id
    }

    const result = await this.api('post', '/invoice', { Invoice: invoiceData })
    const qbId = result.Invoice.Id
    await prisma.invoice.update({ where: { id: invoice.id }, data: { quickbooksInvoiceId: qbId } })
    return qbId
  }

  // ============================================
  // PAYMENTS
  // ============================================

  async syncPayment(payment: {
    id: string; amount: number; currency?: string; paidAt?: Date | null;
    invoiceId?: string | null; quickbooksPaymentId?: string | null
  }): Promise<string> {
    // Link to QB invoice if available
    let invoiceRef: string | undefined
    let customerRef: string | undefined

    if (payment.invoiceId) {
      const invoice = await prisma.invoice.findUnique({
        where: { id: payment.invoiceId },
        include: { organization: true }
      })
      if (invoice?.quickbooksInvoiceId) {
        invoiceRef = invoice.quickbooksInvoiceId
      }
      if (invoice?.organization?.quickbooksCustomerId) {
        customerRef = invoice.organization.quickbooksCustomerId
      }
    }

    const paymentData: any = {
      TotalAmt: Number(payment.amount),
      TxnDate: (payment.paidAt || new Date()).toISOString().split('T')[0],
      CustomerRef: customerRef ? { value: customerRef } : undefined,
      CurrencyRef: { value: payment.currency || 'EUR' }
    }

    if (invoiceRef) {
      paymentData.Line = [{
        Amount: Number(payment.amount),
        LinkedTxn: [{ TxnId: invoiceRef, TxnType: 'Invoice' }]
      }]
    }

    if (payment.quickbooksPaymentId) {
      const existing = await this.api('get', `/payment/${payment.quickbooksPaymentId}`)
      paymentData.Id = payment.quickbooksPaymentId
      paymentData.SyncToken = existing.Payment.SyncToken
      const result = await this.api('post', '/payment', { Payment: paymentData })
      return result.Payment.Id
    }

    const result = await this.api('post', '/payment', { Payment: paymentData })
    const qbId = result.Payment.Id
    await prisma.payment.update({ where: { id: payment.id }, data: { quickbooksPaymentId: qbId } })
    return qbId
  }

  // ============================================
  // FULL SYNC
  // ============================================

  async syncAllCustomers(): Promise<{ synced: number; errors: number }> {
    let synced = 0, errors = 0
    const orgs = await prisma.organization.findMany({
      select: { id: true, name: true, email: true, phone: true, vatNumber: true, billingAddress: true, quickbooksCustomerId: true }
    })
    for (const org of orgs) {
      try { await this.syncCustomer(org); synced++ }
      catch (e) { console.error(`QB customer sync failed for ${org.name}:`, e); errors++ }
    }
    return { synced, errors }
  }

  async syncAllInvoices(fromDate?: Date): Promise<{ synced: number; errors: number }> {
    let synced = 0, errors = 0
    const where: any = {}
    if (fromDate) where.invoiceDate = { gte: fromDate }

    const invoices = await prisma.invoice.findMany({
      where,
      select: {
        id: true, invoiceNumber: true, invoiceDate: true, dueDate: true,
        totalAmount: true, currency: true, organizationId: true, schoolId: true,
        lineItems: true, quickbooksInvoiceId: true
      },
      orderBy: { invoiceDate: 'desc' },
      take: 100
    })

    for (const inv of invoices) {
      try {
        await this.syncInvoice({ ...inv, totalAmount: Number(inv.totalAmount) })
        synced++
      } catch (e) { console.error(`QB invoice sync failed for ${inv.invoiceNumber}:`, e); errors++ }
    }
    return { synced, errors }
  }

  async syncAllPayments(fromDate?: Date): Promise<{ synced: number; errors: number }> {
    let synced = 0, errors = 0
    const where: any = { status: 'PAID' }
    if (fromDate) where.paidAt = { gte: fromDate }

    const payments = await prisma.payment.findMany({
      where,
      select: { id: true, amount: true, currency: true, paidAt: true, invoiceId: true, quickbooksPaymentId: true },
      orderBy: { paidAt: 'desc' },
      take: 100
    })

    for (const p of payments) {
      try {
        await this.syncPayment({ ...p, amount: Number(p.amount) })
        synced++
      } catch (e) { console.error(`QB payment sync failed for ${p.id}:`, e); errors++ }
    }
    return { synced, errors }
  }

  async fullSync(): Promise<{
    customers: { synced: number; errors: number }
    invoices: { synced: number; errors: number }
    payments: { synced: number; errors: number }
  }> {
    const customers = await this.syncAllCustomers()
    const invoices = await this.syncAllInvoices()
    const payments = await this.syncAllPayments()
    return { customers, invoices, payments }
  }
}

export const quickBooksService = new QuickBooksService()
