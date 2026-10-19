import { useState, type FC } from 'react'
import { X, Pill, Plus } from 'lucide-react'
import type { Medication, MedicationCategory } from '../types/medication'

interface AddMedicationModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (newMed: Medication) => void
}

const CATEGORIES: MedicationCategory[] = [
  'Cardiovascular',
  'Diabetes',
  'Vitamins & Supplements',
  'Antibiotic',
  'Analgesic',
  'Respiratory',
  'Mental Health',
]

const COLORS = [
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
]

export const AddMedicationModal: FC<AddMedicationModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('')
  const [genericName, setGenericName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('Once daily')
  const [timeSlotsInput, setTimeSlotsInput] = useState('08:00')
  const [category, setCategory] = useState<MedicationCategory>('Cardiovascular')
  const [instructions, setInstructions] = useState('Take with plenty of water.')
  const [totalPills, setTotalPills] = useState('30')
  const [selectedColor, setSelectedColor] = useState(COLORS[0])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !dosage.trim()) return

    const slots = timeSlotsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: name.trim(),
      genericName: genericName.trim() || undefined,
      dosage: dosage.trim(),
      frequency,
      timeSlots: slots.length > 0 ? slots : ['08:00'],
      category,
      instructions: instructions.trim(),
      pillsRemaining: parseInt(totalPills, 10) || 30,
      totalPills: parseInt(totalPills, 10) || 30,
      color: selectedColor,
      shape: 'round',
      takenToday: {},
    }

    onAdd(newMed)
    onClose()

    // reset
    setName('')
    setGenericName('')
    setDosage('')
    setTimeSlotsInput('08:00')
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-pill-icon">
              <Pill size={20} className="text-cyan-400" />
            </div>
            <div>
              <h3>Add New Prescription</h3>
              <p className="text-xs text-slate-400">Register medication regimen and refill alerts</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row-2">
            <div className="form-group">
              <label>Brand / Medicine Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Lipitor, Metformin"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Generic Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Atorvastatin"
                value={genericName}
                onChange={(e) => setGenericName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label>Dosage Strength *</label>
              <input
                type="text"
                required
                placeholder="e.g. 500 mg, 10 mg"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MedicationCategory)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Frequency</label>
              <input
                type="text"
                placeholder="e.g. Once daily, Twice daily"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label>Schedule Times (comma-separated, 24h format)</label>
              <input
                type="text"
                placeholder="e.g. 08:00, 20:00"
                value={timeSlotsInput}
                onChange={(e) => setTimeSlotsInput(e.target.value)}
              />
              <span className="field-hint">e.g. 08:00 for 8 AM, 20:30 for 8:30 PM</span>
            </div>

            <div className="form-group">
              <label>Total Pills / Bottle Size</label>
              <input
                type="number"
                min="1"
                max="500"
                value={totalPills}
                onChange={(e) => setTotalPills(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Administration Guidance / Meal Relation</label>
            <input
              type="text"
              placeholder="e.g. Take with dinner, avoid dairy within 2 hours"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Pill Theme Color</label>
            <div className="color-swatches-row">
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`color-swatch-btn ${selectedColor === c ? 'active-swatch' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setSelectedColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-add">
              <Plus size={16} /> Save Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
