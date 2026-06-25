import { Phone, Send } from 'lucide-react'
import { COUNTRY_CODES } from '@/lib/phoneUtils'

interface PhoneInputPanelProps {
  phoneNumber: string
  countryCode: string
  onPhoneChange: (value: string) => void
  onCountryChange: (value: string) => void
  onScan: () => void
  isScanning: boolean
}

export default function PhoneInputPanel({
  phoneNumber,
  countryCode,
  onPhoneChange,
  onCountryChange,
  onScan,
  isScanning,
}: PhoneInputPanelProps) {
  const selectedCountry = COUNTRY_CODES[countryCode as keyof typeof COUNTRY_CODES]

  return (
    <div className="glass-effect rounded-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-slate-100">Phone Input</h2>

      {/* Country Code Selector */}
      <div>
        <label className="text-sm font-medium text-slate-300 mb-2 block">Country Code</label>
        <div className="relative">
          <select
            value={countryCode}
            onChange={(e) => onCountryChange(e.target.value)}
            disabled={isScanning}
            className="w-full px-4 py-3 pl-10 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {Object.entries(COUNTRY_CODES).map(([code, { flag, name }]) => (
              <option key={code} value={code}>
                {flag} {name} ({code})
              </option>
            ))}
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xl pointer-events-none">
            {selectedCountry?.flag}
          </div>
        </div>
        {selectedCountry && (
          <p className="text-xs text-slate-400 mt-1">Dialing code: {selectedCountry.code}</p>
        )}
      </div>

      {/* Phone Number Input */}
      <div>
        <label className="text-sm font-medium text-slate-300 mb-2 block">Phone Number</label>
        <div className="relative">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => onPhoneChange(e.target.value)}
            disabled={isScanning}
            placeholder="Enter phone number (e.g., 555-123-4567)"
            className="scan-input pl-10"
          />
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
        <p className="text-xs text-slate-400 mt-1">Accepts various formats: (123) 456-7890, 123-456-7890, 1234567890</p>
      </div>

      {/* Scan Button */}
      <button
        onClick={onScan}
        disabled={isScanning || !phoneNumber.trim()}
        className="scan-button w-full flex items-center justify-center gap-2"
      >
        {isScanning ? (
          <>
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            Scanning...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Initiate Intelligence Scan
          </>
        )}
      </button>

      {/* Validation Status */}
      <div className="p-3 rounded-lg bg-slate-700/20 border border-slate-600/30">
        <p className="text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Format: </span>
          {selectedCountry?.code} + digits (7-15 characters)
        </p>
      </div>
    </div>
  )
}
