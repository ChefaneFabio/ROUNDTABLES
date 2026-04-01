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
  // COMPANIES — Organizations (Maka's B2B clients)
  // ============================================

  async syncCompany(org: {
    id: string; name: string; email?: string | null; phone?: string | null;
    website?: string | null; industry?: string | null; size?: string | null;
    vatNumber?: string | null; fiscalCode?: string | null;
    hubspotCompanyId?: string | null
  }): Promise<string> {
    const api = this.getClient()

    const properties: Record<string, string> = {
      name: org.name,
      domain: org.website || '',
      phone: org.phone || '',
      industry: org.industry || '',
      numberofemployees: org.size || '',
      maka_org_id: org.id,
      maka_type: 'client',
    }
    if (org.vatNumber) properties.maka_vat_number = org.vatNumber
    if (org.fiscalCode) properties.maka_fiscal_code = org.fiscalCode

    if (org.hubspotCompanyId) {
      await api.patch(`/crm/v3/objects/companies/${org.hubspotCompanyId}`, { properties })
      return org.hubspotCompanyId
    }

    // Search by name to avoid duplicates
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
  // CONTACTS — Students, Teachers, Org HR contacts
  // ============================================

  // Students are contacts associated with their organization (client company)
  // Teachers are contacts marked as vendor/trainer
  // Org contacts (HR) are contacts associated with their company

  async syncContact(user: {
    id: string; email: string; name: string; phone?: string | null;
    role: string; hubspotContactId?: string | null;
    organizationId?: string | null; // For students linked to a B2B org
  }): Promise<string> {
    const api = this.getClient()
    const [firstName, ...rest] = (user.name || '').split(' ')
    const lastName = rest.join(' ') || ''

    const contactType = user.role === 'TEACHER' ? 'vendor' : 'client'

    const properties: Record<string, string> = {
      email: user.email,
      firstname: firstName,
      lastname: lastName,
      phone: user.phone || '',
      hs_lead_status: 'CONNECTED',
      maka_role: user.role,
      maka_user_id: user.id,
      maka_contact_type: contactType, // 'vendor' for teachers, 'client' for students
    }

    let hubspotId: string

    if (user.hubspotContactId) {
      await api.patch(`/crm/v3/objects/contacts/${user.hubspotContactId}`, { properties })
      hubspotId = user.hubspotContactId
    } else {
      // Search by email to avoid duplicates
      const searchRes = await api.post('/crm/v3/objects/contacts/search', {
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: user.email }] }]
      })

      if (searchRes.data.total > 0) {
        hubspotId = searchRes.data.results[0].id
        await api.patch(`/crm/v3/objects/contacts/${hubspotId}`, { properties })
      } else {
        const createRes = await api.post('/crm/v3/objects/contacts', { properties })
        hubspotId = createRes.data.id
      }

      await prisma.user.update({ where: { id: user.id }, data: { hubspotContactId: hubspotId } })
    }

    // Associate student with their organization's HubSpot company
    if (user.role === 'STUDENT' && user.organizationId) {
      const org = await prisma.organization.findUnique({
        where: { id: user.organizationId },
        select: { hubspotCompanyId: true }
      })
      if (org?.hubspotCompanyId) {
        try {
          await api.put(
            `/crm/v3/objects/contacts/${hubspotId}/associations/companies/${org.hubspotCompanyId}/contact_to_company`,
            {}
          )
        } catch (e) {
          console.error('HubSpot contact-company association failed:', e)
        }
      }
    }

    return hubspotId
  }

  // Sync organization HR/training contacts as HubSpot contacts associated with the company
  async syncOrgContact(contact: {
    id: string; name: string; email: string; phone?: string | null;
    role?: string | null; branch?: string | null;
    organizationId: string
  }): Promise<string | null> {
    const api = this.getClient()
    const [firstName, ...rest] = (contact.name || '').split(' ')
    const lastName = rest.join(' ') || ''

    const properties: Record<string, string> = {
      email: contact.email,
      firstname: firstName,
      lastname: lastName,
      phone: contact.phone || '',
      jobtitle: contact.role || '',
      maka_contact_type: 'client_hr',
      maka_branch: contact.branch || '',
    }

    // Search by email
    const searchRes = await api.post('/crm/v3/objects/contacts/search', {
      filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: contact.email }] }]
    })

    let hubspotId: string
    if (searchRes.data.total > 0) {
      hubspotId = searchRes.data.results[0].id
      await api.patch(`/crm/v3/objects/contacts/${hubspotId}`, { properties })
    } else {
      const createRes = await api.post('/crm/v3/objects/contacts', { properties })
      hubspotId = createRes.data.id
    }

    // Associate with company
    const org = await prisma.organization.findUnique({
      where: { id: contact.organizationId },
      select: { hubspotCompanyId: true }
    })
    if (org?.hubspotCompanyId) {
      try {
        await api.put(
          `/crm/v3/objects/contacts/${hubspotId}/associations/companies/${org.hubspotCompanyId}/contact_to_company`,
          {}
        )
      } catch (e) {
        console.error('HubSpot org contact-company association failed:', e)
      }
    }

    return hubspotId
  }

  // ============================================
  // DEALS — Enrollments (sales to client organizations)
  // ============================================

  async syncDeal(enrollment: {
    id: string; studentId: string; courseId: string;
    status: string; amountDue?: number | null; hubspotDealId?: string | null
  }): Promise<string> {
    const api = this.getClient()

    const [student, course] = await Promise.all([
      prisma.student.findUnique({ where: { id: enrollment.studentId }, include: { user: true, organization: true } }),
      prisma.course.findUnique({ where: { id: enrollment.courseId } })
    ])

    const stageMap: Record<string, string> = {
      PENDING: 'qualifiedtobuy',
      ACTIVE: 'presentationscheduled',
      COMPLETED: 'closedwon',
      DROPPED: 'closedlost',
      SUSPENDED: 'closedlost'
    }

    const properties: Record<string, string> = {
      dealname: `${student?.user?.name || 'Student'} — ${course?.name || 'Course'}`,
      dealstage: stageMap[enrollment.status] || 'qualifiedtobuy',
      amount: enrollment.amountDue?.toString() || '0',
      pipeline: 'default',
      maka_enrollment_id: enrollment.id,
    }

    let hubspotId: string

    if (enrollment.hubspotDealId) {
      await api.patch(`/crm/v3/objects/deals/${enrollment.hubspotDealId}`, { properties })
      hubspotId = enrollment.hubspotDealId
    } else {
      const createRes = await api.post('/crm/v3/objects/deals', { properties })
      hubspotId = createRes.data.id
      await prisma.enrollment.update({ where: { id: enrollment.id }, data: { hubspotDealId: hubspotId } })
    }

    // Associate deal with student contact
    if (student?.user?.hubspotContactId) {
      try {
        await api.put(
          `/crm/v3/objects/deals/${hubspotId}/associations/contacts/${student.user.hubspotContactId}/deal_to_contact`,
          {}
        )
      } catch (e) { /* ignore association errors */ }
    }

    // Associate deal with organization company (if B2B student)
    if (student?.organization?.hubspotCompanyId) {
      try {
        await api.put(
          `/crm/v3/objects/deals/${hubspotId}/associations/companies/${student.organization.hubspotCompanyId}/deal_to_company`,
          {}
        )
      } catch (e) { /* ignore association errors */ }
    }

    return hubspotId
  }

  // ============================================
  // FULL SYNC
  // ============================================

  async syncAllCompanies(): Promise<{ synced: number; errors: number }> {
    let synced = 0, errors = 0
    const orgs = await prisma.organization.findMany({
      select: { id: true, name: true, email: true, phone: true, website: true, industry: true, size: true, vatNumber: true, fiscalCode: true, hubspotCompanyId: true }
    })
    for (const org of orgs) {
      try { await this.syncCompany(org); synced++ }
      catch (e) { console.error(`HubSpot company sync failed for ${org.name}:`, e); errors++ }
    }
    return { synced, errors }
  }

  async syncAllContacts(): Promise<{ synced: number; errors: number }> {
    let synced = 0, errors = 0

    // Sync teachers (vendors) and students (clients)
    const users = await prisma.user.findMany({
      where: { deletedAt: null, role: { in: ['STUDENT', 'TEACHER'] } },
      select: { id: true, email: true, name: true, phone: true, role: true, hubspotContactId: true },
    })

    // For students, get their org association
    const studentProfiles = await prisma.student.findMany({
      where: { user: { deletedAt: null } },
      select: { userId: true, organizationId: true }
    })
    const studentOrgMap = new Map(studentProfiles.map(s => [s.userId, s.organizationId]))

    for (const user of users) {
      try {
        await this.syncContact({
          ...user,
          organizationId: studentOrgMap.get(user.id) || null
        })
        synced++
      } catch (e) {
        console.error(`HubSpot contact sync failed for ${user.email}:`, e)
        errors++
      }
    }

    // Sync organization HR contacts
    const orgContacts = await prisma.organizationContact.findMany({
      where: { isActive: true }
    })
    for (const oc of orgContacts) {
      try { await this.syncOrgContact(oc); synced++ }
      catch (e) { console.error(`HubSpot org contact sync failed for ${oc.email}:`, e); errors++ }
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
        await this.syncDeal({ ...enrollment, amountDue: enrollment.amountDue ? Number(enrollment.amountDue) : null })
        synced++
      } catch (e) { console.error(`HubSpot deal sync failed:`, e); errors++ }
    }
    return { synced, errors }
  }

  async fullSync(): Promise<{
    companies: { synced: number; errors: number }
    contacts: { synced: number; errors: number }
    deals: { synced: number; errors: number }
  }> {
    // Companies first (so contacts can be associated)
    const companies = await this.syncAllCompanies()
    const contacts = await this.syncAllContacts()
    const deals = await this.syncAllDeals()
    return { companies, contacts, deals }
  }
}

export const hubSpotService = new HubSpotService()
