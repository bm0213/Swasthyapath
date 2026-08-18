<div align="center">

<br/>

<!-- Logo / Banner -->
<img src="https://img.shields.io/badge/%E2%9D%A4%EF%B8%8F-Built%20for%20India's%20Emergency%20Healthcare-16A579?style=for-the-badge&labelColor=07111F&color=16A579" alt="Built for India"/>

<br/><br/>

# SwasthyaPath
### AI-Powered Emergency Medical Command Center

<p align="center">
  <em>Describe your symptoms → Get instant AI triage → Find the nearest hospital — in any language.</em>
</p>

<br/>

<!-- Badges Row 1 -->
<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white&labelColor=07111F" alt="React 18"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=07111F" alt="Vite"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white&labelColor=07111F" alt="Node.js"/>
  &nbsp;
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white&labelColor=07111F" alt="MongoDB Atlas"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Anthropic-Claude%20AI-D4A853?style=flat-square&labelColor=07111F" alt="Claude AI"/>
</p>

<!-- Badges Row 2 -->
<p align="center">
  <img src="https://img.shields.io/badge/Socket.io-Real--Time-010101?style=flat-square&logo=socket.io&logoColor=white&labelColor=07111F" alt="Socket.io"/>
  &nbsp;
  <img src="https://img.shields.io/badge/WebRTC-Video%20Call-333333?style=flat-square&labelColor=07111F" alt="WebRTC"/>
  &nbsp;
  <img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white&labelColor=07111F" alt="PWA"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Offline-Capable-16A579?style=flat-square&labelColor=07111F" alt="Offline Capable"/>
  &nbsp;
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square&labelColor=07111F" alt="MIT License"/>
</p>

<br/>

<!-- CTA Links -->
<p align="center">
  <a href="https://swasthyapath-orcin.vercel.app">
    <img src="https://img.shields.io/badge/🌐%20Live%20Demo-swasthyapath--orcin.vercel.app-16A579?style=for-the-badge&labelColor=07111F" alt="Live Demo"/>
  </a>
  &nbsp;&nbsp;
  <a href="https://swasthyapath-backend.onrender.com">
    <img src="https://img.shields.io/badge/⚙️%20Backend%20API-Render-46E3B7?style=for-the-badge&labelColor=07111F" alt="Backend API"/>
  </a>
</p>

</div>

---

## What is SwasthyaPath?

**SwasthyaPath** is a full-stack, AI-powered emergency healthcare platform designed to bridge the critical gap between patients and medical care — especially in underserved and rural areas of India.

In an emergency, every second matters. SwasthyaPath gives patients, first responders, and medical professionals a single, premium command center for:

- 🧠 **Instant AI symptom triage** — powered by Claude AI
- 🗺️ **Real-time GPS hospital matching** — ranked by distance and specialty
- 🚑 **Live ambulance tracking** — shared GPS via WebSockets
- 💬 **Doctor chat and video consultation** — WebRTC peer-to-peer
- 🩺 **Offline-first first aid guide** — works with zero internet
- 🪪 **Digital Medical ID** — your emergency medical passport
- 🔐 **Admin Command Center** — full platform analytics

The UI is designed to the standard of **Apple Health × Linear** — clinical, calm, and immediately usable under stress.

---

## ✦ Features

<details>
<summary><strong>🤖 AI Emergency Triage</strong></summary>

<br/>

- Submit symptoms in **any of 6 languages**: English, Hindi, Tamil, Telugu, Bengali, Marathi
- Claude AI analyzes symptoms and returns a severity classification:
  - 🔴 `Critical` — Immediate life-threatening emergency
  - 🟠 `Urgent` — Serious, requires prompt attention
  - 🟡 `Moderate` — Non-immediate, monitor carefully
- Returns a clinical summary, recommended specialty departments (`ICU`, `CARDIOLOGY`, `NEUROLOGY`, etc.), and immediate action guidance
- Every triage result is **auto-saved to local history** — no account required

</details>

<details>
<summary><strong>🗺️ Real-Time Hospital Finder</strong></summary>

<br/>

- Uses the browser's **GPS API** to detect current location
- Fetches and ranks nearby hospitals via **OpenStreetMap Overpass API**
- Displays results on an **interactive Leaflet map** with custom markers
- Matches hospitals to the AI-recommended specialties (e.g. filters for ICU-capable hospitals during a cardiac event)
- Falls back to **cached hospital data** when offline
- Displays distance, specialties, and contact information per hospital

</details>

<details>
<summary><strong>🚑 Live Ambulance Tracking</strong></summary>

<br/>

- Patient and ambulance share **real-time GPS coordinates** via Socket.io
- Both locations rendered live on a shared map
- Location updates broadcast without page refresh

</details>

<details>
<summary><strong>💬 Doctor Chat + Video Consultation</strong></summary>

<br/>

- Real-time text chat between patient and volunteer doctor using **Socket.io rooms**
- **WebRTC video call** with offer/answer/ICE candidate signaling
- Triage result is automatically shared in the chat context

</details>

<details>
<summary><strong>🩺 Offline-First Aid Guide</strong></summary>

<br/>

Step-by-step emergency procedures for **10 critical scenarios**:

| Scenario | Severity |
|---|---|
| Heart Attack | 🔴 Life-Threatening |
| Snake Bite | 🔴 Life-Threatening |
| Burns | 🟠 Serious |
| Drowning | 🔴 Life-Threatening |
| Choking | 🔴 Life-Threatening |
| Fracture | 🟡 Time-Sensitive |
| Seizure | 🟠 Serious |
| Bleeding | 🟠 Serious |
| Unconscious Person | 🔴 Life-Threatening |
| Road Accident | 🔴 Life-Threatening |

- Full **search + category filter** system
- Numbered clinical step timeline with action-oriented instructions
- Works **100% offline** — no network required

</details>

<details>
<summary><strong>🪪 Digital Medical ID</strong></summary>

<br/>

- Persistent **emergency medical passport** stored in `localStorage`
- Captures: blood type, allergies, chronic conditions, medications, emergency contacts, organ donor status, insurance info
- **Blood type focal display** for immediate first-responder identification
- **Completeness progress bar** to encourage full profile setup
- QR code payload modal for quick data export
- 2-column responsive form editor

</details>

<details>
<summary><strong>📋 Triage History</strong></summary>

<br/>

- Private timeline of all past emergency assessments
- **Search** by symptoms, severity, or clinical summary
- **Filter tabs**: All · Critical · Urgent · Other
- **Smart date grouping**: Today · Yesterday · This Week · exact date label
- Per-record detail modal with full clinical assessment
- Individual record deletion + two-step **Clear All** confirmation
- All data stored locally — **never leaves the device**

</details>

<details>
<summary><strong>⚙️ Settings & Accessibility</strong></summary>

<br/>

- **6-language switcher**: English, Hindi, Tamil, Telugu, Bengali, Marathi
- **4-tier text size control** (Small → Extra Large) — scales the entire app via CSS zoom
- Granular **notification preferences**: Emergency Alerts, Medicine Reminders, Hospital Updates
- Sound Alerts + Vibration toggles
- Two-stage **Reset to Defaults** with confirmation
- All preferences persist in `localStorage`

</details>

<details>
<summary><strong>🔐 Admin Command Center</strong></summary>

<br/>

- Premium, secure admin login (session-based authentication)
- Full platform statistics: total triages, severity breakdown, symptom trends, recent activity
- Backend-powered with MongoDB Atlas

</details>

---

## ✦ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18 | Component-based UI architecture |
| **Vite** | 5 | Fast build tooling and HMR dev server |
| **Vanilla CSS** | — | Fully custom design system (~85KB, 4000+ lines) |
| **Leaflet + React-Leaflet** | — | Interactive GPS maps with custom markers |
| **Socket.io Client** | — | Real-time chat and live location updates |
| **WebRTC** | — | Peer-to-peer video consultations |
| **Canvas API** | — | Realistic ECG waveform animation |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js + Express** | — | REST API server |
| **Socket.io** | — | Real-time rooms, chat, and location events |
| **Anthropic Claude AI** | claude-3 | AI-powered symptom triage engine |
| **MongoDB Atlas + Mongoose** | — | Persistent triage history and admin stats |

### Infrastructure

| Service | Purpose |
|---|---|
| **Vercel** | Frontend hosting with CDN |
| **Render** | Backend API hosting |
| **MongoDB Atlas** | Cloud database (free tier compatible) |

---

## ✦ Architecture

```
SwasthyaPath
│
├── 🌐 Frontend  (React + Vite)
│   ├── Pages:        LandingPage · FirstAid · MedicalID · Settings · AdminDashboard
│   ├── Components:   Header · LiveECGMonitor · HospitalMap · DoctorChat · UserHistory · SOSButton
│   ├── Utils:        triage.js · socket.js · location.js · fetchHospitals.js · strings.js
│   └── Design:       index.css — custom token-based design system, dark + light themes
│
└── ⚙️ Backend  (Node.js + Express + Socket.io)
    ├── Routes:       /api/triage → Claude AI
    │                 /api/admin  → Auth + Stats
    │                 /api/hospitals → OpenStreetMap proxy
    ├── Real-Time:    Socket.io — chat rooms, WebRTC signaling, GPS broadcast
    └── Database:     MongoDB Atlas — triage records, admin credentials
```

---

## ✦ Project Structure

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
        │   ├── Header.jsx          # Nav bar with ECG monitor, theme toggle, language selector
        │   ├── LiveECGMonitor.jsx  # Realistic P-QRS-T ECG waveform (Canvas)
        │   ├── EmergencyBar.jsx    # National emergency numbers top bar
        │   ├── SymptomInput.jsx    # Symptom textarea with voice input
        │   ├── TriageResult.jsx    # AI triage result card
        │   ├── HospitalMap.jsx     # Leaflet map + ambulance/patient pins
        │   ├── HospitalList.jsx    # Ranked hospital results list
        │   ├── HospitalCard.jsx    # Individual hospital card
        │   ├── UserHistory.jsx     # Private triage history timeline
        │   ├── DoctorChat.jsx      # Real-time chat + WebRTC video call
        │   ├── VideoCall.jsx       # WebRTC video component
        │   ├── SOSButton.jsx       # Emergency SOS overlay
        │   ├── FAB.jsx             # Floating action button
        │   ├── AdminLogin.jsx      # Protected admin login
        │   ├── LoadingSpinner.jsx  # Loading state component
        │   └── OfflineBanner.jsx   # Offline status banner
        ├── pages/
        │   ├── LandingPage.jsx     # Hero landing page
        │   ├── FirstAid.jsx        # Offline-first first aid guide
        │   ├── MedicalID.jsx       # Digital emergency medical passport
        │   ├── Settings.jsx        # Accessibility + notification preferences
        │   └── AdminDashboard.jsx  # Admin stats dashboard (protected)
        ├── utils/
        │   ├── triage.js           # Claude AI API integration
        │   ├── socket.js           # Socket.io client singleton
        │   ├── location.js         # GPS + reverse geocoding
        │   ├── fetchHospitals.js   # Hospital fetch via backend proxy
        │   ├── matchHospitals.js   # Match hospitals to AI-recommended specialties
        │   ├── serviceWorker.js    # Online status + hospital cache helpers
        │   └── strings.js          # Multi-language string translations (6 languages)
        ├── data/                   # Static first aid procedure data
        ├── App.jsx                 # Root component — routing, state, triage orchestration
        ├── index.css               # Full custom design system (~4500 lines)
        └── main.jsx                # React entry point
```

---

## ✦ Local Setup

### Prerequisites

- **Node.js** v18 or higher
- **MongoDB Atlas** account (free tier works perfectly)
- **Anthropic API key** — get one at [console.anthropic.com](https://console.anthropic.com)

---

### 1. Clone the repository

```bash
git clone https://github.com/bm0213/Swasthyapath.git
cd Swasthyapath
```

---

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=4000
MONGODB_URI=your_mongodb_atlas_connection_string
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

Start the backend dev server:

```bash
npm run dev
```

The API will be available at `http://localhost:4000`

---

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the frontend dev server:

```bash
npm run dev
```

---

### 4. Open in browser

```
http://localhost:5173
```

---

## ✦ API Reference

### REST Endpoints

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/triage` | ❌ | Submit symptoms for AI triage analysis |
| `POST` | `/api/admin/login` | ❌ | Admin authentication |
| `GET` | `/api/admin/stats` | ✅ Session | Platform-wide triage statistics |
| `GET` | `/api/hospitals/nearby` | ❌ | Fetch nearby hospitals via OpenStreetMap |

---

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

## ✦ Real-Time Events (Socket.io)

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

## ✦ localStorage Keys

| Key | Type | Purpose |
|---|---|---|
| `swasthya-triage-history` | `Array` | Past triage assessment records |
| `swasthya-fontsize` | `string` | Text size preference (`small` / `medium` / `large` / `xlarge`) |
| `swasthya-notifications` | `object` | Notification preference settings |
| `swasthya-lang` | `string` | Selected language code (`en` / `hi` / `ta` / `te` / `bn` / `mr`) |
| `swasthya-medicalid` | `object` | User's Digital Medical ID data |
| `swasthya-hospitals-cache` | `Array` | Cached nearby hospital results (offline fallback) |

---

## ✦ Design System

SwasthyaPath uses a fully custom CSS design system with no Tailwind and no third-party component library. All styling lives in `index.css` using CSS custom properties.

### Color Palette

| Token | Value | Role |
|---|---|---|
| `--teal` | `#16A579` | Primary emerald — CTAs, active states, success |
| `--alert` | `#E11D48` | Emergency red — critical severity, errors |
| `--amber` | `#F59E0B` | Warning amber — urgent severity |
| `--bg` | `#07111F` | Dark mode background |
| `--bg-card` | `#122238` | Dark mode card surface |
| `--bg-secondary` | `#0D1A2B` | Dark mode secondary surface |
| `--text-primary` | `#F8FAFC` | Primary text (dark mode) |
| `--text-secondary` | `#94A3B8` | Secondary muted text |

### Theming

Full **Dark Mode** (default) and **Light Mode** support, toggled by setting `data-theme="light"` on the `<html>` element. All color tokens automatically remap for the active theme.

### Typography

**Outfit** (headings) + **Inter** (body) — loaded via Google Fonts. A 4-step text size scale controlled via CSS zoom ensures complete accessibility compliance.

---

## ✦ Contributing

Contributions are welcome. To get started:

```bash
# 1. Fork and clone
git clone https://github.com/your-username/Swasthyapath.git

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit with a clear message
git commit -m "feat: describe your change"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please keep commits focused and PRs scoped to a single feature or fix.

---

## ✦ License

This project is open source, available under the [MIT License](LICENSE).

---

<div align="center">

<br/>

**SwasthyaPath**

<sub>Built with care for India's emergency healthcare infrastructure.</sub>

<br/>

<img src="https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=flat-square&labelColor=07111F" alt="Made in India"/>
&nbsp;
<img src="https://img.shields.io/badge/Built%20with-Claude%20AI-D4A853?style=flat-square&labelColor=07111F" alt="Built with Claude AI"/>
&nbsp;
<img src="https://img.shields.io/badge/Open%20Source-MIT-16A579?style=flat-square&labelColor=07111F" alt="Open Source MIT"/>

<br/><br/>

**[bm0213](https://github.com/bm0213)** — [GitHub](https://github.com/bm0213) · [Live Demo](https://swasthyapath-orcin.vercel.app)

<br/>

</div>