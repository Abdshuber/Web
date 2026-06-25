import { useState, useCallback } from 'react'
import { Phone, Download, AlertCircle } from 'lucide-react'
import PhoneInputPanel from '@/components/phone/PhoneInputPanel'
import PhoneResultsGrid from '@/components/phone/PhoneResultsGrid'
import PhoneScanOptions from '@/components/phone/PhoneScanOptions'
import { PhoneIntelligenceResult, PhoneValidationRequest } from '@/types'
import { streamPhoneIntelligence } from '@/lib/streamingUtils'

export default function PhoneIntelligencePage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [countryCode, setCountryCode] = useState('US')
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState<PhoneIntelligenceResult | null>(null)
  const [scanConfig, setScanConfig] = useState({
    enableCarrierLookup: true,
    enableCNAM: true,
    enableSocialMediaScan: true,
    enableBreachScan: true,
    enableGeolocation: true,
  })

  const handleScan = useCallback(async () => {
    if (!phoneNumber.trim()) {
      alert('Please enter a phone number')
      return
    }

    setIsScanning(true)
    setResults(null)

    try {
      const generator = streamPhoneIntelligence(phoneNumber, countryCode, scanConfig)
      
      for await (const partial of generator) {
        setResults(prev => ({
          ...prev,
          ...partial,
        } as PhoneIntelligenceResult))
      }
    } catch (error) {
      console.error('Scan error:', error)
    } finally {
      setIsScanning(false)
    }
  }, [phoneNumber, countryCode, scanConfig])

  const handleExportReport = () => {
    if (!results) return
    
    const report = {
      title: 'Phone Intelligence Report',
      generatedAt: new Date().toISOString(),
      phoneNumber: results.phoneNumber,
      validationStatus: results.validationStatus,
      carrier: results.carrier,
      cnam: results.cnam,
      socialMedia: results.socialMedia,
      breaches: results.breaches,
      geolocation: results.geolocation,
      riskScore: results.overallRiskScore,
      anomalies: results.anomalies,
    }

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2)))
    element.setAttribute('download', `phone_intelligence_${results.phoneNumber}_${Date.now()}.json`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
            <Phone className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Phone Intelligence & Validator</h1>
            <p className="text-slate-400">Advanced OSINT phone number analysis with multi-module deep scans</p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input & Config Panel */}
        <div className="lg:col-span-1 space-y-6">
          <PhoneInputPanel
            phoneNumber={phoneNumber}
            countryCode={countryCode}
            onPhoneChange={setPhoneNumber}
            onCountryChange={setCountryCode}
            onScan={handleScan}
            isScanning={isScanning}
          />

          <PhoneScanOptions
            config={scanConfig}
            onConfigChange={setScanConfig}
            disabled={isScanning}
          />

          {/* Info Box */}
          <div className="glass-effect p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm space-y-2">
                <p className="font-semibold text-slate-200">Scan Information</p>
                <p className="text-slate-400">This platform performs OSINT intelligence gathering on phone numbers to uncover carrier information, breach history, and associated digital footprints.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2">
          {!results && !isScanning && (
            <div className="glass-effect rounded-lg p-12 flex flex-col items-center justify-center min-h-96 text-center">
              <Phone className="w-16 h-16 text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">Ready for Analysis</h3>
              <p className="text-slate-400">Enter a phone number and configure scan options to begin intelligence gathering</p>
            </div>
          )}

          {isScanning && (
            <div className="glass-effect rounded-lg p-12 space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-700" />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-slate-200">Scanning Intelligence Modules</p>
                <p className="text-slate-400">Processing carrier, CNAM, social media, breach, and geolocation data...</p>
              </div>

              {/* Progress Indicators */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { label: 'Carrier Lookup', enabled: scanConfig.enableCarrierLookup },
                  { label: 'CNAM Discovery', enabled: scanConfig.enableCNAM },
                  { label: 'Social Media Scan', enabled: scanConfig.enableSocialMediaScan },
                  { label: 'Breach Database', enabled: scanConfig.enableBreachScan },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-center text-sm ${
                      item.enabled
                        ? 'bg-cyan-500/10 border border-cyan-400/30 text-cyan-300'
                        : 'bg-slate-700/20 border border-slate-600/30 text-slate-500'
                    }`}
                  >
                    {item.enabled && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block mr-2 animate-pulse" />}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {results && !isScanning && (
            <PhoneResultsGrid
              result={results}
              onExport={handleExportReport}
            />
          )}
        </div>
      </div>
    </div>
  )
}
