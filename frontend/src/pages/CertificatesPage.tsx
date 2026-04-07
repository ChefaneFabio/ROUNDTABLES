import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Award, Download, Share2, Calendar, CheckCircle, FileText } from 'lucide-react'
import { certificateApi, Certificate } from '../services/certificateApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Alert } from '../components/common/Alert'

const CEFR_COLORS: Record<string, string> = {
  A1: 'bg-gray-100 text-gray-700 border-gray-200',
  A2: 'bg-gray-100 text-gray-700 border-gray-200',
  B1: 'bg-slate-100 text-slate-700 border-slate-200',
  B2: 'bg-slate-100 text-slate-700 border-slate-200',
  C1: 'bg-gray-200 text-gray-800 border-gray-300',
  C2: 'bg-gray-200 text-gray-800 border-gray-300'
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
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Certificates</h1>
        <p className="text-sm text-gray-500 mt-1">
          View and download your earned certificates
        </p>
      </div>

      {/* Certificates Grid */}
      {certificates && certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center py-16">
          <Award className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700">No Certificates Yet</p>
          <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
            Complete courses or take an assessment to earn your first certificate.
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Link
              to="/courses"
              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Browse Courses
            </Link>
            <Link
              to="/assessment"
              className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Take Assessment
            </Link>
          </div>
        </div>
      )}

      {/* Verification Info */}
      {certificates && certificates.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-500">
              <p className="font-medium text-gray-600">Certificate Verification</p>
              <p className="mt-0.5">
                All certificates can be verified using the certificate number at{' '}
                <span className="text-gray-700 font-medium">makalmc.com/verify</span>
              </p>
            </div>
          </div>
        </div>
      )}
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
  const cefrColorClass = CEFR_COLORS[certificate.cefrLevel] || 'bg-gray-100 text-gray-700 border-gray-200'

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {certificate.language} - CEFR {certificate.cefrLevel}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 truncate">
            {certificate.course?.name || 'Placement Test Certificate'}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 flex items-center gap-3">
        <span className={`px-2 py-0.5 rounded border text-xs font-medium ${cefrColorClass}`}>
          {certificate.cefrLevel}
        </span>
        <span className="text-xs text-gray-400 font-mono">
          #{certificate.certificateNumber}
        </span>
      </div>

      {/* Date */}
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(certificate.issuedAt).toLocaleDateString()}</span>
        </div>
        {certificate.validUntil && (
          <span>Expires {new Date(certificate.validUntil).toLocaleDateString()}</span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
        <button
          onClick={onDownload}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
        <button
          onClick={onShare}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          Share
        </button>
      </div>
    </div>
  )
}
