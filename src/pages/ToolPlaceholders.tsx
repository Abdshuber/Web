import { Radar, Zap, Search, Shield, Database } from 'lucide-react'

const createToolPage = (Icon: any, title: string, description: string) => {
  return () => (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">{title}</h1>
            <p className="text-slate-400">{description}</p>
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-lg p-12 text-center space-y-4">
        <Icon className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-300">{title}</h2>
        <p className="text-slate-400 max-w-md mx-auto">{description}</p>
      </div>
    </div>
  )
}

export const NmapPage = createToolPage(Radar, 'Nmap Scanner', 'Advanced network discovery and port scanning with service enumeration')

export const NucleiPage = createToolPage(Zap, 'Nuclei', 'Rapid vulnerability scanning with customizable templates and workflows')

export const HTTPXPage = createToolPage(Search, 'HTTPX', 'Fast HTTP toolkit for probing, feature detection, and data extraction')

export const WhatWAFPage = createToolPage(Shield, 'WhatWAF', 'Web Application Firewall detection and fingerprinting')

export const DatabasePage = createToolPage(Database, 'Database Vulnerability Scanner', 'Advanced SQL injection and database vulnerability assessment')

export const OSINTPage = createToolPage(undefined, 'OSINT Framework', 'Multi-source intelligence gathering across public sources')
