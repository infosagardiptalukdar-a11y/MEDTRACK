import type { FC } from 'react'
import { Pill, Sun, Moon, Plus, ShieldCheck, Activity, LayoutDashboard } from 'lucide-react'

interface NavbarProps {
  activeTab: 'dashboard' | 'medications' | 'interactions' | 'vitals'
  setActiveTab: (tab: 'dashboard' | 'medications' | 'interactions' | 'vitals') => void
  isDark: boolean
  setIsDark: (dark: boolean) => void
  onOpenAddModal: () => void
  lowStockCount: number
}

export const Navbar: FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isDark,
  setIsDark,
  onOpenAddModal,
  lowStockCount,
}) => {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="navbar-brand" onClick={() => setActiveTab('dashboard')} role="button" tabIndex={0}>
          <div className="brand-logo-glow">
            <Pill className="brand-icon" size={24} />
          </div>
          <div className="brand-text">
            <div className="brand-title-wrap">
              <span className="brand-title">MEDTRACK</span>
              <span className="brand-badge">PRO</span>
            </div>
            <span className="brand-tagline">Clinical Medication & Health Safety</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          <button
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Today's Schedule</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'medications' ? 'active' : ''}`}
            onClick={() => setActiveTab('medications')}
          >
            <Pill size={18} />
            <span>My Medications</span>
            {lowStockCount > 0 && (
              <span className="nav-counter-badge warning">{lowStockCount}</span>
            )}
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'interactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('interactions')}
          >
            <ShieldCheck size={18} />
            <span>Safety & Interactions</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'vitals' ? 'active' : ''}`}
            onClick={() => setActiveTab('vitals')}
          >
            <Activity size={18} />
            <span>Vitals & Logs</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="navbar-actions">
          <button
            className="theme-toggle-btn"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle Dark/Light Mode"
            title="Toggle theme"
          >
            {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>

          <button
            className="btn-primary-add"
            onClick={onOpenAddModal}
          >
            <Plus size={18} />
            <span className="hide-mobile">Add Dose</span>
          </button>
        </div>
      </div>
    </header>
  )
}
