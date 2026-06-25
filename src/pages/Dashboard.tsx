import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-400/30">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Dashboard</h1>
            <p className="text-slate-400">Unified reconnaissance intelligence platform overview</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Scans', value: '1,247', change: '+12%', icon: BarChart3 },
          { label: 'Threats Detected', value: '38', change: '+5%', icon: AlertCircle },
          { label: 'Analysis Tools', value: '8', change: 'All Active', icon: TrendingUp },
          { label: 'Export Reports', value: '156', change: '+23%', icon: BarChart3 },
        ].map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="glass-effect rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Icon className="w-6 h-6 text-cyan-400" />
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-100">{stat.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-effect rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-100">Recent Scans</h2>
          <div className="space-y-3">
            {[
              { tool: 'Phone Intelligence', target: '+1 (555) 123-4567', status: 'Complete', risk: 'High' },
              { tool: 'Nmap Scanner', target: '192.168.1.1', status: 'Complete', risk: 'Medium' },
              { tool: 'Nuclei', target: 'example.com', status: 'Running', risk: 'Medium' },
            ].map((scan, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
                <div>
                  <p className="text-sm font-semibold text-slate-200">{scan.tool}</p>
                  <p className="text-xs text-slate-400">{scan.target}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">
                    {scan.status}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    scan.risk === 'High' ? 'bg-red-500/20 text-red-300' :
                    scan.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {scan.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-100">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'New Phone Scan', path: '/phone-intelligence' },
              { label: 'Network Reconnaissance', path: '/nmap' },
              { label: 'Vulnerability Assessment', path: '/nuclei' },
              { label: 'Export Reports', path: '/' },
            ].map((action, idx) => (
              <a
                key={idx}
                href={action.path}
                className="block p-3 bg-slate-800/30 rounded-lg border border-slate-700/30 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors text-center text-sm font-medium"
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
