import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Award, Download, Share2, Calendar, CheckCircle } from 'lucide-react'
import { certificateApi, Certificate } from '../services/certificateApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'
import { Card } from '../components/common/Card'

const CEFR_COLORS: Record<string, string> = {
  A1: 'bg-green-100 text-green-800 border-green-200',
  A2: 'bg-green-200 text-green-900 border-green-300',
  B1: 'bg-blue-100 text-blue-800 border-blue-200',
  B2: 'bg-blue-200 text-blue-900 border-blue-300',
  C1: 'bg-purple-100 text-purple-800 border-purple-200',
  C2: 'bg-purple-200 text-purple-900 border-purple-300'
}

export function CertificatesPage() {
  const { data: certificates, isLoading, error } = useQuery(
    'myCertificates',
    certificateApi.getMyCertificates
  )

  const handleDownload = async (certificate: Certificate) => {
    try {
      const blob = await certificateApi.downloadPdf(certificate.id)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `certificate-${certificate.certificateNumber}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
    }
  }

  const handleShareLinkedIn = (certificate: Certificate) => {
    // Open LinkedIn sharing in new tab
    const linkedInUrl = (certificate as any).linkedInShareUrl
    if (linkedInUrl) {
      window.open(linkedInUrl, '_blank')
    }
  }

  if (isLoading) return <LoadingPage />

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert type="error" message="Failed to load certificates" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-8 h-8 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
        </div>
        <p className="text-gray-600">
          View and download your earned certificates. Share your achievements on LinkedIn.
        </p>
      </div>

      {/* Certificates List */}
      {certificates && certificates.length > 0 ? (
        <div className="grid gap-6">
          {certificates.map((certificate) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              onDownload={() => handleDownload(certificate)}
              onShare={() => handleShareLinkedIn(certificate)}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Yet</h3>
          <p className="text-gray-500 mb-6">
            Complete courses or assessments to earn certificates.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/courses"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Browse Courses
            </Link>
            <Link
              to="/assessment"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Take Assessment
            </Link>
          </div>
        </Card>
      )}

      {/* Verification Info */}
      <Card className="!p-4 bg-gray-50">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-700">Certificate Verification</p>
            <p className="mt-1">
              All certificates can be verified using the certificate number at{' '}
              <span className="text-primary-600">makalmc.com/verify</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

function CertificateCard({
  certificate,
  onDownload,
  onShare
}: {
  certificate: Certificate
  onDownload: () => void
  onShare: () => void
}) {
  const cefrColorClass = CEFR_COLORS[certificate.cefrLevel] || 'bg-gray-100 text-gray-800'

  return (
    <Card className="overflow-hidden">
      <div className={`h-2 ${certificate.cefrLevel.startsWith('A') ? 'bg-green-500' : certificate.cefrLevel.startsWith('B') ? 'bg-blue-500' : 'bg-purple-500'}`} />

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
              <Award className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {certificate.language} - CEFR {certificate.cefrLevel}
              </h3>
              <p className="text-sm text-gray-500">
                {certificate.course?.name || 'Placement Test Certificate'}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className={`px-2 py-0.5 rounded border ${cefrColorClass} text-sm font-medium`}>
                  Level {certificate.cefrLevel}
                </span>
                <span className="text-xs text-gray-400">
                  #{certificate.certificateNumber}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Issued: {new Date(certificate.issuedAt).toLocaleDateString()}</span>
              </div>
              {certificate.validUntil && (
                <div className="flex items-center gap-1">
                  <span>Valid until: {new Date(certificate.validUntil).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onShare}
                className="flex items-center gap-2 px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={onDownload}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-primary-600 text-white hover:bg-primary-700 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
