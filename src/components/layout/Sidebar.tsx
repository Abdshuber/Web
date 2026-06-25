import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  Globe,
  Phone,
  Radar,
  Search,
  Zap,
  Network,
  Database,
  Shield,
  Menu,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', icon: BarChart3, label: 'Dashboard' },
  { path: '/osint', icon: Globe, label: 'OSINT Framework' },
  { path: '/phone-intelligence', icon: Phone, label: 'Phone Intelligence' },
  { path: '/nmap', icon: Radar, label: 'Nmap Scanner' },
  { path: '/nuclei', icon: Zap, label: 'Nuclei' },
  { path: '/httpx', icon: Search, label: 'HTTPX' },
  { path: '/whatwaf', icon: Shield, label: 'WhatWAF' },
  { path: '/database', icon: Database, label: 'DB Vulnerability' },
]

export default function Sidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700/50 transition-all duration-300 flex flex-col h-screen`}>
      <div className="flex items-center justify-between p-6 border-b border-slate-700/30">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-lg font-bold glow-text">OSINT</h1>
              <p className="text-xs text-slate-400">Recon Suite</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 space-y-2 px-3">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-400'
                  : 'text-slate-300 hover:bg-slate-700/30 hover:text-slate-100'
              }`}
              title={collapsed ? label : ''}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-700/30 p-4">
        <div className={`text-xs text-slate-400 ${collapsed ? 'text-center' : ''}`}>
          {!collapsed && <p>v1.0.0 • Enterprise</p>}
        </div>
      </div>
    </aside>
  )
}
