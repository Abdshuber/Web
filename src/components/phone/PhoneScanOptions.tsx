import { Check, X, Search, Info } from 'lucide-react'
import { useState } from 'react'

interface PhoneScanConfig {
  enableCarrierLookup: boolean
  enableCNAM: boolean
  enableSocialMediaScan: boolean
  enableBreachScan: boolean
  enableGeolocation: boolean
}

interface PhoneScanOptionsProps {
  config: PhoneScanConfig
  onConfigChange: (config: PhoneScanConfig) => void
  disabled: boolean
}

const scanModules = [
  {
    id: 'enableCarrierLookup',
    title: 'Carrier & Line Type Lookup',
    description: 'Mobile, Landline, VoIP, Premium Rate detection',
    icon: Search,
  },
  {
    id: 'enableCNAM',
    title: 'CNAM / Caller ID Discovery',
    description: 'Real name and caller ID information tracking',
    icon: Search,
  },
  {
    id: 'enableSocialMediaScan',
    title: 'Social Media & Messenger Footprint',
    description: 'WhatsApp, Telegram, TrueCaller, Signal detection',
    icon: Search,
  },
  {
    id: 'enableBreachScan',
    title: 'Data Leak & Breach Scan',
    description: 'Cross-reference against known credential dumps',
    icon: Search,
  },
  {
    id: 'enableGeolocation',
    title: 'Geolocation & HLR Lookups',
    description: 'Country, timezone, and network status verification',
    icon: Search,
  },
]

export default function PhoneScanOptions({
  config,
  onConfigChange,
  disabled,
}: PhoneScanOptionsProps) {
  const [expandedTip, setExpandedTip] = useState<string | null>(null)

  const toggleModule = (moduleId: string) => {
    const key = moduleId as keyof PhoneScanConfig
    onConfigChange({
      ...config,
      [key]: !config[key],
    })
  }

  const enabledCount = Object.values(config).filter(Boolean).length

  return (
    <div className="glass-effect rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">OSINT Modules</h2>
        <span className="text-xs px-2 py-1 bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 rounded">
          {enabledCount}/{scanModules.length} active
        </span>
      </div>

      <div className="space-y-3">
        {scanModules.map((module) => {
          const isEnabled = config[module.id as keyof PhoneScanConfig]
          
          return (
            <div key={module.id}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  isEnabled
                    ? 'bg-cyan-500/10 border-cyan-400/50'
                    : 'bg-slate-700/20 border-slate-600/30 hover:border-slate-500/50'
                }`}
                onClick={() => !disabled && toggleModule(module.id)}
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isEnabled
                      ? 'bg-cyan-400 border-cyan-400'
                      : 'border-slate-500'
                  }`}
                >
                  {isEnabled && <Check className="w-3 h-3 text-slate-900" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${isEnabled ? 'text-cyan-300' : 'text-slate-300'}`}>
                    {module.title}
                  </p>
                  <p className="text-xs text-slate-400">{module.description}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedTip(expandedTip === module.id ? null : module.id)
                  }}
                  className="p-1 hover:bg-slate-700/30 rounded transition-colors flex-shrink-0"
                  title="More information"
                >
                  <Info className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {expandedTip === module.id && (
                <div className="ml-8 mt-2 p-3 bg-slate-700/30 border border-slate-600/30 rounded text-xs text-slate-300 space-y-1">
                  {module.id === 'enableCarrierLookup' && (
                    <p>Identifies the telecommunications carrier and line type, useful for distinguishing legitimate phone numbers from VoIP services often used in phishing schemes.</p>
                  )}
                  {module.id === 'enableCNAM' && (
                    <p>Retrieves the caller name associated with the phone number through CNAM databases, helping identify the legitimate owner or organization.</p>
                  )}
                  {module.id === 'enableSocialMediaScan' && (
                    <p>Searches for the phone number's presence on messaging platforms and social networks, revealing digital footprint and communication habits.</p>
                  )}
                  {module.id === 'enableBreachScan' && (
                    <p>Cross-references the phone number against known data breaches and credential leaks to identify compromised accounts and historical incidents.</p>
                  )}
                  {module.id === 'enableGeolocation' && (
                    <p>Determines the geographic location and telecommunications details through HLR (Home Location Register) lookups, including country, timezone, and network status.</p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Quick Select All */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onConfigChange({
            enableCarrierLookup: true,
            enableCNAM: true,
            enableSocialMediaScan: true,
            enableBreachScan: true,
            enableGeolocation: true,
          })}
          disabled={disabled}
          className="flex-1 px-3 py-2 text-sm bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-300 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enable All
        </button>
        <button
          onClick={() => onConfigChange({
            enableCarrierLookup: false,
            enableCNAM: false,
            enableSocialMediaScan: false,
            enableBreachScan: false,
            enableGeolocation: false,
          })}
          disabled={disabled}
          className="flex-1 px-3 py-2 text-sm bg-slate-700/30 hover:bg-slate-700/40 border border-slate-600/30 text-slate-400 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Disable All
        </button>
      </div>
    </div>
  )
}
