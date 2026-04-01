import { Router, Request, Response } from 'express'
import { authenticate } from '../middleware/auth'
import { requireAdmin } from '../middleware/rbac'
import { apiResponse, handleError } from '../utils/apiResponse'
import { hubSpotService } from '../services/HubSpotService'
import { quickBooksService } from '../services/QuickBooksService'

const router = Router()

// Get integration status
router.get('/status', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    res.json(apiResponse.success({
      hubspot: {
        configured: hubSpotService.isConfigured(),
        description: 'CRM — syncs contacts, companies, deals'
      },
      quickbooks: {
        configured: quickBooksService.isConfigured(),
        description: 'Accounting — syncs customers, invoices, payments'
      }
    }))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// HUBSPOT ENDPOINTS
// ============================================

// Sync all HubSpot data
router.post('/hubspot/sync', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    if (!hubSpotService.isConfigured()) {
      return res.status(400).json(apiResponse.error('HubSpot not configured. Set HUBSPOT_PRIVATE_APP_TOKEN in environment.', 'NOT_CONFIGURED'))
    }
    const result = await hubSpotService.fullSync()
    res.json(apiResponse.success(result, 'HubSpot sync completed'))
  } catch (error) {
    handleError(res, error)
  }
})

// Sync only contacts
router.post('/hubspot/sync/contacts', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    if (!hubSpotService.isConfigured()) {
      return res.status(400).json(apiResponse.error('HubSpot not configured', 'NOT_CONFIGURED'))
    }
    const result = await hubSpotService.syncAllContacts()
    res.json(apiResponse.success(result, `Synced ${result.synced} contacts`))
  } catch (error) {
    handleError(res, error)
  }
})

// Sync only companies
router.post('/hubspot/sync/companies', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    if (!hubSpotService.isConfigured()) {
      return res.status(400).json(apiResponse.error('HubSpot not configured', 'NOT_CONFIGURED'))
    }
    const result = await hubSpotService.syncAllCompanies()
    res.json(apiResponse.success(result, `Synced ${result.synced} companies`))
  } catch (error) {
    handleError(res, error)
  }
})

// Sync only deals
router.post('/hubspot/sync/deals', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    if (!hubSpotService.isConfigured()) {
      return res.status(400).json(apiResponse.error('HubSpot not configured', 'NOT_CONFIGURED'))
    }
    const result = await hubSpotService.syncAllDeals()
    res.json(apiResponse.success(result, `Synced ${result.synced} deals`))
  } catch (error) {
    handleError(res, error)
  }
})

// ============================================
// QUICKBOOKS ENDPOINTS
// ============================================

// Sync all QuickBooks data
router.post('/quickbooks/sync', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    if (!quickBooksService.isConfigured()) {
      return res.status(400).json(apiResponse.error('QuickBooks not configured. Set QUICKBOOKS_CLIENT_ID, QUICKBOOKS_CLIENT_SECRET, QUICKBOOKS_REALM_ID, QUICKBOOKS_REFRESH_TOKEN in environment.', 'NOT_CONFIGURED'))
    }
    const result = await quickBooksService.fullSync()
    res.json(apiResponse.success(result, 'QuickBooks sync completed'))
  } catch (error) {
    handleError(res, error)
  }
})

// Sync only customers
router.post('/quickbooks/sync/customers', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    if (!quickBooksService.isConfigured()) {
      return res.status(400).json(apiResponse.error('QuickBooks not configured', 'NOT_CONFIGURED'))
    }
    const result = await quickBooksService.syncAllCustomers()
    res.json(apiResponse.success(result, `Synced ${result.synced} customers`))
  } catch (error) {
    handleError(res, error)
  }
})

// Sync only invoices
router.post('/quickbooks/sync/invoices', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    if (!quickBooksService.isConfigured()) {
      return res.status(400).json(apiResponse.error('QuickBooks not configured', 'NOT_CONFIGURED'))
    }
    const result = await quickBooksService.syncAllInvoices()
    res.json(apiResponse.success(result, `Synced ${result.synced} invoices`))
  } catch (error) {
    handleError(res, error)
  }
})

// Sync only payments
router.post('/quickbooks/sync/payments', authenticate, requireAdmin, async (req: Request, res: Response) => {
  try {
    if (!quickBooksService.isConfigured()) {
      return res.status(400).json(apiResponse.error('QuickBooks not configured', 'NOT_CONFIGURED'))
    }
    const result = await quickBooksService.syncAllPayments()
    res.json(apiResponse.success(result, `Synced ${result.synced} payments`))
  } catch (error) {
    handleError(res, error)
  }
})

export default router
