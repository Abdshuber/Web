import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'
import PhoneIntelligencePage from '@/pages/PhoneIntelligence'
import NmapPage from '@/pages/Nmap'
import NucleiPage from '@/pages/Nuclei'
import HTTPXPage from '@/pages/HTTPX'
import WhatWAFPage from '@/pages/WhatWAF'
import DatabasePage from '@/pages/Database'
import OSINTPage from '@/pages/OSINT'
import DashboardPage from '@/pages/Dashboard'
import '@/styles/globals.css'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <Topbar />
          
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/osint" element={<OSINTPage />} />
              <Route path="/phone-intelligence" element={<PhoneIntelligencePage />} />
              <Route path="/nmap" element={<NmapPage />} />
              <Route path="/nuclei" element={<NucleiPage />} />
              <Route path="/httpx" element={<HTTPXPage />} />
              <Route path="/whatwaf" element={<WhatWAFPage />} />
              <Route path="/database" element={<DatabasePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}
