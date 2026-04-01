import axios, { AxiosInstance } from 'axios'
import { prisma } from '../config/database'

const HUBSPOT_API_KEY = process.env.HUBSPOT_PRIVATE_APP_TOKEN

class HubSpotService {
  private client: AxiosInstance | null = null

  private getClient(): AxiosInstance {
    if (!this.client) {
      if (!HUBSPOT_API_KEY) throw new Error('HUBSPOT_PRIVATE_APP_TOKEN not configured')
      this.client = axios.create({
        baseURL: 'https://api.hubapi.com',
        headers: {
          Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      })
    }
    return this.client
  }

  isConfigured(): boolean {
    return !!HUBSPOT_API_KEY
  }

  // ============================================
  // CONTACTS (Students + Teachers + Org Contacts)
  // ============================================

  async syncContact(user: {
    id: string; email: string; name: string; phone?: string | null;
    role: string; hubspotContactId?: string | null
  }): Promise<string> {
    const api = this.getClient()
    const [firstName, ...rest] = (user.name || '').split(' ')
    const lastName = rest.join(' ') || ''

    const properties = {
      email: user.email,
      firstname: firstName,
      lastname: lastName,
      phone: user.phone || '',
      hs_lead_status: 'CONNECTED',
      maka_role: user.role, // custom property
      maka_user_id: user.id
    }

    if (user.hubspotContactId) {
      // Update existing
      await api.patch(`/crm/v3/objects/contacts/${user.hubspotContactId}`, { properties })
      return user.hubspotContactId
    }

    // Search by email first to avoid duplicates
    const searchRes = await api.post('/crm/v3/objects/contacts/search', {
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: user.email }] }]
    })

    if (searchRes.data.total > 0) {
      const existingId = searchRes.data.results[0].id
      await api.patch(`/crm/v3/objects/contacts/${existingId}`, { properties })
      await prisma.user.update({ where: { id: user.id }, data: { hubspotContactId: existingId } })
      return existingId
    }

    // Create new
    const createRes = await api.post('/crm/v3/objects/contacts', { properties })
    const hubspotId = createRes.data.id
    await prisma.user.update({ where: { id: user.id }, data: { hubspotContactId: hubspotId } })
    return hubspotId
  }

  // ============================================
  // COMPANIES (Organizations)
  // ============================================

  async syncCompany(org: {
    id: string; name: string; email?: string | null; phone?: string | null;
    website?: string | null; industry?: string | null; size?: string | null;
    hubspotCompanyId?: string | null
  }): Promise<string> {
    const api = this.getClient()

    const properties = {
      name: org.name,
      domain: org.website || '',
      phone: org.phone || '',
      industry: org.industry || '',
      numberofemployees: org.size || '',
      maka_org_id: org.id
    }

    if (org.hubspotCompanyId) {
      await api.patch(`/crm/v3/objects/companies/${org.hubspotCompanyId}`, { properties })
      return org.hubspotCompanyId
    }

    // Search by name
    const searchRes = await api.post('/crm/v3/objects/companies/search', {
      filterGroups: [{ filters: [{ propertyName: 'name', operator: 'EQ', value: org.name }] }]
    })

    if (searchRes.data.total > 0) {
      const existingId = searchRes.data.results[0].id
      await api.patch(`/crm/v3/objects/companies/${existingId}`, { properties })
      await prisma.organization.update({ where: { id: org.id }, data: { hubspotCompanyId: existingId } })
      return existingId
    }

    const createRes = await api.post('/crm/v3/objects/companies', { properties })
    const hubspotId = createRes.data.id
    await prisma.organization.update({ where: { id: org.id }, data: { hubspotCompanyId: hubspotId } })
    return hubspotId
  }

  // ============================================
  // DEALS (Enrollments)
  // ============================================

  async syncDeal(enrollment: {
    id: string; studentId: string; courseId: string;
    status: string; amountDue?: number | null; hubspotDealId?: string | null
  }): Promise<string> {
    const api = this.getClient()

    // Load related data
    const [student, course] = await Promise.all([
      prisma.student.findUnique({ where: { id: enrollment.studentId }, include: { user: true } }),
      prisma.course.findUnique({ where: { id: enrollment.courseId } })
    ])

    const stageMap: Record<string, string> = {
      PENDING: 'qualifiedtobuy',
      ACTIVE: 'presentationscheduled',
      COMPLETED: 'closedwon',
      DROPPED: 'closedlost',
      SUSPENDED: 'closedlost'
    }

    const properties = {
      dealname: `${student?.user?.name || 'Student'} — ${course?.name || 'Course'}`,
      dealstage: stageMap[enrollment.status] || 'qualifiedtobuy',
      amount: enrollment.amountDue?.toString() || '0',
      pipeline: 'default',
      maka_enrollment_id: enrollment.id
    }

    if (enrollment.hubspotDealId) {
      await api.patch(`/crm/v3/objects/deals/${enrollment.hubspotDealId}`, { properties })
      return enrollment.hubspotDealId
    }

    const createRes = await api.post('/crm/v3/objects/deals', { properties })
    const hubspotId = createRes.data.id
    await prisma.enrollment.update({ where: { id: enrollment.id }, data: { hubspotDealId: hubspotId } })

    // Associate deal with contact
    if (student?.user?.hubspotContactId) {
      try {
        await api.put(
          `/crm/v3/objects/deals/${hubspotId}/associations/contacts/${student.user.hubspotContactId}/deal_to_contact`,
          {}
        )
      } catch (e) {
        console.error('HubSpot deal-contact association failed:', e)
      }
    }

    return hubspotId
  }

  // ============================================
  // FULL SYNC
  // ============================================

  async syncAllContacts(): Promise<{ synced: number; errors: number }> {
    let synced = 0, errors = 0
    const users = await prisma.user.findMany({
      where: { deletedAt: null, role: { in: ['STUDENT', 'TEACHER'] } },
      select: { id: true, email: true, name: true, phone: true, role: true, hubspotContactId: true }
    })

    for (const user of users) {
      try {
        await this.syncContact(user)
        synced++
      } catch (e) {
        console.error(`HubSpot contact sync failed for ${user.email}:`, e)
        errors++
      }
    }
    return { synced, errors }
  }

  async syncAllCompanies(): Promise<{ synced: number; errors: number }> {
    let synced = 0, errors = 0
    const orgs = await prisma.organization.findMany({
      select: { id: true, name: true, email: true, phone: true, website: true, industry: true, size: true, hubspotCompanyId: true }
    })

    for (const org of orgs) {
      try {
        await this.syncCompany(org)
        synced++
      } catch (e) {
        console.error(`HubSpot company sync failed for ${org.name}:`, e)
        errors++
      }
    }
    return { synced, errors }
  }

  async syncAllDeals(): Promise<{ synced: number; errors: number }> {
    let synced = 0, errors = 0
    const enrollments = await prisma.enrollment.findMany({
      where: { status: { in: ['PENDING', 'ACTIVE'] } },
      select: { id: true, studentId: true, courseId: true, status: true, amountDue: true, hubspotDealId: true }
    })

    for (const enrollment of enrollments) {
      try {
        await this.syncDeal({
          ...enrollment,
          amountDue: enrollment.amountDue ? Number(enrollment.amountDue) : null
        })
        synced++
      } catch (e) {
        console.error(`HubSpot deal sync failed for enrollment ${enrollment.id}:`, e)
        errors++
      }
    }
    return { synced, errors }
  }

  async fullSync(): Promise<{
    contacts: { synced: number; errors: number }
    companies: { synced: number; errors: number }
    deals: { synced: number; errors: number }
  }> {
    const contacts = await this.syncAllContacts()
    const companies = await this.syncAllCompanies()
    const deals = await this.syncAllDeals()
    return { contacts, companies, deals }
  }
}

export const hubSpotService = new HubSpotService()
