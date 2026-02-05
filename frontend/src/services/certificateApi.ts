import api from './api'

export interface Certificate {
  id: string
  studentId: string
  courseId?: string
  assessmentId?: string
  cefrLevel: string
  language: string
  certificateNumber: string
  issuedAt: string
  validUntil?: string
  pdfUrl?: string
  course?: { name: string }
  student?: {
    user: { name: string; email: string }
  }
  linkedInShareUrl?: string
}

export interface CertificateVerification {
  valid: boolean
  expired?: boolean
  certificate?: {
    certificateNumber: string
    studentName: string
    cefrLevel: string
    language: string
    courseName?: string
    issuedAt: string
    validUntil?: string
  }
  message?: string
}

export const certificateApi = {
  // Get my certificates
  async getMyCertificates(): Promise<Certificate[]> {
    const response = await api.get('/certificates/my')
    return response.data.data || []
  },

  // Get certificate by ID
  async getById(id: string): Promise<Certificate> {
    const response = await api.get(`/certificates/${id}`)
    return response.data.data
  },

  // Verify certificate (public)
  async verify(certificateNumber: string): Promise<CertificateVerification> {
    const response = await api.get(`/certificates/verify/${certificateNumber}`)
    return response.data.data
  },

  // Generate course completion certificate
  async generateCourseCertificate(courseId: string): Promise<Certificate> {
    const response = await api.post(`/certificates/course/${courseId}`)
    return response.data.data
  },

  // Generate assessment certificate
  async generateAssessmentCertificate(assessmentId: string): Promise<Certificate> {
    const response = await api.post(`/certificates/assessment/${assessmentId}`)
    return response.data.data
  },

  // Download certificate PDF
  async downloadPdf(certificateId: string): Promise<Blob> {
    const response = await api.get(`/certificates/${certificateId}/download`, {
      responseType: 'blob'
    })
    return response.data
  },

  // Get school's certificates (admin)
  async getSchoolCertificates(): Promise<Certificate[]> {
    const response = await api.get('/certificates/school/all')
    return response.data.data || []
  }
}
