import { useState, type FC } from 'react'
import { Activity, Heart, Droplets, Plus, Calendar, TrendingUp } from 'lucide-react'
import type { VitalLog } from '../types/medication'
import { INITIAL_VITALS } from '../data/initialMedications'

export const VitalsTracker: FC = () => {
  const [vitals, setVitals] = useState<VitalLog[]>(() => {
    const saved = localStorage.getItem('medtrack_vitals')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        // fallback
      }
    }
    return INITIAL_VITALS
  })

  const [showLogForm, setShowLogForm] = useState(false)
  const [systolic, setSystolic] = useState('120')
  const [diastolic, setDiastolic] = useState('80')
  const [bloodSugar, setBloodSugar] = useState('100')
  const [heartRate, setHeartRate] = useState('72')

  const handleAddReading = (e: React.FormEvent) => {
    e.preventDefault()
    const newEntry: VitalLog = {
      id: `v-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      systolic: parseInt(systolic, 10) || 120,
      diastolic: parseInt(diastolic, 10) || 80,
      bloodSugar: parseInt(bloodSugar, 10) || 100,
      heartRate: parseInt(heartRate, 10) || 72,
    }

    const updated = [newEntry, ...vitals]
    setVitals(updated)
    localStorage.setItem('medtrack_vitals', JSON.stringify(updated))
    setShowLogForm(false)
  }

  // Calculate averages
  const avgSystolic = Math.round(vitals.reduce((acc, v) => acc + v.systolic, 0) / (vitals.length || 1))
  const avgDiastolic = Math.round(vitals.reduce((acc, v) => acc + v.diastolic, 0) / (vitals.length || 1))
  const avgSugar = Math.round(vitals.reduce((acc, v) => acc + v.bloodSugar, 0) / (vitals.length || 1))
  const avgHR = Math.round(vitals.reduce((acc, v) => acc + v.heartRate, 0) / (vitals.length || 1))

  return (
    <div className="vitals-view animate-fade-in">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <h1 className="dashboard-title">Biometric Vitals & Health Metrics</h1>
          <p className="dashboard-subtitle">
            Correlate medication compliance with key physiological markers like blood pressure and glycaemic levels.
          </p>
        </div>
        <button
          className="btn-primary-add"
          onClick={() => setShowLogForm(!showLogForm)}
        >
          <Plus size={18} />
          <span>Log New Reading</span>
        </button>
      </div>

      {/* KPI Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Blood Pressure (Avg)</span>
            <Heart size={20} className="text-rose-500" />
          </div>
          <div className="stat-value">{avgSystolic}/{avgDiastolic} <span className="stat-unit">mmHg</span></div>
          <p className="stat-caption text-emerald-400">
            {avgSystolic < 125 ? '✓ Normotensive target' : '⚠ Pre-hypertension threshold'}
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Fasting Glucose (Avg)</span>
            <Droplets size={20} className="text-cyan-400" />
          </div>
          <div className="stat-value">{avgSugar} <span className="stat-unit">mg/dL</span></div>
          <p className="stat-caption text-emerald-400">
            {avgSugar < 105 ? '✓ Normal glycemic range' : '⚠ Elevated glucose'}
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Resting Heart Rate</span>
            <Activity size={20} className="text-violet-400" />
          </div>
          <div className="stat-value">{avgHR} <span className="stat-unit">BPM</span></div>
          <p className="stat-caption text-emerald-400">✓ Healthy athletic resting rate</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Metric Stability</span>
            <TrendingUp size={20} className="text-emerald-400" />
          </div>
          <div className="stat-value">94.8%</div>
          <p className="stat-caption text-emerald-400">Stable compliance correlation</p>
        </div>
      </div>

      {/* Log New Reading Drawer / Card */}
      {showLogForm && (
        <form className="log-vitals-form animate-fade-in" onSubmit={handleAddReading}>
          <div className="form-title-row">
            <h3>Record Today's Biometrics</h3>
            <span className="text-sm text-slate-400">Enter measured clinical values</span>
          </div>

          <div className="vitals-inputs-grid">
            <div className="input-group">
              <label>Systolic (mmHg)</label>
              <input
                type="number"
                min="70"
                max="240"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Diastolic (mmHg)</label>
              <input
                type="number"
                min="40"
                max="140"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Blood Sugar (mg/dL)</label>
              <input
                type="number"
                min="40"
                max="500"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Heart Rate (BPM)</label>
              <input
                type="number"
                min="40"
                max="200"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-actions-row">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => setShowLogForm(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Entry
            </button>
          </div>
        </form>
      )}

      {/* Historical Readings Log Table */}
      <div className="knowledge-base-section">
        <h2 className="section-heading">Historical Log Sheet</h2>
        <div className="interaction-table-wrap">
          <table className="interaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Blood Pressure</th>
                <th>Blood Glucose</th>
                <th>Heart Rate</th>
                <th>Evaluation</th>
              </tr>
            </thead>
            <tbody>
              {vitals.map((v) => {
                const isOptimalBP = v.systolic < 125 && v.diastolic < 82
                return (
                  <tr key={v.id}>
                    <td className="font-medium text-slate-300">
                      <div className="flex-align gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        {v.date}
                      </div>
                    </td>
                    <td className="font-semibold text-slate-100">
                      {v.systolic} / {v.diastolic} mmHg
                    </td>
                    <td className="text-cyan-400 font-semibold">{v.bloodSugar} mg/dL</td>
                    <td className="text-violet-400 font-semibold">{v.heartRate} BPM</td>
                    <td>
                      <span className={`table-badge ${isOptimalBP ? 'badge-safe' : 'badge-moderate'}`}>
                        {isOptimalBP ? 'Controlled' : 'Slight Elevation'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
