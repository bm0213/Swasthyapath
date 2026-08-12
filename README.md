# SwasthyaPath — AI-Powered Emergency Medical Command Center

<div align="center">

![SwasthyaPath](https://img.shields.io/badge/SwasthyaPath-Medical%20Command%20Center-16A579?style=for-the-badge&labelColor=07111F)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white&labelColor=07111F)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white&labelColor=07111F)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white&labelColor=07111F)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=07111F)
![Claude AI](https://img.shields.io/badge/Claude-Anthropic%20AI-D4A853?style=for-the-badge&labelColor=07111F)
![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge&labelColor=07111F)

**A premium AI-powered emergency medical triage system built for India.**  
Describe your symptoms in any language → Get instant AI triage → Find the nearest hospital.

🌐 **Live Demo:** [swasthyapath-orcin.vercel.app](https://swasthyapath-orcin.vercel.app)

</div>

---

## Overview

SwasthyaPath is a full-stack emergency healthcare platform that bridges the gap between patients and emergency medical care — especially in underserved and rural areas. It combines AI-powered symptom triage, real-time GPS hospital matching, live ambulance tracking, video consultations, and a comprehensive offline-capable first aid guide into a single premium interface.

The UI is designed to the standard of Apple Health × Linear — clinical, calm, and immediately usable under stress.

---

## Features

### 🤖 AI Emergency Triage
- Submit symptoms in **any of 6 languages** (English, Hindi, Tamil, Telugu, Bengali, Marathi)
- Claude AI analyzes symptoms and returns a **severity classification**: `Critical` / `Urgent` / `Moderate`
- Provides a clinical summary, recommended specialty departments (e.g. `ICU`, `CARDIOLOGY`, `NEUROLOGY`), and immediate action guidance
- Every triage result is **auto-saved to local history**

### 🗺️ Real-Time Hospital Finder
- Uses the browser's **GPS API** to detect current location
- Fetches and ranks nearby hospitals via OpenStreetMap Overpass API
- Displays results on an **interactive Leaflet map** with custom markers
- Falls back to **cached hospital data** when offline
- Shows distance, specialties, and contact details for each hospital

### 🚑 Live Ambulance Tracking
- Patient and ambulance share **real-time GPS coordinates** via Socket.io
- Both locations are rendered live on the shared map
- Updates are broadcast without page refresh

### 💬 Doctor Chat + Video Consultation
- Real-time text chat between patient and volunteer doctor using **Socket.io rooms**
- **WebRTC video call** with offer/answer/ICE candidate signaling via the server
- Triage result is automatically shared in the chat context

### 🩺 Premium First Aid Guide
- Step-by-step emergency procedures for **10 critical scenarios**:
  `Heart Attack` · `Snake Bite` · `Burns` · `Drowning` · `Choking` · `Fracture` · `Seizure` · `Bleeding` · `Unconscious Person` · `Road Accident`
- Full **search + category filter** system
- Severity badge system (`Life-Threatening` / `Serious` / `Time-Sensitive`)
- Numbered clinical step timeline with action-oriented instructions
- Works **100% offline** — no network required

### 🪪 Digital Medical ID
- Persistent **emergency medical passport** stored in `localStorage`
- Captures: blood type, allergies, chronic conditions, current medications, emergency contacts, organ donor status, insurance info
- **Blood type focal display** for immediate first-responder identification
- **Completeness progress bar** to encourage full profile completion
- QR code payload modal for quick data export
- 2-column responsive form editor

### 📋 Triage History
- Private timeline of all past emergency assessments
- **Search** by symptoms, severity, or summary
- **Filter tabs**: All · Critical · Urgent · Other
- **Smart date grouping**: Today · Yesterday · This Week · date label
- Per-record detail modal with full clinical assessment
- Individual record deletion + two-step **Clear All** confirmation
- All data stored locally — never leaves the device

### ⚙️ Settings & Accessibility
- **6-language switcher**: English, Hindi, Tamil, Telugu, Bengali, Marathi
- **4-tier text size control** (Small → Extra Large) — scales the entire app via CSS zoom
- Granular **notification preferences**: Emergency Alerts, Medicine Reminders, Hospital Updates
- Alert behavior: Sound Alerts + Vibration toggles
- Two-stage **Reset to Defaults** with confirmation
- All preferences persist in `localStorage`

### 🆘 SOS + FAB
- One-tap **SOS button** with location sharing and emergency call
- **Floating Action Button** for quick access to chat and SOS from any page

### 🔐 Admin Dashboard
- Protected admin login (session-based)
- Full platform stats: total triages, severity breakdown, symptom trends, recent activity
- Backend-powered with MongoDB Atlas

### 📴 Offline Mode
- Hospital data cached via `localStorage` after first successful fetch
- First Aid Guide is completely static — fully functional with no internet
- **OfflineBanner** component alerts users when the network drops

### 📱 PWA Ready
- Installable on mobile devices as a Progressive Web App

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tooling |
| Vanilla CSS (custom design system) | Styling — no Tailwind or UI libraries |
| Leaflet + React-Leaflet | Interactive GPS maps |
| Socket.io Client | Real-time chat and live location |
| WebRTC | Peer-to-peer video consultations |
| Canvas API | Realistic ECG waveform animation |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Socket.io | Real-time rooms, chat, and location events |
| Anthropic Claude AI | AI-powered symptom triage engine |
| MongoDB Atlas + Mongoose | Persistent triage history and admin stats |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend API hosting |
| MongoDB Atlas | Cloud database |

---

## Live Demo

| Service | URL |
|---|---|
| 🌐 Frontend | [swasthyapath-orcin.vercel.app](https://swasthyapath-orcin.vercel.app) |
| ⚙️ Backend API | [swasthyapath-backend.onrender.com](https://swasthyapath-backend.onrender.com) |

---

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)
- Anthropic API key

### 1. Clone the repository
```bash
git clone https://github.com/bm0213/Swasthyapath.git
cd Swasthyapath
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:
```env
ANTHROPIC_API_KEY=your_anthropic_api_key
PORT=4000
MONGODB_URI=your_mongodb_atlas_connection_string
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the frontend:
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## Project Structure

```
Swasthyapath/
├── backend/
│   ├── routes/
│   │   ├── triage.js          # AI triage endpoint (Claude API)
│   │   ├── admin.js           # Admin login + stats endpoint
│   │   └── hospitals.js       # Hospital proxy (OpenStreetMap Overpass)
│   ├── db.js                  # MongoDB connection + Mongoose schemas
│   ├── index.js               # Express server + Socket.io setup
│   └── package.json
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Header.jsx          # Premium nav bar with ECG monitor, theme toggle, language selector
        │   ├── LiveECGMonitor.jsx  # Realistic P-QRS-T ECG waveform animation (Canvas)
        │   ├── EmergencyBar.jsx    # National emergency numbers top bar
        │   ├── SymptomInput.jsx    # Symptom textarea with voice input
        │   ├── TriageResult.jsx    # AI triage result card
        │   ├── HospitalMap.jsx     # Leaflet map + live ambulance/patient pins
        │   ├── HospitalList.jsx    # Ranked hospital results list
        │   ├── HospitalCard.jsx    # Individual hospital card with actions
        │   ├── UserHistory.jsx     # Private triage history timeline
        │   ├── DoctorChat.jsx      # Real-time chat + WebRTC video call
        │   ├── VideoCall.jsx       # WebRTC video component
        │   ├── SOSButton.jsx       # Emergency SOS overlay
        │   ├── FAB.jsx             # Floating action button
        │   ├── AmbulanceButton.jsx # Ambulance live tracking button
        │   ├── AdminLogin.jsx      # Protected admin login
        │   ├── LoadingSpinner.jsx  # Loading state component
        │   └── OfflineBanner.jsx   # Offline status banner
        ├── pages/
        │   ├── LandingPage.jsx     # Hero landing page
        │   ├── FirstAid.jsx        # Offline-capable first aid guide (10 procedures)
        │   ├── MedicalID.jsx       # Digital emergency medical passport
        │   ├── Settings.jsx        # Accessibility + notification preferences
        │   └── AdminDashboard.jsx  # Admin stats dashboard (protected)
        ├── utils/
        │   ├── triage.js           # Claude AI API integration
        │   ├── socket.js           # Socket.io client singleton
        │   ├── location.js         # GPS + reverse geocoding utilities
        │   ├── fetchHospitals.js   # Hospital fetch via backend proxy
        │   ├── matchHospitals.js   # Match hospitals to required specialties
        │   ├── serviceWorker.js    # Online status + hospital cache helpers
        │   └── strings.js          # Multi-language string translations
        ├── data/                   # Static first aid procedure data
        ├── App.jsx                 # Root component — routing, state, triage orchestration
        ├── index.css               # Full design system (4000+ lines, custom CSS only)
        └── main.jsx                # React entry point
```

---

## API Reference

### REST Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/triage` | Submit symptoms for AI triage analysis |
| `POST` | `/api/admin/login` | Admin authentication |
| `GET` | `/api/admin/stats` | Platform-wide triage statistics |
| `GET` | `/api/hospitals/nearby` | Fetch nearby hospitals from OpenStreetMap |

### Triage Request
```json
{
  "symptoms": "Severe chest pain and difficulty breathing for 20 minutes",
  "location": { "lat": 13.0827, "lng": 80.2707 }
}
```

### Triage Response
```json
{
  "severity": "critical",
  "severityLabel": "Critical Emergency",
  "summary": "Symptoms are consistent with an acute cardiac event requiring immediate emergency care.",
  "facilities": ["ICU", "CARDIOLOGY", "EMERGENCY"],
  "doNow": "Keep the patient calm and seated upright. Do not give food or water. Call 112 immediately."
}
```

---

## Socket.io Events

| Event | Direction | Description |
|---|---|---|
| `join_room` | Client → Server | Join a patient-doctor room |
| `send_message` | Client → Server | Send a chat message |
| `receive_message` | Server → Client | Receive a chat message |
| `ambulance_location` | Client → Server | Share ambulance GPS coordinates |
| `patient_location` | Client → Server | Share patient GPS coordinates |
| `location_update` | Server → Client | Broadcast location to room |
| `call_request` | Client → Server | Initiate a video call |
| `call_accepted` | Client → Server | Accept an incoming video call |
| `call_declined` | Client → Server | Decline a video call |
| `call_ended` | Client → Server | End an active video call |
| `webrtc_offer` | Client → Server | WebRTC SDP offer |
| `webrtc_answer` | Client → Server | WebRTC SDP answer |
| `webrtc_ice` | Client → Server | WebRTC ICE candidate |

---

## localStorage Keys

| Key | Purpose |
|---|---|
| `swasthya-triage-history` | Array of past triage assessment records |
| `swasthya-fontsize` | Text size preference (`small` / `medium` / `large` / `xlarge`) |
| `swasthya-notifications` | Notification preference object |
| `swasthya-lang` | Selected language code (`en`, `hi`, `ta`, `te`, `bn`, `mr`) |
| `swasthya-medicalid` | User's Digital Medical ID data |
| `swasthya-hospitals-cache` | Cached nearby hospital results (for offline use) |

---

## Design System

SwasthyaPath uses a fully custom CSS design system — no Tailwind, no component library. All styling is written in `index.css` (~85KB) with CSS custom properties.

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--teal` | `#16A579` | Primary emerald — CTAs, active states, success |
| `--alert` | `#E11D48` | Emergency red — critical severity, errors |
| `--amber` | `#F59E0B` | Warning amber — urgent severity |
| `--bg` | `#07111F` | Dark mode background |
| `--bg-card` | `#122238` | Dark mode card surface |
| `--bg-secondary` | `#0D1A2B` | Dark mode secondary surface |
| `--text-primary` | `#F8FAFC` | Primary text (dark mode) |
| `--text-secondary` | `#94A3B8` | Secondary text |

### Theme
Supports **Dark Mode** (default) and **Light Mode** toggled via `data-theme="light"` on `<html>`.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**bm0213** — [GitHub](https://github.com/bm0213)

---

<div align="center">
  Built with care for India's emergency healthcare infrastructure.
</div>