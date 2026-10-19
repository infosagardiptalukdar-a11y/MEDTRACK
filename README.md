<div align="center">

# 💊 MEDTRACK

### Clinical Medication Tracker & Drug Safety Intelligence Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/medtrackv01/deploy-status)](https://medtrackv01.netlify.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22d3ee.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vite.dev)

**🌐 Live Demo → [medtrackv01.netlify.app](https://medtrackv01.netlify.app/)**

A modern, full-featured medication adherence and clinical safety platform built for healthcare professionals, pharmacy students, and patients who need to track prescriptions, verify drug interactions, and monitor biometric health data — all from a single dashboard.

</div>

---

## ✨ Key Features

### 📋 Daily Medication Dashboard
- **Smart scheduling** with Morning / Afternoon / Evening time buckets
- **One-tap dose tracking** — mark medications as taken or pending
- **Adherence KPIs** — daily compliance percentage, streak counter, and active regimen count
- **Next dose spotlight** — highlights the upcoming scheduled medication with clinical guidance
- **Low-stock refill alerts** — automatic warnings when pill inventory drops below 7 doses

### 💊 Prescription Locker
- **Full medication registry** with brand name, generic name, dosage, frequency, and administration notes
- **Category-based filtering** — Cardiovascular, Diabetes, Vitamins & Supplements, Antibiotics, and more
- **Real-time search** across drug names, generics, and instructions
- **Pill inventory tracking** with visual progress bars and quick refill (+30 pills) actions
- **Add / Remove prescriptions** through an intuitive modal form with color-coded pill themes

### 🛡️ Drug Interaction & Safety Center
- **Multi-agent interaction calculator** — enter any two drugs/substances and check for contraindications
- **Auto-scan active regimen** — cross-checks all current medications for known interactions
- **Severity-graded results** — High / Moderate / Low risk classifications with clinical mechanisms
- **Professional recommendations** — actionable guidance for each detected interaction
- **Reference database table** — curated high-alert clinical interaction index (e.g., Lisinopril + Potassium, Warfarin + Aspirin, Statins + Grapefruit)

### 📊 Biometric Vitals & Health Metrics
- **Log daily readings** — systolic/diastolic blood pressure, fasting blood glucose, resting heart rate
- **Running averages** with normotensive/glycemic target evaluation
- **Historical log table** with date-stamped entries and clinical evaluation badges
- **Metric stability score** correlating medication compliance with physiological outcomes

### 🎨 Premium Design & UX
- **Dark / Light mode** with smooth theme transitions
- **Glassmorphism UI** with backdrop blur, gradient accents, and subtle box shadows
- **Micro-animations** — fade-ins, scale-ups, and hover state transitions
- **Fully responsive** — optimized layouts for desktop, tablet, and mobile
- **Plus Jakarta Sans** typography for a clean, modern clinical aesthetic

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:-----------|
| **Frontend** | React 19, TypeScript 7 |
| **Build Tool** | Vite 8.3 |
| **Icons** | Lucide React |
| **Styling** | Vanilla CSS with CSS Custom Properties (dark/light tokens) |
| **Linting** | OxLint |
| **Persistence** | localStorage (medications, vitals, theme) |
| **Deployment** | Netlify (auto-deploy from `main` branch) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (included with Node.js)

### Installation

```bash
git clone https://github.com/infosagardiptalukdar-a11y/MEDTRACK.git
cd MEDTRACK
npm install
```

### Development

Start the local development server with hot module replacement:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Generate an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run the OxLint code quality checker:

```bash
npm run lint
```

---

## 📁 Project Structure

```
MEDTRACK/
├── public/
│   ├── favicon.svg          # Custom MedTrack favicon
│   ├── icons.svg            # SVG sprite sheet
│   └── _redirects           # Netlify SPA routing
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation bar with tabs & theme toggle
│   │   ├── Dashboard.tsx         # Daily schedule & adherence KPIs
│   │   ├── MedicationList.tsx    # Prescription locker with search & filters
│   │   ├── InteractionChecker.tsx # Drug interaction safety analyzer
│   │   ├── VitalsTracker.tsx     # Biometric vitals logger & history
│   │   └── AddMedicationModal.tsx # New prescription form modal
│   ├── data/
│   │   └── initialMedications.ts # Sample pharmaceutical dataset
│   ├── types/
│   │   └── medication.ts         # TypeScript type definitions
│   ├── App.tsx                   # Root component with state management
│   ├── index.css                 # Complete design system (dark/light)
│   └── main.tsx                  # Application entry point
├── netlify.toml                  # Netlify build & redirect config
├── index.html                    # HTML entry with SEO meta tags
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite build configuration
```

---

## 🌐 Deployment

This project is deployed on **Netlify** with continuous deployment from the `main` branch.

| Setting | Value |
|:--------|:------|
| **Live URL** | [medtrackv01.netlify.app](https://medtrackv01.netlify.app/) |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Node version** | 20 (LTS) |

Every `git push` to `main` triggers an automatic rebuild and deployment.

---

## 🔮 Roadmap

- [ ] Push notification reminders for upcoming doses
- [ ] Backend API with user authentication (Supabase / Firebase)
- [ ] PDF export for medication schedules and vitals reports
- [ ] Barcode/QR scanning for quick medication entry
- [ ] Multi-language support (i18n)
- [ ] PWA offline support with service workers

---

## 👤 Author

**Sagardip Talukdar**
B.Pharm Student | Pharmaceutical Sciences & Healthcare Technology

- GitHub: [@infosagardiptalukdar-a11y](https://github.com/infosagardiptalukdar-a11y)
- LinkedIn: [Sagardip Talukdar](https://www.linkedin.com/in/sagardip-talukdar-9a32aa336)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ at the intersection of Pharmacy × Technology × AI**

</div>
