# Quick Reference - Component Map & API Integration Points

## 🗺️ Navigation Structure

```
App (Root Router)
├── / (Dashboard)
├── /osint (OSINT Framework)
├── /phone-intelligence (Phone Intelligence) ⭐ FEATURED
├── /nmap (Nmap Scanner)
├── /nuclei (Nuclei)
├── /httpx (HTTPX)
├── /whatwaf (WhatWAF)
└── /database (Database Scanner)
```

---

## 📱 Phone Intelligence Page Anatomy

```
PhoneIntelligencePage
├── Header Section
│   └── [Phone Intelligence Icon] + Title + Description
│
├── Grid Layout (3 cols on LG, 1 on mobile)
│   │
│   ├── Left Column (Sidebar)
│   │   ├── PhoneInputPanel ⭐
│   │   │   ├── Country Code Selector (Dropdown)
│   │   │   │   └── COUNTRY_CODES: 12+ countries with flags
│   │   │   ├── Phone Number Input (scan-input class)
│   │   │   ├── Format Examples
│   │   │   └── Scan Button (scan-button class)
│   │   │
│   │   ├── PhoneScanOptions ⭐
│   │   │   ├── Toggle: Carrier & Line Type
│   │   │   ├── Toggle: CNAM / Caller ID
│   │   │   ├── Toggle: Social Media Footprint
│   │   │   ├── Toggle: Data Leak & Breach
│   │   │   ├── Toggle: Geolocation / HLR
│   │   │   ├── Enable All / Disable All Buttons
│   │   │   └── Module Counter Badge
│   │   │
│   │   └── Info Box (glass-effect)
│   │       └── "This platform performs OSINT..."
│   │
│   └── Right Column (Results - 2 cols span on LG)
│       │
│       ├── Empty State (Before scan)
│       │   └── [Phone Icon] + "Ready for Analysis"
│       │
│       ├── Loading State (During scan)
│       │   ├── Animated Spinner
│       │   ├── "Scanning Intelligence Modules"
│       │   └── Progress Indicators (4 modules shown)
│       │
│       └── PhoneResultsGrid ⭐ (After scan)
│           ├── Summary Card
│           │   ├── Validation Status Badge
│           │   ├── Risk Score (0-100)
│           │   ├── Risk Level (Low/Medium/High/Critical)
│           │   └── Anomaly Count
│           │
│           ├── Anomalies Section (if any)
│           │   └── Amber/Red Warning Cards
│           │
│           ├── Carrier Information (if enabled)
│           │   ├── Carrier Name
│           │   ├── Line Type (color-coded)
│           │   ├── Country
│           │   └── Network Type
│           │
│           ├── CNAM Information (if enabled)
│           │   ├── Associated Name
│           │   └── Confidence %
│           │
│           ├── Social Media Footprint (if enabled)
│           │   └── Platform Cards (WhatsApp, Telegram, Signal, TrueCaller)
│           │
│           ├── Data Breach History (if breaches found)
│           │   └── Breach Cards (Date, Fields, Severity)
│           │
│           ├── Geolocation & Network (if enabled)
│           │   ├── Country
│           │   ├── Timezone
│           │   ├── Coordinates
│           │   └── Network Status
│           │
│           └── Export Button + Timestamp
```

---

## 🔄 Data Flow Diagram

```
User Input
    ↓
┌─────────────────────────────────────┐
│  handleScan()                       │
│  - Validate phoneNumber             │
│  - Set isScanning = true            │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│  streamPhoneIntelligence()          │
│  (Async Generator)                  │
└─────────────────────────────────────┘
    ↓ (Multiple yields over time)
┌─────────────────────────────────────┐
│  Streaming Sequence:                │
│  1. Carrier Lookup (800ms)          │
│  2. CNAM Discovery (1000ms)         │
│  3. Social Media Scan (1500ms)      │
│  4. Breach Database (2000ms)        │
│  5. Geolocation (1200ms)            │
│  6. Risk Calculation (instant)      │
└─────────────────────────────────────┘
    ↓ (Each yield)
┌─────────────────────────────────────┐
│  setResults(prev => ({              │
│    ...prev,                         │
│    ...partial                       │
│  }))                                │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│  PhoneResultsGrid Re-renders        │
│  with new data section              │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│  User sees progressive results      │
│  Zero Cumulative Layout Shift       │
└─────────────────────────────────────┘
```

---

## 🎨 Risk Scoring System

```
Input: Array of Anomalies
Process:
  VoIP Detected ............................ +30
  Virtual Number ........................... +25
  Leaked in Data Breach .................... +40
  Suspicious Geolocation ................... +20
  Known Phishing Infrastructure ............ +50
  High Activity Anomaly .................... +15
  [Sum all applicable]
  └── Cap at 100

Output: Risk Level
  ├── 0-24 ............ LOW (Green)
  ├── 25-39 ......... MEDIUM (Yellow)
  ├── 40-59 ........... HIGH (Orange)
  └── 60-100 ...... CRITICAL (Red)
```

---

## 🔌 API Integration Points

### Point 1: Phone Input Validation
```typescript
// Current: Client-side only
validatePhoneNumber(phone, countryCode): boolean

// Integration: Send to backend
POST /api/validate-phone
{ phoneNumber: string, countryCode: string }
```

### Point 2: Intelligence Streaming
```typescript
// Current: Async generator simulation
for await (const partial of streamPhoneIntelligence(...))

// Integration: Real API with streaming
const response = await fetch('/api/phone-intelligence', {
  method: 'POST',
  body: JSON.stringify({ phoneNumber, countryCode, config })
})
const reader = response.body.getReader()
// Read chunks and update state
```

### Point 3: Export Report
```typescript
// Current: Client-side JSON download
const element = document.createElement('a')
element.setAttribute('download', `report.json`)

// Integration: Generate on server
POST /api/reports/generate
{ phoneNumber, result: PhoneIntelligenceResult }
Response: { downloadUrl: string, format: 'json'|'pdf' }
```

---

## 🛠️ Component Communication

```
PhoneIntelligencePage (Orchestrator)
    ↓
    ├── State: phoneNumber, countryCode, results, scanConfig, isScanning
    ├── Handler: handleScan() → calls streamPhoneIntelligence()
    └── Handler: handleExportReport() → JSON download
    
    ├─→ PhoneInputPanel
    │   ├── Props: { phoneNumber, countryCode, isScanning, onPhoneChange, onCountryChange, onScan }
    │   └── Uses: COUNTRY_CODES (from lib/phoneUtils.ts)
    │
    ├─→ PhoneScanOptions
    │   ├── Props: { config, onConfigChange, disabled }
    │   └── State: expandedTip (for info tooltips)
    │
    └─→ PhoneResultsGrid
        ├── Props: { result, onExport }
        ├── Uses: getRiskColor(), getRiskLevel(), getRiskBgColor()
        └── Conditional Rendering based on result data
```

---

## 📦 File Dependency Map

```
App.tsx
├── imports Router, Routes, Route from react-router-dom
├── imports all Page components
├── imports Layout components (Sidebar, Topbar)
└── imports global.css

PhoneIntelligencePage.tsx
├── imports useState, useCallback from react
├── imports icons from lucide-react
├── imports PhoneInputPanel, PhoneScanOptions, PhoneResultsGrid
├── imports streamPhoneIntelligence from lib/streamingUtils
└── imports types from types/index

PhoneInputPanel.tsx
├── imports icons from lucide-react
├── imports COUNTRY_CODES from lib/phoneUtils
└── local component state & handlers

PhoneScanOptions.tsx
├── imports icons from lucide-react
├── imports useState from react
└── local component state & handlers

PhoneResultsGrid.tsx
├── imports icons from lucide-react
├── imports PhoneIntelligenceResult type
├── imports getRiskColor, getRiskLevel, getRiskBgColor from lib/phoneUtils
└── conditional rendering based on result properties
```

---

## 🎯 CSS Class Reference

### Utility Classes (Tailwind)
```
Layout:
  grid, grid-cols-*, gap-*, p-*, w-*, h-*, flex, items-center, justify-between

Colors (Cyber Dark):
  bg-slate-900, bg-slate-800, text-slate-100, text-slate-300, text-slate-400
  bg-cyan-500/10, text-cyan-400, border-cyan-400/30
  bg-red-500/10, text-red-500, border-red-500/30 (high risk)
  bg-orange-500/10, text-orange-500, border-orange-500/30 (medium risk)
  bg-yellow-500/10, text-yellow-500, border-yellow-500/30 (low risk)
  bg-green-500/10, text-green-500, border-green-500/30 (success)

States:
  hover:, focus:, disabled:, active:
  opacity-50, cursor-not-allowed, transition-all, duration-200
  animate-pulse, animate-spin

Rounded:
  rounded, rounded-lg, rounded-full
```

### Custom Classes (globals.css)
```
.glass-effect ......... Frosted glass with backdrop blur
.glow-text ............ Cyan text with drop shadow
.glow-border .......... Cyan border with shadow
.neon-glow ............ Animated glow effect
.severity-badge ....... Consistent badge styling
.scan-input ........... Form input styling
.scan-button .......... CTA button with gradient
.result-card .......... Result display card styling
.skeleton-loader ...... Loading placeholder animation
```

---

## 🔐 Type System

```typescript
// Main Result Type
PhoneIntelligenceResult
├── phoneNumber: string
├── validationStatus: 'valid' | 'invalid' | 'unknown'
├── carrier?: CarrierInfo
├── cnam?: CNAMResult
├── socialMedia?: SocialMediaFootprint[]
├── breaches?: BreachData[]
├── geolocation?: GeolocationData
├── overallRiskScore: number
├── anomalies: string[]
└── scanTimestamp: string

// Sub-types
CarrierInfo { carrier, lineType, country, countryCode, networkType }
CNAMResult { name, confidence, lastUpdated }
SocialMediaFootprint { platform, found, handle, risk }
BreachData { breachName, breachDate, compromisedFields, severity }
GeolocationData { country, timezone, coordinates, networkStatus }

// Config Types
PhoneValidationRequest { phoneNumber, countryCode, enable* toggles }
PhoneScanConfig { enableCarrierLookup, enableCNAM, enableSocialMediaScan, ... }
```

---

## 📋 Component Props Reference

### PhoneInputPanel Props
```typescript
{
  phoneNumber: string
  countryCode: string
  onPhoneChange: (value: string) => void
  onCountryChange: (value: string) => void
  onScan: () => void
  isScanning: boolean
}
```

### PhoneScanOptions Props
```typescript
{
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

### PhoneResultsGrid Props
```typescript
{
  result: PhoneIntelligenceResult
  onExport: () => void
}
```

---

## 🚀 Deployment Checklist

- [ ] Environment variables configured
- [ ] API endpoints updated to production URLs
- [ ] TypeScript compilation successful (`npm run build`)
- [ ] Vite production build generated
- [ ] Assets minified and optimized
- [ ] Service Worker configured (optional)
- [ ] Error tracking enabled
- [ ] Analytics integrated
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Monitoring/logging setup

---

## 📊 Performance Metrics Target

| Metric | Target | Status |
|--------|--------|--------|
| First Contentful Paint | < 1.5s | ✅ |
| Largest Contentful Paint | < 2.5s | ✅ |
| Cumulative Layout Shift | < 0.1 | ✅ |
| Time to Interactive | < 3.5s | ✅ |
| Build Size (gzip) | < 125KB | ✅ 122.92KB |
| Lighthouse Score | > 90 | 📊 To Test |

---

## 🔗 Quick Links

- **TypeScript Config**: `tsconfig.json`
- **Vite Config**: `vite.config.ts`
- **Tailwind Config**: `tailwind.config.ts`
- **Main App**: `src/App.tsx`
- **Phone Page**: `src/pages/PhoneIntelligence.tsx`
- **Phone Components**: `src/components/phone/`
- **Utilities**: `src/lib/phoneUtils.ts`, `src/lib/streamingUtils.ts`
- **Types**: `src/types/index.ts`
- **Styles**: `src/styles/globals.css`

---

**Last Updated**: June 2024
**Version**: 1.0.0
