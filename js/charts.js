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

/* Static circular badge with a walking-person icon — sits mid-curve,
   matching the competitor's exact "first results" walker marker. */
function walkerBadge(cx, cy) {
  return `
    <circle cx="${cx}" cy="${cy}" r="12" fill="#dcefe1"/>
    <text x="${cx}" y="${cy + 4.5}" font-size="13" text-anchor="middle">&#128694;</text>`;
}

// A) PREDICTION CHART — matches competitor reference: no area fill, walker
// badge sits a bit into the curve (not at x=0), "Reduce risk (Xkg)" headline
// inside the card, light-green Goal callout, explanatory stat box below.
function chartPrediction(startLabel, goalLabel, axisStart, axisEnd, note, source) {
  const startNum = parseNum(startLabel), goalNum = parseNum(goalLabel), unit = parseUnit(goalLabel) || parseUnit(startLabel);
  const toGo = (startNum != null && goalNum != null) ? Math.abs(Math.round((startNum - goalNum) * 10) / 10) : null;
  const pct = (startNum && toGo != null) ? Math.round((toGo / startNum) * 100) : null;
  return `
    <div class="chart-card">
      <div class="chart-top-row">
        <div class="chart-top-label"><span class="chart-top-value">${startLabel}</span></div>
        ${toGo != null ? `<div class="chart-risk-headline">Decrease risk (${toGo}${unit})</div>` : ""}
      </div>
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <path d="M 15,30 C 70,35 90,70 150,90 C 200,108 240,118 305,122" fill="none" stroke="#5fae74" stroke-width="4" stroke-linecap="round" filter="url(#lineShadow)"/>
          <circle cx="15" cy="30" r="4" fill="#3a9a55"/>
          ${walkerBadge(75, 47)}
          <circle cx="305" cy="122" r="6" fill="#3a9a55"/>
        </svg>
        <div class="chart-callout chart-callout-green" style="left:95%; top:65%;">
          <span class="chart-callout-label">Goal</span>
          <span class="chart-callout-value">${goalLabel}</span>
        </div>
      </div>
      <div class="chart-axis-labels"><span>${axisStart}</span><span>${axisEnd}</span></div>
      ${toGo != null ? `
      <div class="chart-stat-box">
        <span class="chart-stat-box-icon">&#129518;</span>
        <div>
          <p class="chart-stat-box-title">You only have to lose ${toGo}${unit}</p>
          <p class="chart-stat-box-body">${pct != null ? `That's about ${pct}% of your body weight. ` : ""}${note || ""}</p>
          ${source ? `<p class="chart-stat-box-source">${source}</p>` : ""}
        </div>
      </div>` : ""}
    </div>`;
}

// B) GOALS PAGE CHART — light shaded band (kept, distinct from Prediction)
// + pink dashed comparator + light-green Goal callout, matching reference.
function chartGoals(currentWeight, goalWeight, unit, axisStart, axisEnd) {
  const toGo = Math.abs(Math.round((currentWeight - goalWeight) * 10) / 10);
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <path d="M 15,28 C 90,18 180,15 305,28" fill="none" stroke="#b8923f" stroke-width="1.5" stroke-dasharray="3,5" opacity="0.5"/>
          <path d="M 15,30 C 80,55 150,85 220,100 C 260,108 285,112 305,113 L 305,130 L 15,130 Z" fill="url(#areaFade)"/>
          <path d="M 15,30 C 80,55 150,85 220,100 C 260,108 285,112 305,113" fill="none" stroke="#243d30" stroke-width="3.5" stroke-linecap="round" filter="url(#lineShadow)"/>
          <circle cx="15" cy="30" r="4" fill="#161f1a"/>
          <circle cx="305" cy="113" r="5.5" fill="#161f1a"/>
        </svg>
        <div class="chart-bubble" style="left:4%; top:6%;">Ahora ${currentWeight}${unit}</div>
        <div class="chart-bubble" style="left:64%; top:54%;">Objetivo: ${goalWeight}${unit}</div>
      </div>
      <div class="chart-axis-labels"><span>${axisStart}</span><span>${axisEnd}</span></div>
    </div>`;
}

// C) ELIGIBILITY CHART — two-tone filled area (orange -> green), matching the
// competitor's high-impact reference exactly: solid color blocks under the
// curve, not just a stroke line.
function chartEligibility() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap" style="height:170px;">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          <defs>
            <linearGradient id="eligOrangeFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#e8965a" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="#e8965a" stop-opacity="0.05"/>
            </linearGradient>
            <linearGradient id="eligGreenFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3aa66b" stop-opacity="0.75"/>
              <stop offset="100%" stop-color="#3aa66b" stop-opacity="0.05"/>
            </linearGradient>
            <filter id="lineShadow2" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#161f1a" flood-opacity="0.16"/>
            </filter>
          </defs>
          <path d="M 10,25 C 60,28 90,45 110,55 L 110,140 L 10,140 Z" fill="url(#eligOrangeFade)"/>
          <path d="M 110,55 C 160,78 220,100 310,112 L 310,140 L 110,140 Z" fill="url(#eligGreenFade)"/>
          <path d="M 10,25 C 60,28 90,45 110,55" fill="none" stroke="#d97a3c" stroke-width="3.5" stroke-linecap="round" filter="url(#lineShadow2)"/>
          <path d="M 110,55 C 160,78 220,100 310,112" fill="none" stroke="#2f6b48" stroke-width="3.5" stroke-linecap="round" filter="url(#lineShadow2)"/>
          <line x1="110" y1="55" x2="110" y2="140" stroke="#fff" stroke-width="1.5" stroke-dasharray="3,3" opacity="0.7"/>
          <circle cx="110" cy="55" r="5" fill="#faf7f0" stroke="#d97a3c" stroke-width="3"/>
        </svg>
        <div class="chart-callout" style="left:34%; top:37%; transform: translate(-50%, -150%);">
          <span class="chart-callout-label">&#128640; First results</span>
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
