import { useState, type FC } from 'react'
import { 
  Pill, 
  Search, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Filter
} from 'lucide-react'
import type { Medication, MedicationCategory } from '../types/medication'

interface MedicationListProps {
  medications: Medication[]
  onDeleteMedication: (id: string) => void
  onRefillMedication: (id: string, amount: number) => void
  onOpenAddModal: () => void
}

const CATEGORIES: ('All' | MedicationCategory)[] = [
  'All',
  'Cardiovascular',
  'Diabetes',
  'Vitamins & Supplements',
  'Antibiotic',
  'Analgesic',
  'Respiratory',
]

export const MedicationList: FC<MedicationListProps> = ({
  medications,
  onDeleteMedication,
  onRefillMedication,
  onOpenAddModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'All' | MedicationCategory>('All')

  const filteredMeds = medications.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (med.genericName && med.genericName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      med.instructions.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="medications-view animate-fade-in">
      {/* Top Header */}
      <div className="section-header-row">
        <div>
          <h1 className="dashboard-title">My Prescription Locker</h1>
          <p className="dashboard-subtitle">
            View detailed dosing regimens, pill inventory, and refill statuses for all registered medications.
          </p>
        </div>
        <button className="btn-primary-add" onClick={onOpenAddModal}>
          <Plus size={18} />
          <span>Add New Medication</span>
        </button>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="filter-controls-card">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by brand name, generic name, or condition..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="category-chips-row">
          <span className="filter-label"><Filter size={14} /> Filter:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Medications */}
      {filteredMeds.length === 0 ? (
        <div className="empty-state-card">
          <Pill size={48} className="text-slate-400 mb-2" />
          <h3>No medications match your filter</h3>
          <p>Try modifying your search query or add a new medication.</p>
          <button className="btn-primary-add mt-4" onClick={onOpenAddModal}>
            <Plus size={16} /> Add Medication
          </button>
        </div>
      ) : (
        <div className="meds-grid">
          {filteredMeds.map((med) => {
            const isLowStock = med.pillsRemaining <= 7
            const stockPercent = Math.min(100, Math.round((med.pillsRemaining / med.totalPills) * 100))

            return (
              <div key={med.id} className="med-detail-card">
                <div className="med-card-top">
                  <div className="med-avatar" style={{ backgroundColor: `${med.color}20`, borderColor: med.color }}>
                    <Pill size={22} style={{ color: med.color }} />
                  </div>
                  <div className="med-title-block">
                    <h3 className="med-name">{med.name}</h3>
                    {med.genericName && (
                      <span className="med-generic">{med.genericName}</span>
                    )}
                  </div>
                  <button
                    className="btn-icon-delete"
                    onClick={() => onDeleteMedication(med.id)}
                    title="Remove Prescription"
                    aria-label={`Delete ${med.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="med-badges-row">
                  <span className="badge-dosage">{med.dosage}</span>
                  <span className="badge-category">{med.category}</span>
                  <span className="badge-freq">{med.frequency}</span>
                </div>

                <div className="med-schedule-block">
                  <div className="schedule-label">
                    <Clock size={14} /> Scheduled Doses:
                  </div>
                  <div className="schedule-times-list">
                    {med.timeSlots.map((time) => (
                      <span key={time} className="time-chip">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="med-instructions-text">
                  <strong>Notes:</strong> {med.instructions}
                </p>

                {/* Pill Stock & Refill Section */}
                <div className="stock-section">
                  <div className="stock-info-row">
                    <span className="stock-label">
                      {isLowStock ? (
                        <span className="stock-alert"><AlertCircle size={14} /> Low Inventory</span>
                      ) : (
                        <span className="stock-ok"><CheckCircle size={14} /> In Stock</span>
                      )}
                    </span>
                    <span className="stock-numbers">
                      <strong>{med.pillsRemaining}</strong> / {med.totalPills} pills
                    </span>
                  </div>

                  <div className="stock-progress-bar">
                    <div 
                      className={`stock-progress-fill ${isLowStock ? 'fill-danger' : 'fill-good'}`}
                      style={{ width: `${stockPercent}%` }}
                    />
                  </div>

                  <div className="med-card-footer">
                    <button
                      className="btn-card-refill"
                      onClick={() => onRefillMedication(med.id, 30)}
                      title="Refill 30 pills"
                    >
                      <RotateCcw size={14} /> Refill (+30 Pills)
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
