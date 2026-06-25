import { Search } from 'lucide-react'

export default function HTTPXPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
            <Search className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">HTTPX</h1>
            <p className="text-slate-400">Fast HTTP toolkit for probing, feature detection, and data extraction</p>
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-lg p-12 text-center space-y-4">
        <Search className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-300">HTTPX</h2>
        <p className="text-slate-400 max-w-md mx-auto">Multi-purpose HTTP client for fast probing and web server enumeration.</p>
      </div>
    </div>
  )
}
