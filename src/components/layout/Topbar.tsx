import { Settings, Bell, User } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="h-16 bg-slate-800/50 border-b border-slate-700/50 backdrop-blur-md flex items-center justify-between px-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-100">Advanced Reconnaissance Platform</h2>
        <p className="text-xs text-slate-400">Integrated OSINT & Security Intelligence</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-700/20 border border-slate-700/30">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-slate-300">System Active</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-700/30 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-slate-300" />
          </button>
          <button className="p-2 hover:bg-slate-700/30 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-slate-300" />
          </button>
          <button className="p-2 hover:bg-slate-700/30 rounded-lg transition-colors">
            <User className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  )
}
