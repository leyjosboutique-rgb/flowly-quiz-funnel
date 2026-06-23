/* ===================================================================
   CHART COMPONENTS v2 — premium palette (deep forest green + gold),
   soft drop-shadows on lines, gradient area fills.
=================================================================== */

const CHART_DEFS = `
  <defs>
    <linearGradient id="areaFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#243d30" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#243d30" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="goldFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b8923f" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#b8923f" stop-opacity="0"/>
    </linearGradient>
    <filter id="lineShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#161f1a" flood-opacity="0.18"/>
    </filter>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;

// A) PREDICTION CHART — forest-green curve + gold walking marker + dark Goal bubble
function chartPrediction(startLabel, goalLabel, axisStart, axisEnd) {
  return `
    <div class="chart-card">
      <div class="chart-top-label">${startLabel}</div>
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <line x1="40" y1="10" x2="40" y2="130" stroke="#e6e1d2" stroke-width="1"/>
          <line x1="120" y1="10" x2="120" y2="130" stroke="#e6e1d2" stroke-width="1"/>
          <line x1="200" y1="10" x2="200" y2="130" stroke="#e6e1d2" stroke-width="1"/>
          <line x1="280" y1="10" x2="280" y2="130" stroke="#e6e1d2" stroke-width="1"/>
          <path d="M 15,30 C 70,35 90,70 150,90 C 200,108 240,118 305,122 L 305,135 L 15,135 Z" fill="url(#areaFade)"/>
          <path d="M 15,30 C 70,35 90,70 150,90 C 200,108 240,118 305,122" fill="none" stroke="#243d30" stroke-width="4" stroke-linecap="round" filter="url(#lineShadow)"/>
          <circle cx="15" cy="30" r="13" fill="#b8923f"/>
          <text x="15" y="35" font-size="13" text-anchor="middle" fill="white">&#128694;</text>
          <circle cx="220" cy="103" r="5" fill="#243d30"/>
        </svg>
        <div class="chart-bubble" style="left:62%; top:48%;">Goal<br>${goalLabel}</div>
      </div>
      <div class="chart-axis-labels"><span>${axisStart}</span><span>${axisEnd}</span></div>
    </div>`;
}

// B) GOALS PAGE CHART — forest-green curve + shaded band + gold dashed comparator + dual bubbles
function chartGoals(currentWeight, goalWeight, unit, axisStart, axisEnd) {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <line x1="40" y1="10" x2="40" y2="130" stroke="#ece6d5" stroke-width="1"/>
          <line x1="110" y1="10" x2="110" y2="130" stroke="#ece6d5" stroke-width="1"/>
          <line x1="180" y1="10" x2="180" y2="130" stroke="#ece6d5" stroke-width="1"/>
          <line x1="250" y1="10" x2="250" y2="130" stroke="#ece6d5" stroke-width="1"/>
          <path d="M 15,28 C 90,18 180,15 305,28" fill="none" stroke="#b8923f" stroke-width="2.5" stroke-dasharray="5,5"/>
          <path d="M 15,30 C 80,55 150,85 220,100 C 260,108 285,112 305,113 L 305,130 L 15,130 Z" fill="url(#areaFade)"/>
          <path d="M 15,30 C 80,55 150,85 220,100 C 260,108 285,112 305,113" fill="none" stroke="#243d30" stroke-width="4" stroke-linecap="round" filter="url(#lineShadow)"/>
          <circle cx="15" cy="30" r="4" fill="#161f1a"/>
          <circle cx="220" cy="100" r="5" fill="#161f1a"/>
        </svg>
        <div class="chart-bubble" style="left:4%; top:6%;">${startLabelText(currentWeight, unit, "Ahora")}</div>
        <div class="chart-bubble" style="left:64%; top:54%;">${startLabelText(goalWeight, unit, "Objetivo:")}</div>
      </div>
      <div class="chart-axis-labels"><span>${axisStart}</span><span>${axisEnd}</span></div>
    </div>`;
}
function startLabelText(value, unit, prefix) { return `${prefix} ${value}${unit}`; }

// C) ELIGIBILITY CHART — 3-phase curve, warm coral -> forest green + gold "First results" callout
function chartEligibility() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap" style="height:170px;">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="eligGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#c23a4a"/>
              <stop offset="35%" stop-color="#b8923f"/>
              <stop offset="70%" stop-color="#5c8a51"/>
              <stop offset="100%" stop-color="#243d30"/>
            </linearGradient>
          </defs>
          <path d="M 10,25 C 60,28 90,45 110,55 C 160,78 220,100 310,112" fill="none" stroke="url(#eligGrad)" stroke-width="6" stroke-linecap="round" filter="url(#lineShadow)"/>
          <circle cx="110" cy="55" r="5" fill="#b8923f"/>
          <line x1="110" y1="55" x2="80" y2="20" stroke="#b8923f" stroke-width="1.5"/>
        </svg>
        <div class="chart-rocket-label" style="left:8%; top:2%;">&#128640; First results</div>
      </div>
      <div class="chart-axis-labels" style="justify-content:space-between;"><span>1 week</span><span>4 weeks</span><span>12 weeks</span></div>
    </div>`;
}

// D) STRESS CHART — crossing X lines, Cortisol vs Serotonin, dotted grid, forest/gold palette
function chartStress() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 160" width="100%" height="160" preserveAspectRatio="none">
          ${CHART_DEFS}
          <line x1="20" y1="10" x2="20" y2="135" stroke="#a9a294" stroke-width="1.5"/>
          <line x1="20" y1="135" x2="310" y2="135" stroke="#a9a294" stroke-width="1.5"/>
          ${[60, 110, 160, 210, 260, 310].map(x => `<line x1="${x}" y1="10" x2="${x}" y2="135" stroke="#e1ddd0" stroke-width="1" stroke-dasharray="2,3"/>`).join("")}
          <path d="M 25,90 L 70,75 L 120,60 L 170,45 L 220,35 L 270,28 L 305,22" fill="none" stroke="#243d30" stroke-width="3" filter="url(#softGlow)"/>
          <path d="M 25,55 L 70,68 L 120,80 L 170,95 L 220,108 L 270,118 L 305,125" fill="none" stroke="#b8923f" stroke-width="3" filter="url(#softGlow)"/>
          <text x="35" y="45" font-size="13" font-weight="700" fill="#243d30" transform="rotate(-12 35 45)">Cortisol</text>
          <text x="35" y="50" font-size="13">&#9729;</text>
          <text x="35" y="80" font-size="13" font-weight="700" fill="#9c7a2e" transform="rotate(8 35 80)">Serotonin</text>
          <text x="35" y="68" font-size="13">&#9728;</text>
        </svg>
      </div>
      <div class="chart-axis-labels"><span>0min</span><span>5min</span><span>10min</span><span>15min</span><span>20min</span><span>25min</span></div>
    </div>`;
}

// E) CALM CHART — "Hoy" -> "Despu&eacute;s de 2 semanas", coral (no activity) vs forest (walking plan)
function chartCalm() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap" style="height:170px;">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <path d="M 15,40 C 60,30 90,55 130,60 C 170,65 190,95 230,85 C 260,78 280,55 305,40" fill="none" stroke="#c23a4a" stroke-width="3.5" stroke-linecap="round" filter="url(#softGlow)"/>
          <path d="M 15,40 C 70,55 140,80 200,95 C 240,104 270,112 305,118" fill="none" stroke="#243d30" stroke-width="3.5" stroke-linecap="round" filter="url(#softGlow)"/>
          <text x="290" y="36" font-size="18">&#128544;</text>
          <text x="290" y="128" font-size="18">&#128522;</text>
        </svg>
        <div class="chart-pill" style="left:38%; top:8%; background:#f7e6e8; color:#8a2e3b;">No hay actividad</div>
        <div class="chart-pill" style="left:30%; top:58%; background:#e9efe6; color:#243d30;">Plan de caminata</div>
      </div>
      <div class="chart-axis-labels"><span>Hoy</span><span>Despu&eacute;s de 2 semanas</span></div>
    </div>`;
}
