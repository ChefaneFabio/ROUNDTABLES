import { hubSpotService } from './HubSpotService'
import { quickBooksService } from './QuickBooksService'

/**
 * Non-blocking integration hooks.
 * Call these after key mutations — they fire-and-forget to external APIs.
 * Failures are logged but never block the main operation.
 */

export async function onUserCreatedOrUpdated(user: {
  id: string; email: string; name: string; phone?: string | null;
  role: string; hubspotContactId?: string | null
}) {
  if (hubSpotService.isConfigured() && ['STUDENT', 'TEACHER'].includes(user.role)) {
    hubSpotService.syncContact(user).catch(e =>
      console.error(`[Integration] HubSpot contact sync failed for ${user.email}:`, e.message)
    )
  }
}

export async function onOrganizationCreatedOrUpdated(org: {
  id: string; name: string; email?: string | null; phone?: string | null;
  website?: string | null; industry?: string | null; size?: string | null;
  vatNumber?: string | null; billingAddress?: string | null;
  hubspotCompanyId?: string | null; quickbooksCustomerId?: string | null
}) {
  if (hubSpotService.isConfigured()) {
    hubSpotService.syncCompany(org).catch(e =>
      console.error(`[Integration] HubSpot company sync failed for ${org.name}:`, e.message)
    )
  }
  if (quickBooksService.isConfigured()) {
    quickBooksService.syncCustomer(org).catch(e =>
      console.error(`[Integration] QuickBooks customer sync failed for ${org.name}:`, e.message)
    )
  }
}

export async function onEnrollmentCreatedOrUpdated(enrollment: {
  id: string; studentId: string; courseId: string;
  status: string; amountDue?: number | null; hubspotDealId?: string | null
}) {
  if (hubSpotService.isConfigured()) {
    hubSpotService.syncDeal(enrollment).catch(e =>
      console.error(`[Integration] HubSpot deal sync failed for enrollment ${enrollment.id}:`, e.message)
    )
  }
}

export async function onInvoiceCreated(invoice: {
  id: string; invoiceNumber: string; invoiceDate: Date;
  dueDate?: Date | null; totalAmount: number; currency?: string;
  organizationId?: string | null; schoolId: string;
  quickbooksInvoiceId?: string | null
}) {
  if (quickBooksService.isConfigured()) {
    quickBooksService.syncInvoice(invoice).catch(e =>
      console.error(`[Integration] QuickBooks invoice sync failed for ${invoice.invoiceNumber}:`, e.message)
    )
  }
}

export async function onPaymentRecorded(payment: {
  id: string; amount: number; currency?: string; paidAt?: Date | null;
  invoiceId?: string | null; quickbooksPaymentId?: string | null
}) {
  if (quickBooksService.isConfigured()) {
    quickBooksService.syncPayment(payment).catch(e =>
      console.error(`[Integration] QuickBooks payment sync failed for ${payment.id}:`, e.message)
    )
  }
}
