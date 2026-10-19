import { useState, type FC } from 'react'
import { 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  ArrowRightLeft, 
  Sparkles, 
  BookOpen
} from 'lucide-react'
import type { Medication, DrugInteraction } from '../types/medication'
import { DRUG_INTERACTIONS } from '../data/initialMedications'

interface InteractionCheckerProps {
  medications: Medication[]
}

export const InteractionChecker: FC<InteractionCheckerProps> = ({ medications }) => {
  const [drugA, setDrugA] = useState<string>(medications[0]?.name.split(' ')[0] || 'Lisinopril')
  const [drugB, setDrugB] = useState<string>('Potassium Supplements')
  const [customResult, setCustomResult] = useState<DrugInteraction | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  // Find known interactions among current user prescriptions
  const activePrescriptionInteractions: DrugInteraction[] = []

  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const name1 = medications[i].name.toLowerCase()
      const name2 = medications[j].name.toLowerCase()

      DRUG_INTERACTIONS.forEach((interaction) => {
        const intA = interaction.drugA.toLowerCase()
        const intB = interaction.drugB.toLowerCase()

        if (
          (name1.includes(intA) && name2.includes(intB)) ||
          (name1.includes(intB) && name2.includes(intA))
        ) {
          activePrescriptionInteractions.push(interaction)
        }
      })
    }
  }

  const handleCheck = () => {
    setHasSearched(true)
    const normA = drugA.trim().toLowerCase()
    const normB = drugB.trim().toLowerCase()

    const match = DRUG_INTERACTIONS.find((item) => {
      const a = item.drugA.toLowerCase()
      const b = item.drugB.toLowerCase()
      return (
        (normA.includes(a) && normB.includes(b)) ||
        (normA.includes(b) && normB.includes(a))
      )
    })

    setCustomResult(match || null)
  }

  const sampleDrugList = [
    'Metformin',
    'Atorvastatin',
    'Lisinopril',
    'Aspirin',
    'Ibuprofen',
    'Warfarin',
    'Clarithromycin',
    'Potassium Supplements',
    'Alcohol',
    'Grapefruit',
  ]

  return (
    <div className="interactions-view animate-fade-in">
      {/* Header */}
      <div className="section-header-row">
        <div>
          <div className="greeting-pill">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Pharmacology Intelligence Engine</span>
          </div>
          <h1 className="dashboard-title">Drug Interaction & Safety Center</h1>
          <p className="dashboard-subtitle">
            Evaluate pharmacodynamic and pharmacokinetic contraindications between medications, supplements, and dietary substances.
          </p>
        </div>
      </div>

      {/* Regimen Auto-Scan Banner */}
      <div className={`regimen-scan-card ${activePrescriptionInteractions.length > 0 ? 'scan-warning' : 'scan-safe'}`}>
        <div className="scan-icon-col">
          {activePrescriptionInteractions.length > 0 ? (
            <AlertTriangle size={28} className="text-amber-400" />
          ) : (
            <ShieldCheck size={28} className="text-emerald-400" />
          )}
        </div>
        <div className="scan-content">
          <h3>
            {activePrescriptionInteractions.length > 0
              ? `${activePrescriptionInteractions.length} Potential Interaction Detected in Your Regimen`
              : 'Active Regimen Verified: No Known High-Risk Collisions'}
          </h3>
          <p>
            {activePrescriptionInteractions.length > 0
              ? 'One or more of your active medications may interact under specific dosages or concurrent administration.'
              : `Your current ${medications.length} medications have been cross-checked against standard clinical pharmacology databases with no major contraindications.`}
          </p>
        </div>
      </div>

      {/* Interactive Interaction Analyzer Card */}
      <div className="analyzer-card">
        <div className="analyzer-header">
          <Sparkles size={18} className="text-cyan-400" />
          <h2>Multi-Agent Interaction Calculator</h2>
        </div>

        <div className="analyzer-inputs-grid">
          <div className="analyzer-input-col">
            <label className="input-label">Primary Agent / Substance</label>
            <input
              type="text"
              className="analyzer-text-input"
              value={drugA}
              onChange={(e) => setDrugA(e.target.value)}
              placeholder="e.g. Lisinopril, Metformin..."
            />
            <div className="quick-tags">
              {sampleDrugList.slice(0, 5).map((d) => (
                <button key={d} className="quick-tag-btn" onClick={() => setDrugA(d)}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="analyzer-divider">
            <div className="icon-circle">
              <ArrowRightLeft size={16} />
            </div>
          </div>

          <div className="analyzer-input-col">
            <label className="input-label">Secondary Agent / Substance / Food</label>
            <input
              type="text"
              className="analyzer-text-input"
              value={drugB}
              onChange={(e) => setDrugB(e.target.value)}
              placeholder="e.g. Potassium Supplements, Alcohol..."
            />
            <div className="quick-tags">
              {sampleDrugList.slice(5).map((d) => (
                <button key={d} className="quick-tag-btn" onClick={() => setDrugB(d)}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="analyzer-action-row">
          <button className="btn-analyze" onClick={handleCheck}>
            <Search size={18} />
            Analyze Safety Profile
          </button>
        </div>

        {/* Search Results Display */}
        {hasSearched && (
          <div className="analyzer-result-box animate-fade-in">
            {customResult ? (
              <div className={`result-card severity-${customResult.severity}`}>
                <div className="result-top">
                  <div className="severity-badge-pill">
                    {customResult.severity.toUpperCase()} RISK CONTRAINDICATION
                  </div>
                  <span className="result-pair">
                    {customResult.drugA} ⟷ {customResult.drugB}
                  </span>
                </div>

                <div className="result-body">
                  <h4 className="result-heading">Clinical Mechanism & Pharmacology</h4>
                  <p className="result-desc">{customResult.description}</p>

                  <h4 className="result-heading">Professional Recommendation</h4>
                  <p className="result-recommendation">📋 {customResult.recommendation}</p>
                </div>
              </div>
            ) : (
              <div className="result-card severity-safe">
                <div className="result-top">
                  <div className="severity-badge-pill safe">NO CRITICAL INTERACTION DETECTED</div>
                  <span className="result-pair">{drugA} ⟷ {drugB}</span>
                </div>
                <p className="result-desc">
                  No high-risk contraindications were identified in the standard index for this pair. Always consult your prescribing physician or pharmacist before modifying therapies.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reference Educational Database Table */}
      <div className="knowledge-base-section">
        <div className="section-title-wrap">
          <BookOpen size={18} className="text-cyan-400" />
          <h2 className="section-heading mb-0">High-Alert Clinical Interaction Index</h2>
        </div>

        <div className="interaction-table-wrap">
          <table className="interaction-table">
            <thead>
              <tr>
                <th>Drug Pair</th>
                <th>Severity</th>
                <th>Mechanism</th>
                <th>Clinical Action</th>
              </tr>
            </thead>
            <tbody>
              {DRUG_INTERACTIONS.map((item, idx) => (
                <tr key={idx}>
                  <td className="font-semibold text-slate-200">
                    {item.drugA} + {item.drugB}
                  </td>
                  <td>
                    <span className={`table-badge badge-${item.severity}`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="text-sm text-slate-300">{item.description}</td>
                  <td className="text-sm text-emerald-400 font-medium">{item.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
