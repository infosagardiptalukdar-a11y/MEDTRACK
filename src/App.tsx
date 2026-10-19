import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Dashboard } from './components/Dashboard'
import { MedicationList } from './components/MedicationList'
import { InteractionChecker } from './components/InteractionChecker'
import { VitalsTracker } from './components/VitalsTracker'
import { AddMedicationModal } from './components/AddMedicationModal'
import { INITIAL_MEDICATIONS } from './data/initialMedications'
import type { Medication } from './types/medication'
import './index.css'

export function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'medications' | 'interactions' | 'vitals'>('dashboard')
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('medtrack_theme')
    return saved ? saved === 'dark' : true
  })
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem('medtrack_medications')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        // fallback
      }
    }
    return INITIAL_MEDICATIONS
  })

  // Sync theme
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('medtrack_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('medtrack_theme', 'light')
    }
  }, [isDark])

  // Save medications to local storage
  const saveMedications = (newMeds: Medication[]) => {
    setMedications(newMeds)
    localStorage.setItem('medtrack_medications', JSON.stringify(newMeds))
  }

  // Toggle dose taken status
  const handleToggleTaken = (medId: string, timeSlot: string) => {
    const updated = medications.map((med) => {
      if (med.id !== medId) return med
      const current = !!med.takenToday[timeSlot]
      const nextState = !current

      // Adjust remaining pills
      let remaining = med.pillsRemaining
      if (nextState) {
        remaining = Math.max(0, remaining - 1)
      } else {
        remaining = Math.min(med.totalPills, remaining + 1)
      }

      return {
        ...med,
        pillsRemaining: remaining,
        takenToday: {
          ...med.takenToday,
          [timeSlot]: nextState,
        },
      }
    })
    saveMedications(updated)
  }

  // Refill medication
  const handleRefill = (medId: string, amount: number = 30) => {
    const updated = medications.map((med) => {
      if (med.id !== medId) return med
      return {
        ...med,
        pillsRemaining: Math.min(med.totalPills + amount, med.pillsRemaining + amount),
      }
    })
    saveMedications(updated)
  }

  // Delete medication
  const handleDeleteMedication = (id: string) => {
    if (window.confirm('Are you sure you want to remove this prescription?')) {
      const updated = medications.filter((m) => m.id !== id)
      saveMedications(updated)
    }
  }

  // Add new medication
  const handleAddMedication = (newMed: Medication) => {
    const updated = [newMed, ...medications]
    saveMedications(updated)
  }

  const lowStockCount = medications.filter((m) => m.pillsRemaining <= 7).length

  return (
    <div className="app-layout">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        lowStockCount={lowStockCount}
      />

      <main className="main-content-area">
        {activeTab === 'dashboard' && (
          <Dashboard
            medications={medications}
            onToggleTaken={handleToggleTaken}
            onQuickRefill={(id) => handleRefill(id, 30)}
            onNavigateToMedications={() => setActiveTab('medications')}
            onNavigateToSafety={() => setActiveTab('interactions')}
          />
        )}

        {activeTab === 'medications' && (
          <MedicationList
            medications={medications}
            onDeleteMedication={handleDeleteMedication}
            onRefillMedication={handleRefill}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'interactions' && (
          <InteractionChecker medications={medications} />
        )}

        {activeTab === 'vitals' && <VitalsTracker />}
      </main>

      {/* Add Medication Dialog Modal */}
      <AddMedicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMedication}
      />

      {/* App Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="footer-brand">MEDTRACK</span>
            <span className="footer-desc">
              Clinical Drug Safety & Medication Adherence Intelligence Platform
            </span>
          </div>
          <div className="footer-right">
            <span>Designed for Pharmaceutical Sciences & Healthcare Technology</span>
            <a
              href="https://github.com/infosagardiptalukdar-a11y/MEDTRACK"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
