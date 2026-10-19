import type { Medication, DrugInteraction, VitalLog } from '../types/medication'

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'Metformin HCl',
    genericName: 'Glucophage',
    dosage: '500 mg',
    frequency: 'Twice daily',
    timeSlots: ['08:00', '20:00'],
    category: 'Diabetes',
    instructions: 'Take with food to minimize GI discomfort.',
    pillsRemaining: 18,
    totalPills: 60,
    color: '#06b6d4', // cyan
    shape: 'oval',
    takenToday: {
      '08:00': true,
      '20:00': false,
    },
  },
  {
    id: 'med-2',
    name: 'Atorvastatin Calcium',
    genericName: 'Lipitor',
    dosage: '20 mg',
    frequency: 'Once daily at bedtime',
    timeSlots: ['21:30'],
    category: 'Cardiovascular',
    instructions: 'Avoid grapefruit and grapefruit juice.',
    pillsRemaining: 5,
    totalPills: 30,
    color: '#6366f1', // indigo
    shape: 'round',
    takenToday: {
      '21:30': false,
    },
  },
  {
    id: 'med-3',
    name: 'Lisinopril',
    genericName: 'Zestril',
    dosage: '10 mg',
    frequency: 'Once daily in morning',
    timeSlots: ['08:00'],
    category: 'Cardiovascular',
    instructions: 'Take consistently at the same time each morning.',
    pillsRemaining: 24,
    totalPills: 30,
    color: '#3b82f6', // blue
    shape: 'round',
    takenToday: {
      '08:00': true,
    },
  },
  {
    id: 'med-4',
    name: 'Vitamin D3 (Cholecalciferol)',
    genericName: 'Cholecalciferol',
    dosage: '2000 IU',
    frequency: 'Once daily with breakfast',
    timeSlots: ['09:00'],
    category: 'Vitamins & Supplements',
    instructions: 'Fat-soluble; take with meal containing healthy fats.',
    pillsRemaining: 45,
    totalPills: 60,
    color: '#f59e0b', // amber
    shape: 'capsule',
    takenToday: {
      '09:00': true,
    },
  },
  {
    id: 'med-5',
    name: 'Omega-3 Fish Oil',
    genericName: 'EPA/DHA',
    dosage: '1000 mg',
    frequency: 'Once daily',
    timeSlots: ['13:00'],
    category: 'Vitamins & Supplements',
    instructions: 'Take with lunch or dinner.',
    pillsRemaining: 28,
    totalPills: 60,
    color: '#10b981', // emerald
    shape: 'capsule',
    takenToday: {
      '13:00': false,
    },
  },
]

export const DRUG_INTERACTIONS: DrugInteraction[] = [
  {
    drugA: 'Lisinopril',
    drugB: 'Potassium Supplements',
    severity: 'high',
    description: 'ACE inhibitors like Lisinopril decrease potassium excretion, significantly increasing hyperkalemia risk.',
    recommendation: 'Monitor serum potassium levels closely. Do not combine without physician oversight.',
  },
  {
    drugA: 'Atorvastatin',
    drugB: 'Clarithromycin',
    severity: 'high',
    description: 'Strong CYP3A4 inhibitors increase statin serum concentrations, raising rhabdomyolysis risk.',
    recommendation: 'Consider temporary suspension of statin or alternative antibiotic therapy.',
  },
  {
    drugA: 'Metformin',
    drugB: 'Alcohol',
    severity: 'moderate',
    description: 'Excessive alcohol intake combined with Metformin potentiates the risk of lactic acidosis and hypoglycemia.',
    recommendation: 'Avoid binge drinking and excessive alcohol intake while taking Metformin.',
  },
  {
    drugA: 'Aspirin',
    drugB: 'Ibuprofen',
    severity: 'moderate',
    description: 'Ibuprofen can antagonize the irreversible platelet inhibition induced by low-dose cardio-protective Aspirin.',
    recommendation: 'Take Aspirin at least 30 minutes before or 8 hours after immediate-release Ibuprofen.',
  },
  {
    drugA: 'Warfarin',
    drugB: 'Aspirin',
    severity: 'high',
    description: 'Concurrent anticoagulant and antiplatelet therapy substantially elevates severe bleeding hazards.',
    recommendation: 'Requires rigorous INR tracking and deliberate specialist authorization.',
  },
  {
    drugA: 'Atorvastatin',
    drugB: 'Grapefruit',
    severity: 'moderate',
    description: 'Compounds in grapefruit inhibit intestinal CYP3A4 enzymes, causing higher statin plasma levels.',
    recommendation: 'Avoid consuming grapefruit or grapefruit juice within 4 hours of dosage.',
  },
]

export const INITIAL_VITALS: VitalLog[] = [
  { id: 'v-1', date: 'Oct 19', systolic: 122, diastolic: 78, bloodSugar: 104, heartRate: 72 },
  { id: 'v-2', date: 'Oct 18', systolic: 126, diastolic: 82, bloodSugar: 110, heartRate: 75 },
  { id: 'v-3', date: 'Oct 17', systolic: 119, diastolic: 76, bloodSugar: 98, heartRate: 69 },
  { id: 'v-4', date: 'Oct 16', systolic: 124, diastolic: 80, bloodSugar: 108, heartRate: 74 },
  { id: 'v-5', date: 'Oct 15', systolic: 128, diastolic: 84, bloodSugar: 115, heartRate: 76 },
]
