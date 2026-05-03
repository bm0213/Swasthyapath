# 🏥 SwasthyaPath — AI-Powered Emergency Response System

<div align="center">

![SwasthyaPath](https://img.shields.io/badge/SwasthyaPath-Emergency%20Response-red?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=for-the-badge&logo=mongodb)
![Claude AI](https://img.shields.io/badge/Claude-Anthropic%20AI-orange?style=for-the-badge)

**An AI-powered emergency medical triage system designed for rural India.**  
Describe symptoms in any language → Get instant AI triage → Find the nearest hospital.

🌐 **Live Demo:** [swasthyapath-orcin.vercel.app](https://swasthyapath-orcin.vercel.app)

</div>

---

## ✨ Features

- 🤖 **AI Triage** — Claude AI analyzes symptoms in multiple languages and assesses severity (Critical / Urgent / Moderate)
- 🗺️ **Real GPS + Live Map** — Finds nearest hospitals using real-time location with Leaflet maps
- 🚑 **Ambulance Live Tracking** — Patient and ambulance share live locations visible on the map in real time
- 💬 **Doctor Chat** — Real-time chat between patient and volunteer doctor via Socket.io rooms
- 📹 **Video Call** — WebRTC-powered video consultation between patient and doctor
- 🩹 **First Aid Guide** — Step-by-step offline first aid for 10 emergencies (Heart Attack, Snake Bite, Burns, Drowning, Choking, Fracture, Seizure, Bleeding, Unconscious, Road Accident)
- 📋 **My Triage History** — Users can view their past triage records stored locally
- 🔐 **Admin Dashboard** — Protected admin login with full stats, severity breakdown, symptom trends and recent activity
- 📴 **Offline Mode** — Cached hospital data and First Aid Guide work without internet connection
- 🌍 **Multi-language** — Supports English, Hindi, Tamil, Telugu, Bengali, Marathi
- 🆘 **SOS Button** — One-tap emergency call with location sharing
- 📱 **PWA Ready** — Installable on mobile devices

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework |
| Leaflet + React-Leaflet | Interactive maps |
| Socket.io Client | Real-time communication |
| WebRTC | Video calls |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Socket.io | Real-time rooms & chat |
| Anthropic Claude AI | AI-powered symptom triage |
| MongoDB Atlas + Mongoose | Persistent database |
| Dotenv | Environment variables |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 🚀 Live Demo

| Service | URL |
|---|---|
| 🌐 Frontend | [swasthyapath-orcin.vercel.app](https://swasthyapath-orcin.vercel.app) |
| ⚙️ Backend API | [swasthyapath-backend.onrender.com](https://swasthyapath-backend.onrender.com) |

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free)
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

## 📁 Project Structure

```
Swasthyapath/
├── backend/
│   ├── routes/
│   │   ├── triage.js        # AI triage endpoint
│   │   ├── admin.js         # Admin stats + login endpoint
│   │   └── hospitals.js     # Hospital proxy endpoint
│   ├── db.js                # MongoDB connection + schemas
│   ├── index.js             # Express + Socket.io server
│   └── package.json
│
└── frontend/
    └── src/
        ├── components/
        │   ├── AdminLogin.jsx      # Admin login page
        │   ├── UserHistory.jsx     # User triage history
        │   ├── DoctorChat.jsx      # Real-time chat + video call
        │   ├── VideoCall.jsx       # WebRTC video call
        │   ├── HospitalMap.jsx     # Leaflet map + ambulance tracking
        │   ├── HospitalList.jsx    # Hospital results list
        │   ├── SymptomInput.jsx    # Symptom input form
        │   ├── TriageResult.jsx    # AI triage result display
        │   ├── SOSButton.jsx       # Emergency SOS
        │   └── ...
        ├── pages/
        │   ├── AdminDashboard.jsx  # Admin stats dashboard (protected)
        │   ├── FirstAid.jsx        # Offline first aid guide
        │   └── Settings.jsx
        ├── utils/
        │   ├── triage.js           # Claude AI API call
        │   ├── socket.js           # Socket.io client
        │   ├── location.js         # GPS utilities
        │   ├── fetchHospitals.js   # Hospital fetch via backend proxy
        │   └── ...
        └── App.jsx                 # Main app component
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/triage` | Submit symptoms for AI triage |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/stats` | Get admin dashboard stats |
| GET | `/api/hospitals/nearby` | Fetch nearby hospitals via proxy |

### Triage Request
```json
{
  "symptoms": "Patient has severe chest pain and difficulty breathing",
  "location": { "lat": 13.0827, "lng": 80.2707 }
}
```

### Triage Response
```json
{
  "severity": "critical",
  "severityLabel": "Critical Emergency",
  "summary": "Symptoms suggest a possible cardiac event.",
  "facilities": ["ICU", "Cardiology", "Ventilator"],
  "doNow": "Keep the patient calm and seated upright. Call 112 immediately."
}
```

---

## 🔌 Socket.io Events

| Event | Direction | Description |
|---|---|---|
| `join_room` | Client → Server | Join a chat room |
| `send_message` | Client → Server | Send a chat message |
| `ambulance_location` | Client → Server | Share ambulance GPS |
| `patient_location` | Client → Server | Share patient GPS |
| `call_request` | Client → Server | Request video call |
| `call_accepted` | Client → Server | Accept video call |
| `call_declined` | Client → Server | Decline video call |
| `call_ended` | Client → Server | End video call |
| `webrtc_offer/answer/ice` | Client → Server | WebRTC signaling |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**bm0213** — [GitHub](https://github.com/bm0213)

---

<div align="center">
Made with ❤️ for rural India's emergency healthcare
</div>