import React, { useState } from "react";

// Clean Medical SVG Icons (100% SVG, no emojis)
function HeartIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 9v4" />
      <path d="M10 11h4" />
    </svg>
  );
}

function SnakeIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4" />
      <path d="m14 4-4 4" />
      <path d="M7 13a4 4 0 0 0 8 0c0-3-4-3-4-6a4 4 0 0 1 8 0v7a5 5 0 0 1-10 0v-2" />
      <circle cx="17" cy="11" r="1" fill={color} />
    </svg>
  );
}

function FlameIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function DropletIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function AirwayIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

function BoneIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.5 2.5 0 0 1 2.45 2.05A2.5 2.5 0 0 1 21 8c0 1.22-.88 2.24-2.05 2.45L8.45 20.95A2.5 2.5 0 0 1 5 21a2.5 2.5 0 0 1-2.95-2.45A2.5 2.5 0 0 1 3 16c0-1.22.88-2.24 2.05-2.45L15.55 3.05A2.5 2.5 0 0 1 17 3z" />
    </svg>
  );
}

function ZapIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function BloodIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 11v6" />
      <path d="M9 14h6" />
    </svg>
  );
}

function UserMinusIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

function CarIcon({ color = "currentColor", size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.2 1 12 1 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

const firstAidData = [
  {
    id: "heart-attack",
    title: "Heart Attack",
    category: "emergency",
    severity: "critical",
    Icon: HeartIcon,
    color: "#E11D48",
    signs: [
      "Chest pain or crushing pressure",
      "Pain spreading to left arm, neck, shoulder or jaw",
      "Shortness of breath and rapid shallow breathing",
      "Cold sweats, nausea or lightheadedness",
      "Sudden severe anxiety or feeling of impending doom"
    ],
    steps: [
      "Call 112 immediately — do not delay emergency dispatch.",
      "Help the person sit down in a comfortable position, leaning against a wall with knees bent to reduce heart strain.",
      "Loosen all tight clothing around the neck, chest and waist.",
      "If conscious and not allergic, give one 325mg aspirin tablet to chew slowly.",
      "If unconscious and not breathing, start CPR immediately (30 compressions : 2 breaths).",
      "Stay with the person, monitor pulse and breathing until paramedics arrive."
    ],
    donts: [
      "Do NOT allow the person to walk around or exert effort.",
      "Do NOT give food, water, or alcoholic beverages.",
      "Do NOT leave the person unmonitored at any time."
    ],
    call112: true,
  },
  {
    id: "snake-bite",
    title: "Snake Bite",
    category: "other",
    severity: "warning",
    Icon: SnakeIcon,
    color: "#D97706",
    signs: [
      "Two distinct puncture marks at the bite site",
      "Rapid swelling, bruising and severe localized pain",
      "Nausea, vomiting, and excessive sweating",
      "Blurred vision, dizziness, or difficulty speaking",
      "Numbness, tingling around mouth or tongue"
    ],
    steps: [
      "Keep the victim calm and absolutely still — movement accelerates venom circulation.",
      "Immobilize the bitten limb and keep it positioned below heart level.",
      "Remove all rings, watches, tight clothing near the bite before swelling occurs.",
      "Mark the outer boundary of swelling with a pen and note the exact time.",
      "Transport immediately to a hospital equipped with anti-venom (ASV).",
      "Note the snake's color, size, and pattern from a safe distance for clinical identification."
    ],
    donts: [
      "Do NOT cut open the wound or attempt to suck out venom.",
      "Do NOT apply a tight tourniquet or ice pack to the bite.",
      "Do NOT administer alcohol, caffeinated drinks, or pain medications."
    ],
    call112: true,
  },
  {
    id: "burns",
    title: "Burns & Scalds",
    category: "injuries",
    severity: "warning",
    Icon: FlameIcon,
    color: "#D97706",
    signs: [
      "Red, blistered, charred or white skin texture",
      "Intense localized pain (or numbness in third-degree deep tissue burns)",
      "Swelling around burned extremities",
      "Coughing, soot around nostrils, or hoarseness (smoke inhalation)"
    ],
    steps: [
      "Remove the victim from the heat, chemical or electrical source immediately.",
      "Cool the burn under cool running tap water for at least 10–20 minutes (do NOT use freezing ice).",
      "Gently remove jewelry, belts or non-sticking clothing near the affected area.",
      "Cover the burn loosely with clean, sterile cling film or a non-fluffy sterile dressing.",
      "For deep burns larger than the victim's palm, call 112 immediately.",
      "Keep the person warm with a clean blanket to prevent hypothermic shock."
    ],
    donts: [
      "Do NOT apply butter, toothpaste, oil, or ice to the burn.",
      "Do NOT pop, puncture, or peel skin blisters.",
      "Do NOT pull away clothing stuck firmly to burned skin."
    ],
    call112: true,
  },
  {
    id: "drowning",
    title: "Drowning & Submersion",
    category: "breathing",
    severity: "critical",
    Icon: DropletIcon,
    color: "#E11D48",
    signs: [
      "Unconsciousness after water rescue",
      "Absence of normal chest rise or irregular gasping",
      "Bluish tint on lips, fingernails, or skin",
      "Coughing up foam, water or blood"
    ],
    steps: [
      "Remove the victim from water safely — throw a flotation aid if you cannot swim.",
      "Call 112 immediately to dispatch advanced life support.",
      "Place victim on a firm, flat surface and open airway by tilting head back and lifting chin.",
      "If not breathing, deliver 5 initial rescue breaths into the mouth while pinching nose.",
      "Begin CPR immediately (30 chest compressions : 2 rescue breaths).",
      "If breathing resumes, place in the lateral recovery position and keep warm."
    ],
    donts: [
      "Do NOT perform abdominal thrusts to drain water from lungs.",
      "Do NOT leave the victim unattended even if they regain consciousness.",
      "Do NOT delay starting CPR to clear swallowed water."
    ],
    call112: true,
  },
  {
    id: "choking",
    title: "Choking & Airway Obstruction",
    category: "breathing",
    severity: "critical",
    Icon: AirwayIcon,
    color: "#E11D48",
    signs: [
      "Inability to speak, cough, or draw air",
      "Universal choking sign (clutching neck with hands)",
      "High-pitched wheezing or silent effort",
      "Skin turning blue or dark gray"
    ],
    steps: [
      "Ask 'Are you choking?' — if they can cough forcefully, encourage continued coughing.",
      "If unable to breathe, stand behind, lean them forward, and deliver 5 firm back blows between shoulder blades.",
      "If obstruction remains, deliver 5 abdominal thrusts (Heimlich maneuver): place fist above navel, pull inward & upward.",
      "Alternate between 5 back blows and 5 abdominal thrusts until object clears.",
      "If victim becomes unresponsive, lower to ground, call 112, and start CPR.",
      "Look inside mouth before rescue breaths — remove visible object if seen."
    ],
    donts: [
      "Do NOT perform blind finger sweeps inside mouth.",
      "Do NOT deliver abdominal thrusts to pregnant women or infants (use chest thrusts).",
      "Do NOT slap victim while they are upright and coughing effectively."
    ],
    call112: true,
  },
  {
    id: "fracture",
    title: "Fractures & Bone Injuries",
    category: "injuries",
    severity: "general",
    Icon: BoneIcon,
    color: "#16A579",
    signs: [
      "Sharp pain at injury site aggravated by movement",
      "Visible deformity, unnatural angle, or shortening",
      "Rapid swelling, bruising, or tenderness",
      "Bone fragment protruding through skin (open fracture)"
    ],
    steps: [
      "Keep victim still — support injured area above and below joint.",
      "Call 112 immediately for suspected spine, neck, skull, or pelvis fractures.",
      "Immobilize the limb using a rigid splint (rolled cardboard, wooden board) padded with cloth.",
      "Apply an ice pack wrapped in a towel for 15 minutes at a time to control swelling.",
      "For open fractures, cover wound with a sterile dressing without pressing bone.",
      "Elevate limb slightly above heart level if it causes no additional pain."
    ],
    donts: [
      "Do NOT attempt to straighten or force broken bones back into place.",
      "Do NOT move a victim with suspected spinal or neck injury.",
      "Do NOT tie splint bandages so tightly that blood flow is restricted."
    ],
    call112: false,
  },
  {
    id: "seizure",
    title: "Seizures & Convulsions",
    category: "other",
    severity: "warning",
    Icon: ZapIcon,
    color: "#D97706",
    signs: [
      "Sudden collapse with violent muscle jerking or stiffening",
      "Loss of consciousness and unresponsiveness",
      "Frothing at mouth or tongue biting",
      "Temporary confusion, fatigue, or memory loss following episode"
    ],
    steps: [
      "Stay calm and record the start time of the seizure.",
      "Clear nearby area of hard, sharp, or hazardous objects.",
      "Place something soft (folded jacket, cushion) under the victim's head.",
      "Gently roll person onto their side into recovery position once jerking stops to clear airway.",
      "Reassure person as consciousness gradually returns.",
      "Call 112 if seizure lasts longer than 5 minutes, repeats, or occurs in water."
    ],
    donts: [
      "Do NOT put anything inside the person's mouth (no spoons, fingers, or cloth).",
      "Do NOT physically restrain or hold down the jerking limbs.",
      "Do NOT offer liquids or medication until fully alert and oriented."
    ],
    call112: false,
  },
  {
    id: "bleeding",
    title: "Severe Bleeding & Hemorrhage",
    category: "bleeding",
    severity: "critical",
    Icon: BloodIcon,
    color: "#E11D48",
    signs: [
      "Continuous spurting or heavy dark blood flow",
      "Blood soaking rapidly through thick clothing or cloth",
      "Deep gaping wound or open arterial injury",
      "Signs of hemorrhagic shock (pale cold skin, dizziness, weak pulse)"
    ],
    steps: [
      "Call 112 immediately for arterial or uncontrolled bleeding.",
      "Apply firm, direct pressure over wound using a sterile pad or clean cloth.",
      "Maintain continuous manual pressure for at least 10 minutes without lifting pad.",
      "If blood soaks through, place additional pads on top — do NOT remove initial layer.",
      "Elevate injured limb above heart level while maintaining firm direct pressure.",
      "Keep victim lying flat, warm, and calm until emergency medical help arrives."
    ],
    donts: [
      "Do NOT remove blood-soaked pads from the wound surface.",
      "Do NOT apply a makeshift tourniquet unless trained in life-threatening limb hemorrhage.",
      "Do NOT wash or probe deep bleeding wounds with tap water."
    ],
    call112: true,
  },
  {
    id: "unconscious",
    title: "Unconscious Person",
    category: "emergency",
    severity: "critical",
    Icon: UserMinusIcon,
    color: "#E11D48",
    signs: [
      "Unresponsive to verbal commands or physical stimuli",
      "Limp posture, closed eyes, or flaccid limbs",
      "Absent, shallow, or abnormal gasping breath",
      "Pale, ash-gray, or cyanotic skin tone"
    ],
    steps: [
      "Call 112 immediately to request emergency response.",
      "Check responsiveness (shake shoulders gently and ask loudly 'Are you OK?').",
      "Open airway by gently tilting head back and lifting chin with two fingers.",
      "Look, listen, and feel for normal breathing for up to 10 seconds.",
      "If breathing normally, roll person onto their side into recovery position.",
      "If not breathing normally, begin CPR immediately (30 compressions : 2 rescue breaths)."
    ],
    donts: [
      "Do NOT administer liquids, food, or oral medication.",
      "Do NOT leave person flat on their back if breathing (risk of tongue obstruction).",
      "Do NOT slap, shake violently, or splash water on victim."
    ],
    call112: true,
  },
  {
    id: "road-accident",
    title: "Road Accident & Trauma",
    category: "emergency",
    severity: "critical",
    Icon: CarIcon,
    color: "#E11D48",
    signs: [
      "High-impact collision with trapped occupants",
      "Severe physical trauma, bleeding, or head injuries",
      "Unconsciousness or spinal trauma symptoms",
      "Vehicle hazards (leaking fuel, smoke, unstable position)"
    ],
    steps: [
      "Ensure personal safety — park safely, switch on hazard lights, set warning triangle.",
      "Call 112 immediately — specify exact location, landmarks, and casualty numbers.",
      "Do NOT move injured casualties unless immediate danger exists (fire, explosion).",
      "Reassure victim, instruct them to keep head and neck completely still.",
      "Control life-threatening external bleeding with direct cloth pressure.",
      "Keep casualties warm with coats or blankets to combat traumatic shock."
    ],
    donts: [
      "Do NOT remove a motorcycle rider's helmet unless airway is obstructed.",
      "Do NOT twist or bend neck/spine during extrication.",
      "Do NOT allow bystanders to crowd around or move victims."
    ],
    call112: true,
  },
];

export default function FirstAid({ lang }) {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchFocused, setSearchFocused] = useState(false);

  const popularSearches = [
    { label: "Chest pain", query: "Heart Attack" },
    { label: "Bleeding", query: "Bleeding" },
    { label: "Burns", query: "Burns" },
    { label: "Choking", query: "Choking" },
    { label: "Snake bite", query: "Snake Bite" },
  ];

  const categories = [
    { id: "all", label: "All Procedures" },
    { id: "emergency", label: "Emergency" },
    { id: "injuries", label: "Injuries" },
    { id: "breathing", label: "Breathing" },
    { id: "bleeding", label: "Bleeding" },
    { id: "other", label: "Other" },
  ];

  // Filtering
  const filteredData = firstAidData.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.signs.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      item.steps.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const selectedItem = firstAidData.find((item) => item.id === selectedId);

  // Split into Critical & Other when viewing 'all' without search
  const isViewingAllNoSearch = selectedCategory === "all" && search.trim() === "";
  const criticalItems = filteredData.filter((item) => item.severity === "critical");
  const otherItems = filteredData.filter((item) => item.severity !== "critical");

  // Detail View Component
  if (selectedItem) {
    const ItemIcon = selectedItem.Icon;
    return (
      <div className="fa-page-wrapper fade-up">
        {/* Back Button */}
        <button
          className="fa-detail-back-btn"
          onClick={() => setSelectedId(null)}
          aria-label="Back to First Aid Guide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to First Aid Guide
        </button>

        {/* Clinical Detail Hero Banner */}
        <div className={`fa-detail-hero ${selectedItem.severity}`}>
          <div className="fa-hero-icon-frame">
            <ItemIcon size={32} color={selectedItem.color} />
          </div>

          <div className="fa-hero-content">
            <div className="fa-hero-meta-row">
              <span className={`fa-severity-badge badge-${selectedItem.severity}`}>
                {selectedItem.severity === "critical" && "🔴 ACT IMMEDIATELY"}
                {selectedItem.severity === "warning" && "⚡ WARNING & ATTENTION"}
                {selectedItem.severity === "general" && "✅ FIRST AID PROCEDURE"}
              </span>

              <span className="fa-offline-pill">
                <span className="pill-dot"></span>
                OFFLINE REFERENCE
              </span>
            </div>

            <h1 className="fa-hero-title">{selectedItem.title}</h1>
            <p className="fa-hero-sub">Official Emergency First-Aid Protocol</p>
          </div>
        </div>

        {/* 2-Column: Warning Signs & Don'ts */}
        <div className="fa-grid-2col">
          {/* Warning Signs */}
          <div className="fa-box-signs">
            <div className="fa-box-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h3>Warning Signs — What to look for</h3>
            </div>
            <div className="fa-box-body">
              {selectedItem.signs.map((sign, idx) => (
                <div key={idx} className="fa-sign-item">
                  <span className="sign-dot" style={{ background: selectedItem.color }} />
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Don'ts */}
          <div className="fa-box-donts">
            <div className="fa-box-header donts-header">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <h3>What NOT to do</h3>
            </div>
            <div className="fa-box-body">
              {selectedItem.donts.map((dont, idx) => (
                <div key={idx} className="fa-dont-item">
                  <span className="dont-cross">✕</span>
                  <span>{dont}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step-by-Step Instructions Timeline */}
        <div className="fa-steps-card">
          <div className="fa-steps-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A579" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <h2>Step-by-Step Action Protocol</h2>
          </div>

          <div className="fa-steps-timeline">
            {selectedItem.steps.map((step, idx) => {
              const stepNum = String(idx + 1).padStart(2, "0");
              return (
                <div key={idx} className="fa-timeline-item">
                  <div className="fa-step-badge">{stepNum}</div>
                  <div className="fa-step-text">{step}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Call 112 CTA inside Detail View */}
        {selectedItem.call112 && (
          <div className="fa-detail-emergency-cta">
            <a href="tel:112" className="fa-emergency-btn" aria-label="Call 112 National Emergency Services">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call 112 — National Emergency Dispatch
            </a>
          </div>
        )}
      </div>
    );
  }

  // Procedure Grid View
  return (
    <div className="fa-page-wrapper fade-up">
      {/* Page Header */}
      <div className="fa-page-header">
        <div>
          <h1 className="fa-page-title">FIRST AID GUIDE</h1>
          <p className="fa-page-subtitle">
            Clear, step-by-step guidance for critical situations.
          </p>
        </div>

        <div className="fa-offline-badge" title="First Aid protocols are stored locally on your device">
          <span className="badge-dot" />
          ● AVAILABLE OFFLINE
        </div>
      </div>

      {/* Search Experience */}
      <div className="fa-search-wrapper">
        <div className={`fa-search-field ${searchFocused ? "focused" : ""}`}>
          <svg className="fa-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="fa-search-input"
            placeholder="Search first-aid procedures, symptoms or situations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            aria-label="Search first-aid procedures"
          />
          {search && (
            <button className="fa-search-clear" onClick={() => setSearch("")} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>

        {/* Popular Searches */}
        <div className="fa-popular-row">
          <span className="popular-label">Popular:</span>
          <div className="popular-chips">
            {popularSearches.map((pop, i) => (
              <button
                key={i}
                className="popular-chip"
                onClick={() => setSearch(pop.query)}
              >
                {pop.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="fa-category-bar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`fa-category-chip ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      {filteredData.length === 0 ? (
        /* Empty Search State */
        <div className="fa-empty-card">
          <div className="empty-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <h3 className="empty-title">No first-aid procedures found</h3>
          <p className="empty-sub">
            We couldn't find any results matching "<strong>{search}</strong>".
          </p>
          <div className="empty-suggestions">
            Try searching for:{" "}
            <button onClick={() => setSearch("Bleeding")}>bleeding</button>,{" "}
            <button onClick={() => setSearch("Burns")}>burn</button>,{" "}
            <button onClick={() => setSearch("Choking")}>choking</button>, or{" "}
            <button onClick={() => setSearch("Fracture")}>fracture</button>.
          </div>
          <button className="empty-reset-btn" onClick={() => { setSearch(""); setSelectedCategory("all"); }}>
            Clear Search & Filters
          </button>
        </div>
      ) : isViewingAllNoSearch ? (
        /* Grouped View when viewing 'All' */
        <>
          {/* Critical Section */}
          <div className="fa-section-block">
            <div className="fa-section-title-lockup critical-head">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h2>CRITICAL PROCEDURES</h2>
              <span className="section-count">{criticalItems.length}</span>
            </div>

            <div className="fa-grid">
              {criticalItems.map((item) => {
                const ItemIcon = item.Icon;
                return (
                  <button
                    key={item.id}
                    className="fa-card critical-card"
                    onClick={() => setSelectedId(item.id)}
                  >
                    <div className="fa-card-top">
                      <div className="fa-card-icon-frame critical-icon">
                        <ItemIcon size={24} color="#E11D48" />
                      </div>
                      <span className="fa-card-badge critical-badge">CRITICAL</span>
                    </div>

                    <div className="fa-card-body">
                      <h3 className="fa-card-title">{item.title}</h3>
                      <p className="fa-card-meta">{item.signs.length} warning signs</p>
                    </div>

                    <div className="fa-card-footer">
                      <span className="fa-card-action">View Protocol</span>
                      <svg className="fa-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Other Section */}
          <div className="fa-section-block" style={{ marginTop: "32px" }}>
            <div className="fa-section-title-lockup neutral-head">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#16A579" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <h2>OTHER FIRST AID PROCEDURES</h2>
              <span className="section-count">{otherItems.length}</span>
            </div>

            <div className="fa-grid">
              {otherItems.map((item) => {
                const ItemIcon = item.Icon;
                return (
                  <button
                    key={item.id}
                    className="fa-card"
                    onClick={() => setSelectedId(item.id)}
                  >
                    <div className="fa-card-top">
                      <div className="fa-card-icon-frame">
                        <ItemIcon size={24} color={item.color} />
                      </div>
                      {item.severity === "warning" && (
                        <span className="fa-card-badge warning-badge">WARNING</span>
                      )}
                    </div>

                    <div className="fa-card-body">
                      <h3 className="fa-card-title">{item.title}</h3>
                      <p className="fa-card-meta">{item.signs.length} warning signs</p>
                    </div>

                    <div className="fa-card-footer">
                      <span className="fa-card-action">View Protocol</span>
                      <svg className="fa-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Ungrouped Filtered Grid */
        <div className="fa-grid">
          {filteredData.map((item) => {
            const ItemIcon = item.Icon;
            return (
              <button
                key={item.id}
                className={`fa-card ${item.severity === "critical" ? "critical-card" : ""}`}
                onClick={() => setSelectedId(item.id)}
              >
                <div className="fa-card-top">
                  <div className={`fa-card-icon-frame ${item.severity === "critical" ? "critical-icon" : ""}`}>
                    <ItemIcon size={24} color={item.color} />
                  </div>
                  {item.severity === "critical" && (
                    <span className="fa-card-badge critical-badge">CRITICAL</span>
                  )}
                  {item.severity === "warning" && (
                    <span className="fa-card-badge warning-badge">WARNING</span>
                  )}
                </div>

                <div className="fa-card-body">
                  <h3 className="fa-card-title">{item.title}</h3>
                  <p className="fa-card-meta">{item.signs.length} warning signs</p>
                </div>

                <div className="fa-card-footer">
                  <span className="fa-card-action">View Protocol</span>
                  <svg className="fa-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
