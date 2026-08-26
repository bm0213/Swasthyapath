<div align="center">

<br/>

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
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white&labelColor=07111F" alt="Vite"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white&labelColor=07111F" alt="Node.js"/>
  &nbsp;
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white&labelColor=07111F" alt="MongoDB Atlas"/>
  &nbsp;
  <img src="https://img.shields.io/badge/Anthropic-Claude%20AI-D4A853?style=flat-square&labelColor=07111F" alt="Claude AI"/>
</p>

<!-- Badges Row 2 -->
<p align="center">
  <img src="https://img.shields.io/badge/Mappls-India%20POI%20Data-E63E3E?style=flat-square&labelColor=07111F" alt="Mappls"/>
  &nbsp;
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
- 🗺️ **Real-time GPS care finder** — hospitals, clinics, and pharmacies via Mappls India data
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
  - 🔴 `HIGH` — Immediate life-threatening emergency → recommends Hospital
  - 🟡 `MEDIUM` — Requires prompt attention → recommends Clinic or Hospital
  - 🟢 `LOW` — Non-immediate, basic support → recommends Pharmacy
- Returns a clinical summary, recommended care type, and immediate action guidance ("Do Now")
- Every triage result is **auto-saved to local history** — no account required

</details>

<details>
<summary><strong>🗺️ Mappls Nearby Care Finder</strong></summary>

<br/>

- Integrated directly into the Emergency Guide — **not a separate page**
- Full triage → care recommendation → location → nearby results flow:
  1. User describes symptoms
  2. AI determines urgency and recommends a care category
  3. User clicks **"Find Nearby Care"** → browser requests GPS permission
  4. App searches **Mappls India POI database** for real nearby places
  5. Results displayed as clean cards with address, distance, and action buttons

- **Three care categories**, auto-selected by triage priority:

  | Priority | Default Category | CTA |
  |---|---|---|
  | HIGH | 🏥 Hospitals | "Find Nearby Emergency Care" |
  | MEDIUM | 🩺 Clinics | "Find Care Near Me" |
  | LOW | 💊 Pharmacies | "Find Nearby Pharmacy" |

- Manual category tabs let users switch between Hospitals, Clinics, and Pharmacies
- **Adjustable search radius**: 5 km → 10 km → 20 km (slider)
- **Directions button**: opens destination on Mappls Maps (or Google Maps with coordinates)
- **Call button**: only shown when a real phone number is available from the API
- Session-level result cache — no redundant API calls for the same location and category
- Polished states for: Loading · No results · Location denied · API error

</details>

<details>
<summary><strong>🚑 Live Ambulance Tracking</strong></summary>

<br/>

- Patient and ambulance share **real-time GPS coordinates** via Socket.io
- Both locations rendered live on a shared Leaflet map
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
- Backend-powered with MongoDB Atlas (optional — server runs without it)

</details>

---

## ✦ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18 | Component-based UI architecture |
| **Vite** | 6 | Fast build tooling and HMR dev server |
| **Vanilla CSS** | — | Fully custom design system (~90KB, 4500+ lines) |
| **Leaflet + React-Leaflet** | 1.9.4 | Interactive GPS maps with custom markers |
| **Socket.io Client** | 4.x | Real-time chat and live location updates |
| **WebRTC** | — | Peer-to-peer video consultations |
| **Canvas API** | — | Realistic ECG waveform animation |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js + Express** | — | REST API server |
| **Socket.io** | 4.x | Real-time rooms, chat, and location events |
| **Anthropic Claude AI** | claude-3 | AI-powered symptom triage engine |
| **MongoDB Atlas + Mongoose** | — | Persistent triage history and admin stats (optional) |
| **Mappls REST API** | — | India-specific nearby POI search (hospitals, clinics, pharmacies) |

### Infrastructure

| Service | Purpose |
|---|---|
| **Vercel** | Frontend hosting with CDN |
| **Render** | Backend API hosting |
| **MongoDB Atlas** | Cloud database (free tier compatible, optional) |
| **Mappls Console** | India map data and POI search API |

---

## ✦ Architecture

```
SwasthyaPath
│
├── 🌐 Frontend  (React + Vite)
│   ├── Pages:        LandingPage · FirstAid · MedicalID · Settings · AdminDashboard
│   ├── Components:   Header · LiveECGMonitor · HospitalMap · NearbyCare · CarePlaceCard
│   │                 DoctorChat · UserHistory · SOSButton · TriageResult
│   ├── Utils:        triage.js · socket.js · location.js · nearbyCare.js · strings.js
│   └── Design:       index.css — custom token-based design system, dark + light themes
│
└── ⚙️ Backend  (Node.js + Express + Socket.io)
    ├── Routes:       /api/triage    → Claude AI symptom analysis
    │                 /api/nearby    → Mappls POI proxy (hospitals, clinics, pharmacies)
    │                 /api/admin     → Auth + Stats
    │                 /api/hospitals → Legacy OpenStreetMap proxy (unused by frontend)
    ├── Real-Time:    Socket.io — chat rooms, WebRTC signaling, GPS broadcast
    └── Database:     MongoDB Atlas — triage records, admin credentials (optional)
```

### Nearby Care Data Flow

```
User clicks "Find Nearby Care"
      │
      ▼
Browser Geolocation API
      │ lat, lng
      ▼
Frontend → POST /api/nearby { category, lat, lng, radiusMeters }
      │
      ▼
Backend reads MAPPLS_REST_KEY (never sent to browser)
      │
      ▼
GET search.mappls.com/search/places/nearby/json?keywords=hospital&refLocation=...
      │
      ▼
Normalize → { id, name, category, typeLabel, address, distanceKm, phone, eLoc }
      │
      ▼
Frontend renders CarePlaceCard list (sorted nearest first)
```

---

## ✦ Project Structure

```
Swasthyapath/
├── backend/
│   ├── routes/
│   │   ├── triage.js          # AI triage endpoint (Claude API)
│   │   ├── nearbyCare.js      # Mappls Nearby API proxy — keeps REST key server-side
│   │   ├── admin.js           # Admin login + stats endpoint
│   │   └── hospitals.js       # Legacy hospital proxy (OpenStreetMap Overpass)
│   ├── db.js                  # MongoDB connection + Mongoose schemas (non-fatal if unconfigured)
│   ├── index.js               # Express server + Socket.io setup
│   ├── .env.example           # Environment variable reference
│   └── package.json
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Header.jsx          # Nav bar with ECG monitor, theme toggle, language selector
        │   ├── LiveECGMonitor.jsx  # Realistic P-QRS-T ECG waveform (Canvas)
        │   ├── EmergencyBar.jsx    # National emergency numbers top bar
        │   ├── SymptomInput.jsx    # Symptom textarea with voice input
        │   ├── TriageResult.jsx    # AI triage result card + "Find Care" CTA
        │   ├── NearbyCare.jsx      # Nearby care section (tabs, states, results)
        │   ├── CarePlaceCard.jsx   # Individual care place card (directions + call)
        │   ├── HospitalMap.jsx     # Leaflet map + ambulance/patient pins
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
        │   ├── location.js         # GPS, Haversine distance, reverse geocoding
        │   ├── nearbyCare.js       # Mappls nearby care service (calls backend proxy)
        │   ├── fetchHospitals.js   # Legacy hospital fetch helper
        │   ├── matchHospitals.js   # Match hospitals to AI-recommended specialties
        │   ├── serviceWorker.js    # Online status + hospital cache helpers
        │   └── strings.js          # Multi-language string translations (6 languages)
        ├── data/                   # Static first aid procedure data
        ├── App.jsx                 # Root component — routing, state, triage orchestration
        ├── index.css               # Full custom design system (~4500 lines)
        ├── .env.example            # Environment variable reference
        └── main.jsx                # React entry point
```

---

## ✦ Local Setup

### Prerequisites

- **Node.js** v18 or higher
- **Anthropic API key** — get one at [console.anthropic.com](https://console.anthropic.com)
- **Mappls REST API key** — get one at [about.mappls.com/api](https://about.mappls.com/api/) (free tier: 1,000 calls/day)
- **MongoDB Atlas** account — optional; history and admin features require it, but the server runs without it

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

Create a `.env` file inside `backend/` (use `.env.example` as reference):

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=4000
MAPPLS_REST_KEY=your_mappls_static_rest_api_key_here

# Optional — required only for triage history and admin dashboard
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/swasthyapath
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

> **Note:** `MAPPLS_REST_KEY` is kept server-side intentionally. It is never sent to the browser.
> If `MONGODB_URI` is not set, the server starts normally — only history and admin features are disabled.

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

Create a `.env` file inside `frontend/` (use `.env.example` as reference):

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
| `POST` | `/api/nearby` | ❌ | Find nearby hospitals, clinics, or pharmacies via Mappls |
| `POST` | `/api/admin/login` | ❌ | Admin authentication |
| `GET` | `/api/admin/stats` | ✅ Session | Platform-wide triage statistics |
| `GET` | `/api/hospitals/nearby` | ❌ | Legacy: nearby hospitals via OpenStreetMap |

---

### POST `/api/triage`

**Request:**

```json
{
  "symptoms": "Severe chest pain and difficulty breathing for 20 minutes",
  "location": { "lat": 13.0827, "lng": 80.2707 }
}
```

**Response:**

```json
{
  "priority": "high",
  "severity": "critical",
  "summary": "Symptoms are consistent with an acute cardiac event requiring immediate emergency care.",
  "recommendedCareCategory": "hospitals",
  "primaryCta": "Find Nearby Emergency Care",
  "doNow": "Keep the patient calm and seated upright. Do not give food or water. Call 112 immediately."
}
```

---

### POST `/api/nearby`

**Request:**

```json
{
  "category": "hospitals",
  "lat": 28.6328,
  "lng": 77.2197,
  "radiusMeters": 5000
}
```

`category` accepts: `"hospitals"` · `"clinics"` · `"pharmacies"`

**Response:**

```json
{
  "results": [
    {
      "id": "HVKFS8",
      "name": "Arvind Medicare",
      "category": "hospitals",
      "typeLabel": "Hospital",
      "icon": "🏥",
      "address": "Block L, Connaught Place, New Delhi, Delhi, 110001",
      "lat": null,
      "lng": null,
      "eLoc": "HVKFS8",
      "phone": null,
      "distance": 269,
      "distanceKm": 0.3
    }
  ]
}
```

> Results are sorted by distance (nearest first). `phone` is only populated when the Mappls API returns a real number — never invented. `eLoc` is the Mappls Pin used to open directions.

---

## ✦ Nearby Care — Normalized Result Schema

The backend normalizes all Mappls API responses into a clean, consistent shape before returning them to the frontend. Raw API responses never reach the UI components directly.

| Field | Type | Source |
|---|---|---|
| `id` | `string` | `eLoc` (Mappls Pin) |
| `name` | `string` | `placeName` from API |
| `category` | `string` | Input parameter |
| `typeLabel` | `string` | Derived from category |
| `icon` | `string` | Derived from category |
| `address` | `string \| null` | `placeAddress` from API |
| `lat` | `number \| null` | Not returned by this API tier |
| `lng` | `number \| null` | Not returned by this API tier |
| `eLoc` | `string` | `eLoc` Mappls Pin — used for directions |
| `phone` | `string \| null` | `landlineNo` or `mobileNo` from API |
| `distance` | `number \| null` | Metres from API |
| `distanceKm` | `number` | Rounded to 1 decimal place |

**Never invented:** ratings, opening hours, emergency availability, specialties, coordinates.

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

## ✦ Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ Yes | Claude AI API key for triage |
| `PORT` | ❌ Optional | Server port (default: `4000`) |
| `MAPPLS_REST_KEY` | ✅ Yes | Mappls static REST API key for nearby POI search |
| `MONGODB_URI` | ❌ Optional | MongoDB Atlas URI — required for history + admin only |
| `ADMIN_USERNAME` | ❌ Optional | Admin dashboard username |
| `ADMIN_PASSWORD` | ❌ Optional | Admin dashboard password |

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_BACKEND_URL` | ✅ Yes | Backend server URL (e.g. `http://localhost:4000`) |

> **Security note:** `MAPPLS_REST_KEY` is intentionally kept in the backend `.env`. It is proxied through `/api/nearby` and is never included in the frontend bundle or visible in the browser.

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

**Made by**

[Arka Roy](https://github.com/arka-coder) &nbsp;·&nbsp; [Bibhradip Mandal](https://github.com/bm0213)


<br/>

[Live Demo](https://swasthyapath-orcin.vercel.app) &nbsp;·&nbsp; [MIT License](LICENSE)

<br/>

</div>
