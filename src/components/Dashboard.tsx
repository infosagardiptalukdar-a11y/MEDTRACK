import type { FC } from 'react'
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Flame, 
  Pill, 
  Calendar, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react'
import type { Medication } from '../types/medication'

interface DashboardProps {
  medications: Medication[]
  onToggleTaken: (medId: string, timeSlot: string) => void
  onQuickRefill: (medId: string) => void
  onNavigateToMedications: () => void
  onNavigateToSafety: () => void
}

const TODAY_DATE = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

export const Dashboard: FC<DashboardProps> = ({
  medications,
  onToggleTaken,
  onQuickRefill,
  onNavigateToMedications,
  onNavigateToSafety,
}) => {
  // Compute adherence stats
  let totalDoses = 0
  let dosesTaken = 0

  medications.forEach((med) => {
    med.timeSlots.forEach((slot) => {
      totalDoses++
      if (med.takenToday[slot]) {
        dosesTaken++
      }
    })
  })

  const adherencePercent = totalDoses > 0 ? Math.round((dosesTaken / totalDoses) * 100) : 0
  const lowStockMeds = medications.filter((m) => m.pillsRemaining <= 7)

  // Find next pending dose
  interface PendingDose {
    med: Medication
    timeSlot: string
  }

  const pendingDoses: PendingDose[] = []
  medications.forEach((med) => {
    med.timeSlots.forEach((slot) => {
      if (!med.takenToday[slot]) {
        pendingDoses.push({ med, timeSlot: slot })
      }
    })
  })

  // Sort by timeSlot string
  pendingDoses.sort((a, b) => a.timeSlot.localeCompare(b.timeSlot))
  const nextDose = pendingDoses[0] || null

  const categorizeTime = (time: string): 'Morning' | 'Afternoon' | 'Evening' => {
    const hour = parseInt(time.split(':')[0], 10)
    if (hour < 12) return 'Morning'
    if (hour < 18) return 'Afternoon'
    return 'Evening'
  }

  const timeBuckets: { [key in 'Morning' | 'Afternoon' | 'Evening']: { med: Medication; slot: string }[] } = {
    Morning: [],
    Afternoon: [],
    Evening: [],
  }

  medications.forEach((med) => {
    med.timeSlots.forEach((slot) => {
      const bucket = categorizeTime(slot)
      timeBuckets[bucket].push({ med, slot })
    })
  })

  // Sort each bucket by time
  Object.keys(timeBuckets).forEach((key) => {
    const b = key as 'Morning' | 'Afternoon' | 'Evening'
    timeBuckets[b].sort((a, b) => a.slot.localeCompare(b.slot))
  })

  return (
    <div className="dashboard-view animate-fade-in">
      {/* Top Welcome Header */}
      <div className="dashboard-header">
        <div>
          <div className="greeting-pill">
            <Calendar size={14} />
            <span>Today, {TODAY_DATE}</span>
          </div>
          <h1 className="dashboard-title">Daily Medication Schedule</h1>
          <p className="dashboard-subtitle">
            Track your prescription adherence, monitor safety contraindications, and maintain optimal therapy.
          </p>
        </div>

        <div className="header-status-badge">
          <Sparkles size={16} className="text-emerald-400" />
          <span>Patient Status: <strong>Regimen Active</strong></span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Today's Adherence</span>
            <span className="stat-badge adherence">{adherencePercent}%</span>
          </div>
          <div className="stat-value">{dosesTaken} / {totalDoses} Doses</div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${adherencePercent}%` }}
            />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Adherence Streak</span>
            <Flame size={20} className="text-amber-500 animate-pulse" />
          </div>
          <div className="stat-value">14 Days</div>
          <p className="stat-caption text-emerald-500 font-medium">🔥 Consistent medication habit</p>
        </div>

        <div className="stat-card cursor-pointer" onClick={onNavigateToMedications}>
          <div className="stat-header">
            <span className="stat-label">Active Prescriptions</span>
            <Pill size={20} className="text-cyan-500" />
          </div>
          <div className="stat-value">{medications.length} Regimens</div>
          <p className="stat-caption text-slate-400 flex-align">
            Manage dosages <ChevronRight size={14} />
          </p>
        </div>

        <div 
          className={`stat-card ${lowStockMeds.length > 0 ? 'border-amber' : ''}`}
          onClick={onNavigateToMedications}
        >
          <div className="stat-header">
            <span className="stat-label">Refill Alerts</span>
            <AlertTriangle size={20} className={lowStockMeds.length > 0 ? 'text-amber-500' : 'text-slate-400'} />
          </div>
          <div className="stat-value">
            {lowStockMeds.length > 0 ? `${lowStockMeds.length} Low Stock` : 'All Stocked'}
          </div>
          <p className="stat-caption text-amber-500">
            {lowStockMeds.length > 0 ? 'Reorder needed soon' : 'Plenty of inventory'}
          </p>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockMeds.length > 0 && (
        <div className="refill-warning-banner">
          <div className="banner-icon-col">
            <AlertTriangle size={24} className="text-amber-400" />
          </div>
          <div className="banner-content">
            <h4>Pill Refill Recommended</h4>
            <p>
              <strong>{lowStockMeds.map((m) => m.name).join(', ')}</strong> has {lowStockMeds[0].pillsRemaining} doses remaining. Restock now to prevent missed regimens.
            </p>
          </div>
          <button 
            className="btn-refill-action"
            onClick={() => onQuickRefill(lowStockMeds[0].id)}
          >
            <RotateCcw size={16} />
            Refill (+30 Pills)
          </button>
        </div>
      )}

      {/* Next Dose Hero Spotlight */}
      {nextDose && (
        <div className="next-dose-spotlight">
          <div className="spotlight-left">
            <div className="spotlight-time-tag">
              <Clock size={16} />
              <span>Next Scheduled Dose: {nextDose.timeSlot}</span>
            </div>
            <h3 className="spotlight-drug-name">{nextDose.med.name}</h3>
            <p className="spotlight-drug-meta">
              Dosage: <strong>{nextDose.med.dosage}</strong> • Category: {nextDose.med.category}
            </p>
            <p className="spotlight-instruction">
              💡 <em>{nextDose.med.instructions}</em>
            </p>
          </div>
          <div className="spotlight-right">
            <button
              className="btn-take-now"
              onClick={() => onToggleTaken(nextDose.med.id, nextDose.timeSlot)}
            >
              <CheckCircle2 size={20} />
              Mark as Taken
            </button>
          </div>
        </div>
      )}

      {/* Medication Timeline Buckets */}
      <div className="timeline-container">
        <h2 className="section-heading">Timeline by Time of Day</h2>

        {(['Morning', 'Afternoon', 'Evening'] as const).map((bucketName) => {
          const items = timeBuckets[bucketName]
          if (items.length === 0) return null

          return (
            <div key={bucketName} className="time-bucket-card">
              <div className="bucket-header">
                <div className="bucket-title-wrap">
                  <div className="bucket-dot" />
                  <h3>{bucketName}</h3>
                </div>
                <span className="bucket-count">{items.length} {items.length === 1 ? 'dose' : 'doses'}</span>
              </div>

              <div className="bucket-items-list">
                {items.map(({ med, slot }) => {
                  const isTaken = !!med.takenToday[slot]
                  return (
                    <div 
                      key={`${med.id}-${slot}`} 
                      className={`dose-card ${isTaken ? 'dose-taken' : ''}`}
                    >
                      <button
                        className="dose-check-btn"
                        onClick={() => onToggleTaken(med.id, slot)}
                        aria-label={`Mark ${med.name} as ${isTaken ? 'pending' : 'taken'}`}
                      >
                        {isTaken ? (
                          <CheckCircle2 size={26} className="text-emerald-500 fill-emerald-500/20" />
                        ) : (
                          <Circle size={26} className="text-slate-400 hover:text-cyan-500 transition-colors" />
                        )}
                      </button>

                      <div className="dose-info">
                        <div className="dose-top-row">
                          <span className="dose-name">{med.name}</span>
                          <span className="dose-time-pill">{slot}</span>
                        </div>
                        <div className="dose-sub-row">
                          <span className="dose-pill-badge">{med.dosage}</span>
                          <span className="dose-category-tag">{med.category}</span>
                          {med.genericName && (
                            <span className="dose-generic">({med.genericName})</span>
                          )}
                        </div>
                        <p className="dose-instructions">{med.instructions}</p>
                      </div>

                      <div className="dose-status-col">
                        <span className={`status-pill ${isTaken ? 'taken' : 'pending'}`}>
                          {isTaken ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Safety Promotion Card */}
      <div className="safety-promo-card">
        <div className="promo-icon">
          <ShieldCheck size={32} className="text-cyan-400" />
        </div>
        <div className="promo-text">
          <h4>Clinical Drug Interaction Checker</h4>
          <p>
            Verify multi-drug interactions, contraindications, and food/lifestyle precautions for your active prescriptions.
          </p>
        </div>
        <button className="btn-secondary-link" onClick={onNavigateToSafety}>
          Check Safety Risks <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
