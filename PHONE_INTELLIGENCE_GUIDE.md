# Phone Intelligence & Validator - Complete Implementation Guide

## 📱 Overview

The Phone Intelligence module is a specialized dashboard for advanced OSINT phone number analysis. It combines country-aware input validation, multi-module configuration, and real-time streaming results with professional severity badges.

## 🏗️ Component Architecture

```
PhoneIntelligence (Main Page)
├── PhoneInputPanel
│   ├── Country Code Selector (Dropdown with Flags)
│   ├── Phone Number Input
│   └── Scan Button
├── PhoneScanOptions
│   └── Toggle Switches (5 OSINT Modules)
└── PhoneResultsGrid (Conditional)
    ├── Summary Card (Risk Score Badge)
    ├── Anomalies Section
    ├── Carrier Information
    ├── CNAM Data
    ├── Social Media Footprint
    ├── Breach History
    └── Geolocation Data
```

## 🔧 Component Reference

### 1. PhoneInputPanel

**Location**: `src/components/phone/PhoneInputPanel.tsx`

**Props**:
```typescript
interface PhoneInputPanelProps {
  phoneNumber: string
  countryCode: string
  onPhoneChange: (value: string) => void
  onCountryChange: (value: string) => void
  onScan: () => void
  isScanning: boolean
}
```

**Features**:
- Dynamic country code selector with 12+ countries
- Flag emoji visualization
- Dialing code display
- Phone format examples
- Disabled state during scanning
- Format validation feedback

**Key Classes**:
- `.scan-input` - Styled phone number input
- `.scan-button` - Action button with loading state
- `.glass-effect` - Frosted glass background

**Usage Example**:
```tsx
<PhoneInputPanel
  phoneNumber={phoneNumber}
  countryCode={countryCode}
  onPhoneChange={setPhoneNumber}
  onCountryChange={setCountryCode}
  onScan={handleScan}
  isScanning={isScanning}
/>
```

---

### 2. PhoneScanOptions

**Location**: `src/components/phone/PhoneScanOptions.tsx`

**Props**:
```typescript
interface PhoneScanOptionsProps {
  config: {
    enableCarrierLookup: boolean
    enableCNAM: boolean
    enableSocialMediaScan: boolean
    enableBreachScan: boolean
    enableGeolocation: boolean
  }
  onConfigChange: (config: PhoneScanConfig) => void
  disabled: boolean
}
```

**Features**:
- 5 toggle switches for OSINT modules
- Contextual info tooltips on hover
- Enable/Disable All buttons
- Module count indicator
- Disabled state during scanning

**Toggle Modules**:
1. **Carrier & Line Type Lookup** - Mobile/Landline/VoIP/Premium detection
2. **CNAM / Caller ID Discovery** - Name and caller ID tracking
3. **Social Media & Messenger Footprint** - WhatsApp, Telegram, TrueCaller, Signal
4. **Data Leak & Breach Scan** - Cross-reference credential dumps
5. **Geolocation / HLR Lookups** - Country, timezone, network status

**Styling**:
- Active: `bg-cyan-500/10 border-cyan-400/50`
- Inactive: `bg-slate-700/20 border-slate-600/30`

**Usage Example**:
```tsx
<PhoneScanOptions
  config={scanConfig}
  onConfigChange={setScanConfig}
  disabled={isScanning}
/>
```

---

### 3. PhoneResultsGrid

**Location**: `src/components/phone/PhoneResultsGrid.tsx`

**Props**:
```typescript
interface PhoneResultsGridProps {
  result: PhoneIntelligenceResult
  onExport: () => void
}
```

**Sections Rendered**:

#### Summary Card
- Validation status (Valid/Invalid/Unknown)
- Risk score (0-100)
- Risk level badge (Low/Medium/High/Critical)
- Anomaly count

#### Anomalies Section
- Displayed only if anomalies present
- Color-coded as Amber/Red warnings
- Examples: "VoIP Detected", "Leaked in Data Breach"

#### Carrier Information
- Carrier name (e.g., Verizon, Twilio)
- Line type with risk color coding
- Country and network type

#### CNAM Information
- Associated name (if available)
- Confidence percentage

#### Social Media Footprint
- Platform detection status
- Handle information if found
- Per-platform risk indicator

#### Data Breach History
- Breach name and date
- Severity badge (Critical/High/Medium/Low)
- Compromised fields (name, email, phone, etc.)

#### Geolocation & Network
- Country
- Timezone
- Coordinates
- Network status (Active/Inactive)

**Export Function**:
```typescript
const handleExportReport = () => {
  const report = {
    title: 'Phone Intelligence Report',
    generatedAt: new Date().toISOString(),
    phoneNumber: results.phoneNumber,
    // ... complete result object
  }
  // Downloads as JSON file
}
```

**Color System**:
```css
Critical: text-red-500 (80-100)
High: text-orange-500 (60-79)
Medium: text-yellow-500 (40-59)
Low: text-green-500 (0-39)
```

---

## 🌊 Data Flow & Streaming

### Real-Time Result Population

The results grid updates asynchronously using an async generator:

```typescript
const handleScan = async () => {
  setIsScanning(true)
  setResults(null)

  const generator = streamPhoneIntelligence(phoneNumber, countryCode, scanConfig)
  
  for await (const partial of generator) {
    setResults(prev => ({
      ...prev,
      ...partial,
    } as PhoneIntelligenceResult))
  }
  
  setIsScanning(false)
}
```

### Streaming Sequence

1. **Initial Result** (0ms) - Phone number & status
2. **Carrier Lookup** (800ms) - Carrier name & line type
3. **CNAM Lookup** (1000ms) - Caller name & confidence
4. **Social Media Scan** (1500ms) - Platform footprints
5. **Breach Scan** (2000ms) - Data breach history
6. **Geolocation** (1200ms) - Location & network data
7. **Risk Calculation** - Final score & anomalies

### Scanning State UI

During scanning, a loading card displays:
- Animated spinner
- Status message
- Progress indicators for enabled modules
- Pulsing dots for active modules

---

## 🎨 Styling & Themes

### Tailwind CSS Classes Used

**Glass Effect**:
```css
.glass-effect {
  @apply bg-slate-800/40 backdrop-blur-md border border-slate-700/50;
}
```

**Inputs**:
```css
.scan-input {
  @apply w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg 
         text-slate-100 placeholder-slate-400 focus:outline-none 
         focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all;
}
```

**Buttons**:
```css
.scan-button {
  @apply px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white 
         font-semibold rounded-lg hover:shadow-lg 
         hover:shadow-cyan-400/40 transition-all duration-200 
         disabled:opacity-50 disabled:cursor-not-allowed;
}
```

**Result Cards**:
```css
.result-card {
  @apply bg-slate-800/60 border border-slate-700/50 rounded-lg 
         p-4 backdrop-blur-sm;
}
```

### Color Palette

```
Primary: Cyan (#0ff) - Focus, highlights
Dark BG: Slate-900 (#0f172a)
Text: Slate-100 (#f1f5f9)
Muted: Slate-400 (#94a3b8)
Risk High: Red (#ff1744)
Risk Med: Orange (#ffa500)
Risk Low: Green (#00ff88)
```

---

## 🔌 Utility Functions

### Phone Validation (`src/lib/phoneUtils.ts`)

```typescript
// Validate phone format
validatePhoneNumber(phoneNumber: string, countryCode: string): boolean

// Format phone with country code
formatPhoneNumber(phoneNumber: string, countryCode: string): string

// Calculate risk score from anomalies
calculateRiskScore(anomalies: string[]): number // 0-100

// Get risk level
getRiskLevel(score: number): 'low' | 'medium' | 'high' | 'critical'

// Get text color for risk
getRiskColor(level: string): string // Tailwind class

// Get background color for risk
getRiskBgColor(level: string): string // Tailwind class
```

### Streaming Generator (`src/lib/streamingUtils.ts`)

```typescript
// Main streaming function
async function* streamPhoneIntelligence(
  phoneNumber: string,
  countryCode: string,
  config: PhoneScanConfig
): AsyncGenerator<Partial<PhoneIntelligenceResult>>

// Usage in component
for await (const partial of generator) {
  setResults(prev => ({ ...prev, ...partial }))
}
```

---

## 🔐 Type Definitions

### PhoneIntelligenceResult

```typescript
interface PhoneIntelligenceResult {
  phoneNumber: string
  validationStatus: 'valid' | 'invalid' | 'unknown'
  carrier?: CarrierInfo
  cnam?: CNAMResult
  socialMedia?: SocialMediaFootprint[]
  breaches?: BreachData[]
  geolocation?: GeolocationData
  overallRiskScore: number
  anomalies: string[]
  scanTimestamp: string
}
```

### CarrierInfo

```typescript
interface CarrierInfo {
  carrier: string
  lineType: 'mobile' | 'landline' | 'voip' | 'premium_rate' | 'unknown'
  country: string
  countryCode: string
  networkType: string
}
```

### Breach Data

```typescript
interface BreachData {
  breachName: string
  breachDate: string
  compromisedFields: string[]
  severity: 'low' | 'medium' | 'high' | 'critical'
}
```

---

## 🚀 Integration with Backend APIs

### Expected API Endpoint

```typescript
POST /api/phone-intelligence
Content-Type: application/json

{
  "phoneNumber": "+1 (555) 123-4567",
  "countryCode": "US",
  "config": {
    "enableCarrierLookup": true,
    "enableCNAM": true,
    "enableSocialMediaScan": true,
    "enableBreachScan": true,
    "enableGeolocation": true
  }
}
```

### Response Streaming

Replace the async generator with real streaming:

```typescript
const response = await fetch('/api/phone-intelligence', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phoneNumber, countryCode, config })
})

const reader = response.body?.getReader()
const decoder = new TextDecoder()

while (true) {
  const { done, value } = await reader.read()
  if (done) break
  
  const chunk = decoder.decode(value)
  const data = JSON.parse(chunk)
  
  setResults(prev => ({ ...prev, ...data }))
}
```

---

## 📊 Export Report Generation

### JSON Export

```typescript
{
  "title": "Phone Intelligence Report",
  "generatedAt": "2024-01-15T14:30:00Z",
  "phoneNumber": "+1 (555) 123-4567",
  "validationStatus": "valid",
  "overallRiskScore": 65,
  "riskLevel": "high",
  "carrier": {
    "carrier": "Verizon",
    "lineType": "mobile",
    "country": "United States",
    "countryCode": "US",
    "networkType": "GSM"
  },
  "cnam": {
    "name": "John Doe",
    "confidence": 87.5
  },
  "anomalies": ["VoIP Detected", "Leaked in Data Breach"],
  "breaches": [{
    "breachName": "LinkedIn 2021",
    "breachDate": "2021-06-15",
    "severity": "high",
    "compromisedFields": ["name", "email", "phone"]
  }],
  "geolocation": {
    "country": "United States",
    "timezone": "America/New_York",
    "networkStatus": "active"
  }
}
```

### PDF Export (Future)

```typescript
// Use recharts + PDFKit or jsPDF
const generatePDFReport = (result: PhoneIntelligenceResult) => {
  const doc = new PDFDocument()
  
  doc.fontSize(16).text('Phone Intelligence Report')
  doc.fontSize(12).text(`Phone: ${result.phoneNumber}`)
  doc.text(`Risk Score: ${result.overallRiskScore}/100`)
  
  // Add sections for each data type
  // Save as blob and download
}
```

---

## 🧪 Component Examples

### Basic Usage

```tsx
import PhoneIntelligencePage from '@/pages/PhoneIntelligence'

export default function App() {
  return <PhoneIntelligencePage />
}
```

### Custom Hook Example (Future)

```typescript
export const usePhoneIntelligence = (phoneNumber: string, countryCode: string) => {
  const [results, setResults] = useState<PhoneIntelligenceResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const scan = async (config: PhoneScanConfig) => {
    setIsLoading(true)
    const generator = streamPhoneIntelligence(phoneNumber, countryCode, config)
    
    for await (const partial of generator) {
      setResults(prev => ({ ...prev, ...partial }))
    }
    
    setIsLoading(false)
  }

  return { results, isLoading, scan }
}
```

---

## ⚡ Performance Tips

1. **Memoization**: Wrap result cards in `React.memo()` to prevent re-renders
2. **Virtualization**: For large breach history, use react-window
3. **Debouncing**: Debounce phone input changes for validation
4. **Lazy Loading**: Code-split the phone module with `React.lazy()`

---

## 🔍 Testing Examples

```typescript
// Unit: Risk score calculation
describe('calculateRiskScore', () => {
  it('returns 0 for no anomalies', () => {
    expect(calculateRiskScore([])).toBe(0)
  })
  
  it('returns 30 for VoIP detection', () => {
    expect(calculateRiskScore(['VoIP Detected'])).toBe(30)
  })
  
  it('caps at 100', () => {
    expect(calculateRiskScore([
      'VoIP Detected',
      'Leaked in Data Breach',
      'Known Phishing Infrastructure'
    ])).toBe(100)
  })
})

// Integration: Full scan workflow
describe('PhoneIntelligence', () => {
  it('completes full scan workflow', async () => {
    render(<PhoneIntelligencePage />)
    
    const input = screen.getByPlaceholderText(/Enter phone number/)
    fireEvent.change(input, { target: { value: '5551234567' } })
    
    fireEvent.click(screen.getByText('Initiate Intelligence Scan'))
    
    await waitFor(() => {
      expect(screen.getByText(/Scan Summary/)).toBeInTheDocument()
    })
  })
})
```

---

## 📚 Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev
- **React Documentation**: https://react.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs

---

## 🛠️ Troubleshooting

### Issue: Scan button disabled
**Solution**: Ensure `phoneNumber` is not empty and `isScanning` is false

### Issue: Results not updating
**Solution**: Check that `setResults()` is being called in the streaming loop

### Issue: Country code not showing flag
**Solution**: Verify country code exists in `COUNTRY_CODES` object

### Issue: Risk badge not displaying correct color
**Solution**: Ensure `getRiskLevel()` and `getRiskColor()` are using correct score thresholds

---

**Last Updated**: June 2024
**Version**: 1.0.0
**Maintainer**: Frontend Architecture Team
