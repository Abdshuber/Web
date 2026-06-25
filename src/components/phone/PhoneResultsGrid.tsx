import { Download, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'
import { PhoneIntelligenceResult } from '@/types'
import { getRiskColor, getRiskLevel, getRiskBgColor } from '@/lib/phoneUtils'

interface PhoneResultsGridProps {
  result: PhoneIntelligenceResult
  onExport: () => void
}

export default function PhoneResultsGrid({ result, onExport }: PhoneResultsGridProps) {
  const riskLevel = getRiskLevel(result.overallRiskScore)
  const riskColor = getRiskColor(riskLevel)
  const riskBgColor = getRiskBgColor(riskLevel)

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className={`result-card ${riskBgColor} space-y-4`}>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-100">Scan Summary</h3>
            <p className="text-sm text-slate-400">Phone: {result.phoneNumber}</p>
          </div>
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-lg text-cyan-300 hover:bg-cyan-500/30 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-slate-800/30 rounded border border-slate-700/30">
            <p className="text-xs text-slate-400 mb-1">Validation Status</p>
            <p className="text-sm font-semibold text-slate-200">
              {result.validationStatus === 'valid' && (
                <span className="text-green-400">✓ Valid</span>
              )}
              {result.validationStatus === 'invalid' && (
                <span className="text-red-400">✗ Invalid</span>
              )}
              {result.validationStatus === 'unknown' && (
                <span className="text-yellow-400">? Unknown</span>
              )}
            </p>
          </div>

          <div className="p-3 bg-slate-800/30 rounded border border-slate-700/30">
            <p className="text-xs text-slate-400 mb-1">Risk Score</p>
            <div className="flex items-end gap-2">
              <p className={`text-2xl font-bold ${riskColor}`}>
                {result.overallRiskScore}
              </p>
              <p className={`text-xs font-semibold mb-1 ${riskColor}`}>/ 100</p>
            </div>
          </div>

          <div className="p-3 bg-slate-800/30 rounded border border-slate-700/30">
            <p className="text-xs text-slate-400 mb-1">Risk Level</p>
            <p className={`text-sm font-semibold capitalize ${riskColor}`}>
              {riskLevel}
            </p>
          </div>

          <div className="p-3 bg-slate-800/30 rounded border border-slate-700/30">
            <p className="text-xs text-slate-400 mb-1">Anomalies Detected</p>
            <p className="text-sm font-semibold text-slate-200">{result.anomalies.length}</p>
          </div>
        </div>
      </div>

      {/* Anomalies Section */}
      {result.anomalies.length > 0 && (
        <div className="result-card space-y-4">
          <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Detected Anomalies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.anomalies.map((anomaly, idx) => (
              <div key={idx} className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <p className="text-sm font-medium text-amber-300">{anomaly}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Carrier Information */}
      {result.carrier && (
        <div className="result-card space-y-4">
          <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            Carrier Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Carrier</p>
              <p className="text-sm font-semibold text-slate-200">{result.carrier.carrier}</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Line Type</p>
              <p className={`text-sm font-semibold capitalize ${
                result.carrier.lineType === 'voip' ? 'text-orange-400' : 'text-green-400'
              }`}>
                {result.carrier.lineType}
              </p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Country</p>
              <p className="text-sm font-semibold text-slate-200">{result.carrier.country}</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Network Type</p>
              <p className="text-sm font-semibold text-slate-200">{result.carrier.networkType}</p>
            </div>
          </div>
        </div>
      )}

      {/* CNAM Information */}
      {result.cnam && (
        <div className="result-card space-y-4">
          <h3 className="text-lg font-semibold text-slate-100">CNAM / Caller ID</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Name</p>
              <p className="text-sm font-semibold text-slate-200">
                {result.cnam.name || 'Not Available'}
              </p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Confidence</p>
              <p className="text-sm font-semibold text-slate-200">{Math.round(result.cnam.confidence)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Footprint */}
      {result.socialMedia && result.socialMedia.length > 0 && (
        <div className="result-card space-y-4">
          <h3 className="text-lg font-semibold text-slate-100">Social Media Footprint</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {result.socialMedia.map((social, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  social.found
                    ? 'bg-cyan-500/10 border-cyan-400/30'
                    : 'bg-slate-700/20 border-slate-600/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-200">{social.platform}</p>
                    {social.handle && (
                      <p className="text-xs text-slate-400 mt-1">{social.handle}</p>
                    )}
                  </div>
                  {social.found && (
                    <span className="text-xs px-2 py-1 bg-cyan-400/20 text-cyan-300 rounded">
                      Found
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Breach Information */}
      {result.breaches && result.breaches.length > 0 && (
        <div className="result-card space-y-4">
          <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Data Breach History
          </h3>
          <div className="space-y-3">
            {result.breaches.map((breach, idx) => (
              <div key={idx} className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-slate-200">{breach.breachName}</h4>
                  <span className={`text-xs px-2 py-1 rounded font-semibold capitalize ${
                    breach.severity === 'critical' ? 'bg-red-500/30 text-red-300' :
                    breach.severity === 'high' ? 'bg-orange-500/30 text-orange-300' :
                    breach.severity === 'medium' ? 'bg-yellow-500/30 text-yellow-300' :
                    'bg-blue-500/30 text-blue-300'
                  }`}>
                    {breach.severity}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">Date: {breach.breachDate}</p>
                <div className="flex flex-wrap gap-2">
                  {breach.compromisedFields.map((field, fidx) => (
                    <span key={fidx} className="text-xs px-2 py-1 bg-slate-700/30 text-slate-300 rounded">
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Geolocation */}
      {result.geolocation && (
        <div className="result-card space-y-4">
          <h3 className="text-lg font-semibold text-slate-100">Geolocation & Network</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Country</p>
              <p className="text-sm font-semibold text-slate-200">{result.geolocation.country}</p>
            </div>
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Timezone</p>
              <p className="text-sm font-semibold text-slate-200">{result.geolocation.timezone}</p>
            </div>
            {result.geolocation.coordinates && (
              <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                <p className="text-xs text-slate-400 mb-1">Coordinates</p>
                <p className="text-sm font-semibold text-slate-200">
                  {result.geolocation.coordinates.lat.toFixed(4)}, {result.geolocation.coordinates.lng.toFixed(4)}
                </p>
              </div>
            )}
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Network Status</p>
              <p className={`text-sm font-semibold capitalize ${
                result.geolocation.networkStatus === 'active' ? 'text-green-400' : 'text-slate-400'
              }`}>
                {result.geolocation.networkStatus}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Timestamp */}
      <div className="text-xs text-slate-500 text-right">
        Scan completed: {new Date(result.scanTimestamp).toLocaleString()}
      </div>
    </div>
  )
}
