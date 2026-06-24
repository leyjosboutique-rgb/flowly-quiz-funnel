/* ===================================================================
   CHART COMPONENTS v4 — personalized & premium:
   pulsing "today" marker, prominent "to-go" stat, connected callouts.
=================================================================== */

const CHART_DEFS = `
  <defs>
    <linearGradient id="areaFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#243d30" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#243d30" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="goldFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b8923f" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#b8923f" stop-opacity="0"/>
    </linearGradient>
    <filter id="lineShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#161f1a" flood-opacity="0.16"/>
    </filter>
    <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="3.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;

function splitLeadWord(label) {
  const i = label.indexOf(' ');
  if (i === -1) return { lead: '', rest: label };
  return { lead: label.slice(0, i), rest: label.slice(i + 1) };
}

function parseNum(label) { const m = String(label).match(/[\d.]+/); return m ? parseFloat(m[0]) : null; }
function parseUnit(label) { const m = String(label).match(/[a-zA-Z%]+$/); return m ? m[0] : ''; }

/* Pulsing "TODAY" marker — used to anchor the personalization trigger on the start point */
function todayMarker(cx, cy) {
  return `
    <circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="#b8923f" stroke-width="2" opacity="0.55" class="chart-pulse-ring"/>
    <circle cx="${cx}" cy="${cy}" r="6.5" fill="#faf7f0" stroke="#b8923f" stroke-width="3"/>`;
}

// A) PREDICTION CHART — pulsing "today" start, connected goal callout, prominent "to-go" stat
function chartPrediction(startLabel, goalLabel, axisStart, axisEnd) {
  const startNum = parseNum(startLabel), goalNum = parseNum(goalLabel), unit = parseUnit(goalLabel) || parseUnit(startLabel);
  const toGo = (startNum != null && goalNum != null) ? Math.abs(Math.round((startNum - goalNum) * 10) / 10) : null;
  return `
    <div class="chart-card">
      <div class="chart-header-row">
        <div class="chart-top-label">
          <span class="chart-top-caption">Today</span>
          <span class="chart-top-value">${startLabel.replace(/^Now\s*/i, '')}${unit && !/[a-zA-Z%]/.test(startLabel) ? unit : ''}</span>
        </div>
        ${toGo != null ? `<div class="chart-stat-badge"><span class="chart-stat-num">&minus;${toGo}${unit}</span><span class="chart-stat-label">to go</span></div>` : ""}
      </div>
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <path d="M 15,30 C 70,35 90,70 150,90 C 200,108 240,118 305,122 L 305,135 L 15,135 Z" fill="url(#areaFade)"/>
          <path d="M 15,30 C 70,35 90,70 150,90 C 200,108 240,118 305,122" fill="none" stroke="#243d30" stroke-width="3.5" stroke-linecap="round" filter="url(#lineShadow)"/>
          <line x1="305" y1="122" x2="305" y2="98" stroke="#b8923f" stroke-width="1.5" stroke-dasharray="2,3" opacity="0.7"/>
          ${todayMarker(15, 30)}
          <circle cx="305" cy="122" r="6" fill="#243d30" filter="url(#dotGlow)"/>
        </svg>
        <div class="chart-callout" style="left:95%; top:65%;">
          <span class="chart-callout-label">Goal</span>
          <span class="chart-callout-value">${goalLabel}</span>
        </div>
      </div>
      <div class="chart-axis-labels"><span>${axisStart}</span><span>${axisEnd}</span></div>
    </div>`;
}

// B) GOALS PAGE CHART — pulsing "today" start + gold goal dot, dashed "stay the course" reference, to-go stat
function chartGoals(currentWeight, goalWeight, unit, axisStart, axisEnd) {
  const toGo = Math.abs(Math.round((currentWeight - goalWeight) * 10) / 10);
  return `
    <div class="chart-card">
      <div class="chart-header-row">
        <div class="chart-top-label">
          <span class="chart-top-caption">Today</span>
          <span class="chart-top-value">${currentWeight}${unit}</span>
        </div>
        <div class="chart-stat-badge"><span class="chart-stat-num">&minus;${toGo}${unit}</span><span class="chart-stat-label">to go</span></div>
      </div>
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <path d="M 15,28 C 90,18 180,15 305,28" fill="none" stroke="#b8923f" stroke-width="1.5" stroke-dasharray="3,5" opacity="0.5"/>
          <path d="M 15,30 C 80,55 150,85 220,100 C 260,108 285,112 305,113 L 305,130 L 15,130 Z" fill="url(#areaFade)"/>
          <path d="M 15,30 C 80,55 150,85 220,100 C 260,108 285,112 305,113" fill="none" stroke="#243d30" stroke-width="3.5" stroke-linecap="round" filter="url(#lineShadow)"/>
          <line x1="305" y1="113" x2="305" y2="90" stroke="#b8923f" stroke-width="1.5" stroke-dasharray="2,3" opacity="0.7"/>
          ${todayMarker(15, 30)}
          <circle cx="305" cy="113" r="6" fill="#b8923f" filter="url(#dotGlow)"/>
        </svg>
        <div class="chart-callout" style="left:95%; top:58%;">
          <span class="chart-callout-label">Goal</span>
          <span class="chart-callout-value">${goalWeight}${unit}</span>
        </div>
      </div>
      <div class="chart-axis-labels"><span>${axisStart}</span><span>${axisEnd}</span></div>
    </div>`;
}

// C) ELIGIBILITY CHART — single-tone curve, pulsing "first results" marker tied to the user's own timeline
function chartEligibility() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap" style="height:170px;">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <path d="M 10,25 C 60,28 90,45 110,55 C 160,78 220,100 310,112" fill="none" stroke="#243d30" stroke-width="3.5" stroke-linecap="round" filter="url(#lineShadow)"/>
          ${todayMarker(110, 55)}
        </svg>
        <div class="chart-callout" style="left:34%; top:37%; transform: translate(-50%, -150%);">
          <span class="chart-callout-label">&#9889; Your first results</span>
        </div>
      </div>
      <div class="chart-axis-labels" style="justify-content:space-between;"><span>1 week</span><span>4 weeks</span><span>12 weeks</span></div>
    </div>`;
}

// D) STRESS CHART — two clean diverging lines, personalized legend framing
function chartStress() {
  return `
    <div class="chart-card">
      <div class="chart-legend">
        <span class="chart-legend-item"><span class="chart-legend-dot" style="background:#243d30;"></span>Your cortisol</span>
        <span class="chart-legend-item"><span class="chart-legend-dot" style="background:#b8923f;"></span>Your serotonin</span>
      </div>
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <line x1="20" y1="135" x2="310" y2="135" stroke="#e1ddd0" stroke-width="1.5"/>
          <path d="M 25,90 L 70,75 L 120,60 L 170,45 L 220,35 L 270,28 L 305,22" fill="none" stroke="#243d30" stroke-width="3" stroke-linecap="round" filter="url(#lineShadow)"/>
          <path d="M 25,55 L 70,68 L 120,80 L 170,95 L 220,108 L 270,118 L 305,125" fill="none" stroke="#b8923f" stroke-width="3" stroke-linecap="round" filter="url(#lineShadow)"/>
          <circle cx="305" cy="22" r="5" fill="#243d30" filter="url(#dotGlow)"/>
          <circle cx="305" cy="125" r="5" fill="#b8923f" filter="url(#dotGlow)"/>
        </svg>
      </div>
      <div class="chart-axis-labels"><span>0min</span><span>5min</span><span>10min</span><span>15min</span><span>20min</span><span>25min</span></div>
    </div>`;
}

// E) CALM CHART — "Hoy" -> "Despu&eacute;s de 2 semanas", personalized pill labels + today marker
function chartCalm() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap" style="height:170px;">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <path d="M 15,40 C 60,30 90,55 130,60 C 170,65 190,95 230,85 C 260,78 280,55 305,40" fill="none" stroke="#c23a4a" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
          <path d="M 15,40 C 70,55 140,80 200,95 C 240,104 270,112 305,118" fill="none" stroke="#243d30" stroke-width="3.5" stroke-linecap="round" filter="url(#lineShadow)"/>
          ${todayMarker(15, 40)}
        </svg>
        <div class="chart-pill" style="left:38%; top:8%; background:#f7e6e8; color:#8a2e3b;">Sin Flowly</div>
        <div class="chart-pill" style="left:30%; top:58%; background:#e9efe6; color:#243d30;">Con tu plan</div>
      </div>
      <div class="chart-axis-labels"><span>Hoy</span><span>Despu&eacute;s de 2 semanas</span></div>
    </div>`;
}
