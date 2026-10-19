export type DoseStatus = 'pending' | 'taken' | 'skipped'

export type MedicationCategory = 
  | 'Cardiovascular'
  | 'Diabetes'
  | 'Antibiotic'
  | 'Analgesic'
  | 'Vitamins & Supplements'
  | 'Respiratory'
  | 'Mental Health'

export interface Medication {
  id: string
  name: string
  genericName?: string
  dosage: string
  frequency: string
  timeSlots: string[] // e.g. ["08:00", "20:00"]
  category: MedicationCategory
  instructions: string
  pillsRemaining: number
  totalPills: number
  color: string
  shape: 'round' | 'capsule' | 'oval'
  takenToday: { [time: string]: boolean }
}

export interface DrugInteraction {
  drugA: string
  drugB: string
  severity: 'high' | 'moderate' | 'low'
  description: string
  recommendation: string
}

export interface VitalLog {
  id: string
  date: string
  systolic: number
  diastolic: number
  bloodSugar: number
  heartRate: number
}
