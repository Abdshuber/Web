# OSINT & Reconnaissance Platform - Architecture Guide

## 🏗️ Scalable Directory Structure

```
osint-reconnaissance-platform/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx          # Main navigation
│   │   │   └── Topbar.tsx           # Header with status
│   │   ├── phone/
│   │   │   ├── PhoneInputPanel.tsx  # Smart phone input with country code selector
│   │   │   ├── PhoneScanOptions.tsx # Toggle switches for OSINT modules
│   │   │   └── PhoneResultsGrid.tsx # Real-time results display with badges
│   │   ├── common/                  # Reusable UI components (future)
│   │   └── visualization/           # Charts, graphs, link analysis (future)
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx            # Main overview dashboard
│   │   ├── PhoneIntelligence.tsx    # Phone validator main page
│   │   ├── Nmap.tsx                 # Network scanner
│   │   ├── Nuclei.tsx               # Vulnerability scanner
│   │   ├── HTTPX.tsx                # HTTP toolkit
│   │   ├── WhatWAF.tsx              # WAF detection
│   │   ├── Database.tsx             # Database vulnerability scanner
│   │   └── OSINT.tsx                # OSINT framework
│   │
│   ├── lib/
│   │   ├── phoneUtils.ts            # Phone validation, formatting, risk scoring
│   │   ├── streamingUtils.ts        # WebSocket/SSE simulation
│   │   └── utils.ts                 # General utilities (future)
│   │
│   ├── hooks/                       # Custom React hooks (future)
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces & types
│   ├── styles/
│   │   └── globals.css              # Tailwind & custom styles
│   ├── App.tsx                      # Main app router
│   └── main.tsx                     # Entry point
│
├── index.html                       # HTML template
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts               # Tailwind CSS theme
├── postcss.config.js                # PostCSS plugins
├── package.json                     # Dependencies
└── ARCHITECTURE.md                  # This file
```

## 🔧 Technology Stack

### Framework & Build
- **React 18** - Component-based UI
- **Vite** - Lightning-fast dev server & build tool
- **TypeScript** - Type-safe development

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** - Cyber-dark theme with glowing effects

### Icons & UI
- **Lucide React** - Professional, minimal icon library
- **Radix UI** (future) - Accessible component primitives

### Data Visualization
- **Recharts** - Interactive charts for threat intelligence
- **Graph Visualization** (future) - Link analysis graphs

### State & Async
- **React Router** - Client-side routing
- **Async Generators** - Real-time streaming simulation

## 🎨 Design System

### Color Palette (Cyber Dark Theme)
```css
Primary: Cyan #0ff (Focus, active states)
Dark: Slate-900 #0f172a (Background)
Text: Slate-100 #f1f5f9 (Primary text)
Accent: Zinc/Slate (Neutral tones)
Risk: Red #ff1744 (Critical)
```

### Component Patterns

**Glass Effect**
```tsx
<div className="glass-effect rounded-lg p-6">
  // Frosted glass background with blur
</div>
```

**Severity Badges**
- Critical: Red (50+ risk score)
- High: Orange (40-49 risk)
- Medium: Yellow (25-39 risk)
- Low: Green (0-24 risk)

**Input Styling**
```tsx
className="scan-input" // Consistent phone/text inputs
className="scan-button" // Consistent action buttons
```

## 📱 Phone Intelligence Module

### Features
1. **Smart Input Component**
   - Dynamic country code selector with flag emojis
   - Syntax validation for various phone formats
   - Real-time formatting feedback

2. **Advanced OSINT Toggles**
   - [ ] Carrier & Line Type Lookup (Mobile/Landline/VoIP/Premium)
   - [ ] CNAM / Caller ID Discovery
   - [ ] Social Media & Messenger Footprint (WhatsApp, Telegram, TrueCaller, Signal)
   - [ ] Data Leak & Breach Scan
   - [ ] Geolocation / HLR Lookups

3. **Real-Time Results Grid**
   - Cards render asynchronously as data streams
   - Severity badges highlight anomalies
   - VoIP detection triggers Amber/Red warnings
   - Export to JSON for reports

### Data Flow
```
User Input → Validation → Stream Generation → Result Grid Update
                                    ↓
                    Carrier → CNAM → Social Media → Breaches → Geolocation
                                    ↓
                            Risk Score Calculation → Badge Generation
```

### Risk Scoring Algorithm
```typescript
VoIP Detected: +30pts
Virtual Number: +25pts
Leaked in Breach: +40pts
Suspicious Geolocation: +20pts
Known Phishing Infrastructure: +50pts
High Activity Anomaly: +15pts
Max Score: 100pts
```

## 🔌 API & Streaming Integration Points

### WebSocket/SSE Simulation
The `streamPhoneIntelligence()` generator simulates real-time data:
```typescript
for await (const partial of streamPhoneIntelligence(...)) {
  // Update UI with partial results
  setResults(prev => ({ ...prev, ...partial }))
}
```

### Expected Real API Integration
Replace the async generator with actual API calls:
```typescript
const response = await fetch('/api/phone-intelligence', {
  method: 'POST',
  body: JSON.stringify({ phone, countryCode, config })
})

// Use ReadableStream for streaming results
const reader = response.body.getReader()
```

## 🛠️ Extension Points

### Adding New Tools
1. Create page in `src/pages/NewTool.tsx`
2. Add component folder in `src/components/newTool/`
3. Define types in `src/types/index.ts`
4. Add utility functions in `src/lib/`
5. Register route in `App.tsx`
6. Add navigation item to `Sidebar.tsx`

### Example: Adding Nmap Tool Components
```
src/components/nmap/
├── NmapInputPanel.tsx
├── NmapScanOptions.tsx
├── NmapResultsTable.tsx
└── NmapVisualizer.tsx
```

### Adding Data Visualization
- Import Recharts for analytics
- Create components in `src/components/visualization/`
- Link to threat intelligence data

## 🚀 Performance Optimizations

### Implemented
- Virtualized scrolling for large log outputs
- Streaming results to prevent CLS (Cumulative Layout Shift)
- Skeleton loaders during scanning
- CSS variables for theme switching

### Recommended
- React.memo() for expensive components
- Lazy loading tool pages
- IndexedDB for caching scan history
- Service Workers for offline support

## 🔐 Security Considerations

### Current Implementation
- Client-side validation only
- No sensitive data persistence
- Type-safe component props

### Production Hardening
- CSRF protection on API calls
- Rate limiting for scans
- Authentication/authorization
- Audit logging
- Encrypted result storage

## 📊 Export & Reporting

### Supported Formats
- JSON (structured data)
- PDF (executive summary)
- CSV (tabular results)

### Report Components
- Summary with risk scores
- Detailed findings per module
- Anomaly analysis
- Recommendations

## 🧪 Testing Strategy

### Unit Tests
- Phone validation utilities
- Risk scoring algorithm
- Component rendering

### Integration Tests
- Full scan workflow
- Data streaming
- Export generation

### E2E Tests
- Complete user journeys
- Navigation between tools
- Real-time updates

## 📈 Scalability Notes

### Database Considerations
- Store scan history with timestamps
- Cache carrier/CNAM lookups
- Archive reports by date range

### API Design
- Pagination for large result sets
- Webhook support for async operations
- Caching headers for repeated queries

### Frontend Optimization
- Code splitting per tool
- Dynamic imports for heavy modules
- IndexedDB for offline results

## 🎯 Next Steps

1. Implement actual backend API integration
2. Add Threat Intelligence Graph visualization
3. Build Database Vulnerability Scanner UI
4. Create Nmap advanced configuration interface
5. Add user authentication & scan history
6. Implement PDF report generation
7. Add WebSocket real-time updates
8. Create dark mode toggle (if needed)
