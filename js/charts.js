/* ===================================================================
   CHART COMPONENTS — 5 distinct chart types found in the original quiz.
   Each function returns an HTML string (SVG + label overlays).
=================================================================== */

// A) PREDICTION CHART — simple green curve + walking-figure marker + Goal bubble
// Used on: Prediction #1, Prediction #2
function chartPrediction(startLabel, goalLabel, axisStart, axisEnd) {
  return `
    <div class="chart-card">
      <div class="chart-top-label">${startLabel}</div>
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          <line x1="40" y1="10" x2="40" y2="130" stroke="#dfe3da" stroke-width="1"/>
          <line x1="120" y1="10" x2="120" y2="130" stroke="#dfe3da" stroke-width="1"/>
          <line x1="200" y1="10" x2="200" y2="130" stroke="#dfe3da" stroke-width="1"/>
          <line x1="280" y1="10" x2="280" y2="130" stroke="#dfe3da" stroke-width="1"/>
          <path d="M 15,30 C 70,35 90,70 150,90 C 200,108 240,118 305,122" fill="none" stroke="#5fae74" stroke-width="4" stroke-linecap="round"/>
          <circle cx="15" cy="30" r="13" fill="#3a6e4a"/>
          <text x="15" y="35" font-size="13" text-anchor="middle" fill="white">&#128694;</text>
          <circle cx="220" cy="103" r="5" fill="#3a6e4a"/>
        </svg>
        <div class="chart-bubble" style="left:62%; top:48%;">Goal<br>${goalLabel}</div>
      </div>
      <div class="chart-axis-labels"><span>${axisStart}</span><span>${axisEnd}</span></div>
    </div>`;
}

// B) GOALS PAGE CHART — green curve + shaded band + pink dashed comparator + dual bubbles
function chartGoals(currentWeight, goalWeight, unit, axisStart, axisEnd) {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          <line x1="40" y1="10" x2="40" y2="130" stroke="#e7e7e0" stroke-width="1"/>
          <line x1="110" y1="10" x2="110" y2="130" stroke="#e7e7e0" stroke-width="1"/>
          <line x1="180" y1="10" x2="180" y2="130" stroke="#e7e7e0" stroke-width="1"/>
          <line x1="250" y1="10" x2="250" y2="130" stroke="#e7e7e0" stroke-width="1"/>
          <path d="M 15,28 C 90,18 180,15 305,28" fill="none" stroke="#d63b6e" stroke-width="2.5" stroke-dasharray="5,5"/>
          <path d="M 15,30 C 80,55 150,85 220,100 C 260,108 285,112 305,113 L 305,130 L 15,130 Z" fill="#bfe3c8" opacity="0.5"/>
          <path d="M 15,30 C 80,55 150,85 220,100 C 260,108 285,112 305,113" fill="none" stroke="#3a9a55" stroke-width="4" stroke-linecap="round"/>
          <circle cx="15" cy="30" r="4" fill="#1f2d22"/>
          <circle cx="220" cy="100" r="5" fill="#1f2d22"/>
        </svg>
        <div class="chart-bubble" style="left:4%; top:6%;">${startLabelText(currentWeight, unit, "Ahora")}</div>
        <div class="chart-bubble" style="left:64%; top:54%;">${startLabelText(goalWeight, unit, "Objetivo:")}</div>
      </div>
      <div class="chart-axis-labels"><span>${axisStart}</span><span>${axisEnd}</span></div>
    </div>`;
}
function startLabelText(value, unit, prefix) { return `${prefix} ${value}${unit}`; }

// C) ELIGIBILITY CHART — 3-phase curve (1wk/4wk/12wk) orange -> green + "First results" callout
function chartEligibility() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap" style="height:170px;">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="eligGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#e0334d"/>
              <stop offset="35%" stop-color="#e8965a"/>
              <stop offset="70%" stop-color="#7cc28c"/>
              <stop offset="100%" stop-color="#3a9a55"/>
            </linearGradient>
          </defs>
          <path d="M 10,25 C 60,28 90,45 110,55 C 160,78 220,100 310,112" fill="none" stroke="url(#eligGrad)" stroke-width="6" stroke-linecap="round"/>
          <circle cx="110" cy="55" r="5" fill="#3a6e4a"/>
          <line x1="110" y1="55" x2="80" y2="20" stroke="#3a6e4a" stroke-width="1.5"/>
        </svg>
        <div class="chart-rocket-label" style="left:8%; top:2%;">&#128640; First results</div>
      </div>
      <div class="chart-axis-labels" style="justify-content:space-between;"><span>1 week</span><span>4 weeks</span><span>12 weeks</span></div>
    </div>`;
}

// D) STRESS CHART — crossing X lines, Cortisol vs Serotonin, dotted grid
function chartStress() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 160" width="100%" height="160" preserveAspectRatio="none">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <line x1="20" y1="10" x2="20" y2="135" stroke="#888" stroke-width="1.5"/>
          <line x1="20" y1="135" x2="310" y2="135" stroke="#888" stroke-width="1.5"/>
          ${[60, 110, 160, 210, 260, 310].map(x => `<line x1="${x}" y1="10" x2="${x}" y2="135" stroke="#ddd" stroke-width="1" stroke-dasharray="2,3"/>`).join("")}
          <path d="M 25,90 L 70,75 L 120,60 L 170,45 L 220,35 L 270,28 L 305,22" fill="none" stroke="#4f8ff0" stroke-width="3" filter="url(#glow)"/>
          <path d="M 25,55 L 70,68 L 120,80 L 170,95 L 220,108 L 270,118 L 305,125" fill="none" stroke="#b07ce0" stroke-width="3" filter="url(#glow)"/>
          <text x="35" y="45" font-size="13" font-weight="700" fill="#4f8ff0" transform="rotate(-12 35 45)">Cortisol</text>
          <text x="35" y="50" font-size="13">&#9729;</text>
          <text x="35" y="80" font-size="13" font-weight="700" fill="#b07ce0" transform="rotate(8 35 80)">Serotonin</text>
          <text x="35" y="68" font-size="13">&#9728;</text>
        </svg>
      </div>
      <div class="chart-axis-labels"><span>0min</span><span>5min</span><span>10min</span><span>15min</span><span>20min</span><span>25min</span></div>
    </div>`;
}

// E) CALM CHART — "Hoy" -> "Después de 2 semanas", red (no activity) vs sage (walking plan)
function chartCalm() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap" style="height:170px;">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          <path d="M 15,40 C 60,30 90,55 130,60 C 170,65 190,95 230,85 C 260,78 280,55 305,40" fill="none" stroke="#e0334d" stroke-width="3.5" stroke-linecap="round"/>
          <path d="M 15,40 C 70,55 140,80 200,95 C 240,104 270,112 305,118" fill="none" stroke="#7a6ff0" stroke-width="3.5" stroke-linecap="round"/>
          <text x="290" y="36" font-size="18">&#128544;</text>
          <text x="290" y="128" font-size="18">&#128522;</text>
        </svg>
        <div class="chart-pill" style="left:38%; top:8%; background:#fbe1e4; color:#a3273f;">No hay actividad</div>
        <div class="chart-pill" style="left:30%; top:58%; background:#e6e2fb; color:#4c3fa0;">Plan de caminata</div>
      </div>
      <div class="chart-axis-labels"><span>Hoy</span><span>Despu&eacute;s de 2 semanas</span></div>
    </div>`;
}
