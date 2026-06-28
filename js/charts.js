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
function chartPrediction(startLabel, goalLabel, axisStart, axisEnd, note, source, simple) {
  const startNum = parseNum(startLabel), goalNum = parseNum(goalLabel), unit = parseUnit(goalLabel) || parseUnit(startLabel);
  const toGo = (startNum != null && goalNum != null) ? Math.abs(Math.round((startNum - goalNum) * 10) / 10) : null;
  const pct = (startNum && toGo != null) ? Math.round((toGo / startNum) * 100) : null;
  const gridlines = simple
    ? [75, 140, 205, 270].map(x => `<line x1="${x}" y1="15" x2="${x}" y2="140" stroke="#e1ddd0" stroke-width="1"/>`).join("")
    : "";
  return `
    <div class="chart-card">
      <div class="chart-top-row">
        <div class="chart-top-label"><span class="chart-top-value">${startLabel}</span></div>
        ${(!simple && toGo != null) ? `<div class="chart-risk-headline">Decrease risk (${toGo}${unit})</div>` : ""}
      </div>
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          ${gridlines}
          <path d="M 15,30 C 70,35 90,70 150,90 C 200,108 240,118 305,122" fill="none" stroke="#5fae74" stroke-width="4" stroke-linecap="round" filter="url(#lineShadow)"/>
          <circle cx="15" cy="30" r="${simple ? 6 : 4}" fill="#3a9a55"/>
          ${simple ? "" : walkerBadge(75, 47)}
          <circle cx="305" cy="122" r="6" fill="#3a9a55"/>
        </svg>
        <div class="chart-callout chart-callout-green${simple ? " chart-callout-arrow" : ""}" style="left:95%; top:65%;">
          <span class="chart-callout-label">Goal</span>
          <span class="chart-callout-value">${goalLabel}</span>
        </div>
      </div>
      <div class="chart-axis-labels"><span>${axisStart}</span><span>${axisEnd}</span></div>
      ${simple ? (source ? `<p class="chart-stat-box-source" style="margin-top:10px;">${source}</p>` : "") : ""}
      ${(!simple && toGo != null) ? `
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
          <line x1="110" y1="55" x2="150" y2="26" stroke="#d97a3c" stroke-width="1.5"/>
          <circle cx="110" cy="55" r="5" fill="#faf7f0" stroke="#d97a3c" stroke-width="3"/>
        </svg>
        <div class="chart-callout-plain" style="left:47%; top:17%;">
          <span>&#128640; <b>First results</b></span>
        </div>
      </div>
      <div class="chart-axis-labels" style="justify-content:space-between;"><span>1 week</span><span>4 weeks</span><span>12 weeks</span></div>
    </div>`;
}

// D) STRESS CHART — cortisol rising (danger) vs serotonin falling, with
// shaded danger zone + quantified change badges so the problem reads
// instantly instead of just two abstract lines.
function chartStress() {
  return `
    <div class="chart-card">
      <div class="chart-legend">
        <span class="chart-legend-item"><span class="chart-legend-dot" style="background:#c23a4a;"></span>Your cortisol</span>
        <span class="chart-legend-item"><span class="chart-legend-dot" style="background:#3a6fa8;"></span>Your serotonin</span>
      </div>
      <div class="chart-svg-wrap">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <defs>
            <linearGradient id="dangerFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#c23a4a" stop-opacity="0.16"/>
              <stop offset="100%" stop-color="#c23a4a" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path d="M 220,0 L 320,0 L 320,150 L 220,150 Z" fill="url(#dangerFade)"/>
          <line x1="20" y1="135" x2="310" y2="135" stroke="#e1ddd0" stroke-width="1.5"/>
          <path d="M 25,90 L 70,75 L 120,60 L 170,45 L 220,35 L 270,28 L 305,22" fill="none" stroke="#c23a4a" stroke-width="3.5" stroke-linecap="round" filter="url(#lineShadow)"/>
          <path d="M 25,55 L 70,68 L 120,80 L 170,95 L 220,108 L 270,118 L 305,125" fill="none" stroke="#3a6fa8" stroke-width="3.5" stroke-linecap="round" filter="url(#lineShadow)"/>
          <circle cx="305" cy="22" r="5.5" fill="#c23a4a" filter="url(#dotGlow)"/>
          <circle cx="305" cy="125" r="5.5" fill="#3a6fa8" filter="url(#dotGlow)"/>
        </svg>
        <div class="chart-callout" style="left:78%; top:2%; border-color:#c23a4a;">
          <span class="chart-callout-value" style="color:#c23a4a;">&#9650; 65%</span>
        </div>
        <div class="chart-callout" style="left:78%; top:68%; border-color:#3a6fa8;">
          <span class="chart-callout-value" style="color:#3a6fa8;">&#9660; 38%</span>
        </div>
      </div>
      <div class="chart-axis-labels"><span>0min</span><span>5min</span><span>10min</span><span>15min</span><span>20min</span><span>25min</span></div>
    </div>`;
}

// E) CALM CHART — matches competitor reference exactly: jagged dramatic
// lines, glowing reaction emoji at each line's end, solid/outline label
// boxes instead of soft pills.
function chartCalm() {
  return `
    <div class="chart-card">
      <div class="chart-svg-wrap" style="height:170px;">
        <svg viewBox="0 0 320 150" width="100%" height="150" preserveAspectRatio="none">
          ${CHART_DEFS}
          <line x1="10" y1="20" x2="10" y2="135" stroke="#c9c4b4" stroke-width="1"/>
          <line x1="10" y1="135" x2="305" y2="135" stroke="#c9c4b4" stroke-width="1"/>
          <line x1="80" y1="20" x2="80" y2="135" stroke="#e1ddd0" stroke-width="1" stroke-dasharray="2,4"/>
          <line x1="150" y1="20" x2="150" y2="135" stroke="#e1ddd0" stroke-width="1" stroke-dasharray="2,4"/>
          <line x1="220" y1="20" x2="220" y2="135" stroke="#e1ddd0" stroke-width="1" stroke-dasharray="2,4"/>
          <line x1="10" y1="78" x2="305" y2="78" stroke="#e1ddd0" stroke-width="1" stroke-dasharray="2,4"/>
          <path d="M 15,25 L 70,38 L 125,32 L 180,62 L 225,42 L 300,22" fill="none" stroke="#e0473f" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#lineShadow)"/>
          <path d="M 15,28 L 70,52 L 125,75 L 180,98 L 235,118 L 300,130" fill="none" stroke="#5b62e0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#lineShadow)"/>
        </svg>
        <div class="chart-label-box warn" style="left:42%; top:18%;">No activity</div>
        <div class="chart-label-box solid" style="left:38%; top:63%;">Walking plan</div>
        <div class="chart-emoji-badge warn" style="left:94%; top:8%;">&#128548;</div>
        <div class="chart-emoji-badge calm" style="left:94%; top:80%;">&#128522;</div>
      </div>
      <div class="chart-axis-labels"><span>Today</span><span>After 2 weeks</span></div>
    </div>`;
}
