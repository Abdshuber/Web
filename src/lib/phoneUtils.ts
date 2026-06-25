// Phone number validation and formatting utilities
export const COUNTRY_CODES = {
  US: { code: '+1', flag: '🇺🇸', name: 'United States' },
  GB: { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  CA: { code: '+1', flag: '🇨🇦', name: 'Canada' },
  AU: { code: '+61', flag: '🇦🇺', name: 'Australia' },
  DE: { code: '+49', flag: '🇩🇪', name: 'Germany' },
  FR: { code: '+33', flag: '🇫🇷', name: 'France' },
  JP: { code: '+81', flag: '🇯🇵', name: 'Japan' },
  IN: { code: '+91', flag: '🇮🇳', name: 'India' },
  BR: { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  MX: { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  SG: { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  AE: { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
}

export function validatePhoneNumber(phoneNumber: string, countryCode: string): boolean {
  // Remove common separators
  const cleaned = phoneNumber.replace(/[-.\s()]/g, '')
  
  // Basic validation: should be 7-15 digits for international numbers
  if (!/^\d{7,15}$/.test(cleaned)) {
    return false
  }
  
  return true
}

export function formatPhoneNumber(phoneNumber: string, countryCode: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '')
  const country = COUNTRY_CODES[countryCode as keyof typeof COUNTRY_CODES]
  
  if (!country) return phoneNumber
  
  // Format based on country-specific rules
  if (countryCode === 'US' || countryCode === 'CA') {
    if (cleaned.length === 10) {
      return `${country.code} (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
  }
  
  return `${country.code} ${cleaned}`
}

export function calculateRiskScore(anomalies: string[]): number {
  let score = 0
  
  const riskWeights: Record<string, number> = {
    'VoIP Detected': 30,
    'Virtual Number': 25,
    'Leaked in Data Breach': 40,
    'Suspicious Geolocation': 20,
    'Known Phishing Infrastructure': 50,
    'High Activity Anomaly': 15,
  }
  
  anomalies.forEach(anomaly => {
    score += riskWeights[anomaly] || 10
  })
  
  return Math.min(score, 100)
}

export function getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical' {
  if (score >= 80) return 'critical'
  if (score >= 60) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

export function getRiskColor(level: 'low' | 'medium' | 'high' | 'critical'): string {
  const colors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-orange-500',
    critical: 'text-red-500',
  }
  return colors[level]
}

export function getRiskBgColor(level: 'low' | 'medium' | 'high' | 'critical'): string {
  const colors = {
    low: 'bg-green-500/10 border border-green-500/30',
    medium: 'bg-yellow-500/10 border border-yellow-500/30',
    high: 'bg-orange-500/10 border border-orange-500/30',
    critical: 'bg-red-500/10 border border-red-500/30',
  }
  return colors[level]
}
