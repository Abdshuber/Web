import { Database } from 'lucide-react'

export default function DatabasePage() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
            <Database className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Database Vulnerability Scanner</h1>
            <p className="text-slate-400">Advanced SQL injection and database vulnerability assessment</p>
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-lg p-12 text-center space-y-4">
        <Database className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-300">Database Vulnerability Scanner</h2>
        <p className="text-slate-400 max-w-md mx-auto">Automated detection of SQL injection and database-level vulnerabilities with risk assessment.</p>
      </div>
    </div>
  )
}
