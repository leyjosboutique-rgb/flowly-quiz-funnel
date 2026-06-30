/* ===================================================================
   APP ENGINE v2 — Flowly quiz funnel clone
=================================================================== */

const state = {
  index: 0,
  answers: {},
  currentMultiSelection: [],
  goalWeight: 68,
  currentWeight: 80,
  heightCm: 163,
  unitHeight: "ft",
  unitWeight: "lb",
  selectedPlan: "4week",
  name: "",
};

const app = document.getElementById("app");
const progressLabel = document.getElementById("progress-label");
const progressBar = document.getElementById("progress-bar");
const backBtn = document.getElementById("back-btn");

function fmtDate(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}
function fmtDateEs(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  return `${d.getDate()} De ${months[d.getMonth()]}`;
}

/* currentWeight/goalWeight are always stored normalized in kg — convert
   back to the person's chosen display unit (lb/kg) here, once, so every
   screen that shows weight stays consistent with their actual answer. */
function displayWeight(kg) {
  return state.unitWeight === "kg" ? kg : Math.round(kg / 0.4536);
}
function weightUnitLabel() {
  return state.unitWeight === "kg" ? "kg" : "lb";
}

function interpolate(str) {
  if (!str) return str;
  return str
    .replace(/{{goalWeight}}/g, `<b>${displayWeight(state.goalWeight)}${weightUnitLabel()}</b>`)
    .replace(/{{currentWeight}}/g, displayWeight(state.currentWeight) + weightUnitLabel())
    .replace(/{{date90}}/g, fmtDate(90))
    .replace(/{{date30}}/g, fmtDate(30));
}

function next() {
  if (state.index < STEPS.length - 1) { state.index++; render(); }
}
function back() {
  if (state.index > 0) { state.index--; render(); }
}
function setAnswer(stepId, value) { state.answers[stepId] = value; }

/* ---------------- HEADER / PROGRESS ---------------- */
function updateHeader(step) {
  backBtn.classList.toggle("hidden", state.index === 0 || ["checkout","upsell","welcome","milestone1","milestone2","milestone3","letsgo"].includes(step.id));
  if (step.section && typeof step.progress === "number") {
    progressLabel.classList.remove("hidden");
    progressBar.classList.remove("hidden");
    progressLabel.textContent = step.section;
    document.getElementById("progress-bar-fill").style.width = Math.round(step.progress * 100) + "%";
  } else {
    progressLabel.classList.add("hidden");
    progressBar.classList.add("hidden");
  }
}

/* ---------------- RENDER DISPATCH ---------------- */
function render() {
  const step = STEPS[state.index];
  updateHeader(step);
  window.scrollTo(0, 0);
  if (typeof trackStep === "function") trackStep(step);
  const renderers = {
    "age-select": renderAgeSelect,
    "single": renderChoice,
    "multi": renderChoice,
    "photo-grid": renderPhotoGrid,
    "like-dislike": renderLikeDislike,
    "number-input": renderNumberInput,
    "transition": renderTransition,
    "transition-image": renderTransitionImage,
    "loading-single": renderLoadingSingle,
    "prediction": renderPrediction,
    "before-after-quote": renderBeforeAfterQuote,
    "eligibility": renderEligibility,
    "loading-multi": renderLoadingMulti,
    "email-capture": renderEmailCapture,
    "name-capture": renderNameCapture,
    "goals": renderGoals,
    "milestone": renderMilestone,
    "letsgo": renderLetsGo,
    "loading-redirect": renderLoadingRedirect,
    "checkout": renderCheckout,
    "upsell": renderUpsell,
    "thankyou": renderThankYou,
  };
  app.innerHTML = "";
  (renderers[step.type] || renderUnknown)(step);
}
function renderUnknown(step) { app.innerHTML = `<p>Unknown step: ${step.type}</p>`; }

/* ---------------- AGE SELECT ---------------- */
function renderAgeSelect(step) {
  app.innerHTML = `
    <div class="step">
      <div class="gift-banner-big">${giftBoxSvg()}<span>${step.banner.replace("&#127873; ", "")}</span></div>
      <h1 class="step-title">${step.title}</h1>
      <p class="step-subtitle">${step.subtitle}</p>
      <div class="title-divider"></div>
      <div class="photo-grid">
        ${step.cards.map(c => `
          <div class="photo-option avatar-style" data-v="${c.value}">
            ${renderPlaceholder(c.img, { shape: "arch", zoom: 1.0, position: "center top", w: 300, h: 300 })}
            <div class="ph-label">${c.label}</div>
          </div>`).join("")}
      </div>
      <p style="text-align:center;"><a href="#" id="catchall-link" style="color:var(--text-dark); font-weight:700; text-decoration:none;">${step.catchAll} &rsaquo;</a></p>
      <p class="fine-print">${step.legal}</p>
    </div>`;
  app.querySelectorAll(".photo-option").forEach(el => {
    el.addEventListener("click", () => { setAnswer("age", el.dataset.v); next(); });
  });
  document.getElementById("catchall-link").addEventListener("click", e => {
    e.preventDefault(); setAnswer("age", "18-39"); next();
  });
}

/* ---------------- OPTION ICON HELPER ---------------- */
function optionIconHtml(o) {
  if (o.img) {
    const useContain = o.img.startsWith("IMG-Q5");
    return renderPlaceholder(o.img, { w: 70, h: 70, noCenter: true, contain: useContain });
  }
  if (o.emoji) return `<span class="option-icon-emoji-lg">${o.emoji}</span>`;
  return "";
}

/* ---------------- SINGLE / MULTI CHOICE ---------------- */
function renderChoice(step) {
  const isMulti = step.type === "multi";
  state.currentMultiSelection = [];
  const isBinary = !!step.binary;
  app.innerHTML = `
    <div class="step">
      ${step.illustration ? `<div class="step-image-wrap illustration-wrap" style="margin:0 auto 14px;">${renderPlaceholder(step.illustration, { natural: true })}</div>` : ""}
      <h1 class="step-title">${interpolate(step.title)}</h1>
      ${step.subtitle ? `<p class="step-subtitle">${step.subtitle}</p>` : (isMulti ? `<p class="step-subtitle">Choose all that apply</p>` : "")}
      <div class="options-list">
        ${step.options.map(o => `
          <div class="option-card ${isMulti ? "" : "radio"} ${isBinary ? "binary" : ""}" data-v="${o.v}">
            ${isBinary
              ? `<span class="bignav-icon">${o.v === "yes" ? "&#10003;&#65039;" : (o.v === "no" ? "&#10060;" : "")}</span>`
              : optionIconHtml(o)}
            <span>${o.l}</span>
            ${isBinary ? "" : `<span class="option-check">&#10003;</span>`}
          </div>`).join("")}
      </div>
      ${isMulti ? `<button class="continue-btn" id="continue-btn" disabled>Continue</button>` : ""}
    </div>`;

  const cards = app.querySelectorAll(".option-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (isMulti) {
        card.classList.toggle("selected");
        const v = card.dataset.v;
        const sel = state.currentMultiSelection;
        const i = sel.indexOf(v);
        if (i >= 0) sel.splice(i, 1); else sel.push(v);
        document.getElementById("continue-btn").disabled = sel.length === 0;
      } else {
        cards.forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        setAnswer(step.id, card.dataset.v);
        if (step.bottomSheet) { showBottomSheet(step.bottomSheet); return; }
        setTimeout(next, 280);
      }
    });
  });
  if (isMulti) {
    document.getElementById("continue-btn").addEventListener("click", () => {
      setAnswer(step.id, [...state.currentMultiSelection]); next();
    });
  }
}

/* ---------------- BOTTOM SHEET (Q17 safety note) ---------------- */
function showBottomSheet(content) {
  const overlay = document.createElement("div");
  overlay.className = "sheet-overlay";
  overlay.innerHTML = `
    <div class="sheet-card">
      <h3>${content.title}</h3>
      <p>${content.body}</p>
      <button class="continue-btn" id="sheet-continue-btn">Continue</button>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById("sheet-continue-btn").addEventListener("click", () => { overlay.remove(); next(); });
}

/* ---------------- PHOTO GRID (Q3/Q4) ---------------- */
function renderPhotoGrid(step) {
  app.innerHTML = `
    <div class="step">
      <h1 class="step-title">${step.title}</h1>
      <div class="photo-grid">
        ${step.options.map(o => `
          <div class="photo-option" data-v="${o.v}">
            ${renderPlaceholder(o.img)}
            <div class="ph-label">${o.l}</div>
          </div>`).join("")}
      </div>
    </div>`;
  app.querySelectorAll(".photo-option").forEach(el => {
    el.addEventListener("click", () => { setAnswer(step.id, el.dataset.v); next(); });
  });
}

/* ---------------- LIKE / DISLIKE (Q20-23) ---------------- */
function renderLikeDislike(step) {
  app.innerHTML = `
    <div class="step">
      <h1 class="step-title">${step.title}</h1>
      <div class="like-dislike-photo">
        ${renderPlaceholder(step.img, { w: 560, h: 300, natural: true })}
        <div class="ld-caption">${step.caption}</div>
      </div>
      <div class="like-dislike-row">
        <div class="ld-option" data-v="dislike"><span class="ld-emoji">&#128078;</span><span class="ld-label">Dislike</span></div>
        <div class="ld-option" data-v="neutral"><span class="ld-emoji">&#129300;</span><span class="ld-label">Neutral</span></div>
        <div class="ld-option" data-v="like"><span class="ld-emoji">&#128077;</span><span class="ld-label">Like</span></div>
      </div>
    </div>`;
  app.querySelectorAll(".ld-option").forEach(el => {
    el.addEventListener("click", () => {
      el.classList.add("selected");
      setAnswer(step.id, el.dataset.v);
      setTimeout(next, 280);
    });
  });
}

/* ---------------- NUMBER INPUT (+ BMI / realistic-goal boxes) ---------------- */
function renderNumberInput(step) {
  let bmiTracked = false;
  app.innerHTML = `
    <div class="step">
      <h1 class="step-title">${step.title}</h1>
      ${step.subtitle ? `<p class="step-subtitle">${step.subtitle}</p>` : ""}
      <div class="unit-toggle">
        ${step.units.map(u => `<button class="unit-btn ${u === step.units[0] ? "active" : ""}" data-u="${u}">${u}</button>`).join("")}
      </div>
      <div class="input-row">
        <input type="number" class="text-input" id="num-input" placeholder="${step.placeholder}">
      </div>
      <p class="input-range-error hidden" id="range-error"></p>
      <div id="feedback-slot"></div>
      <button class="continue-btn" id="continue-btn" disabled>Continue</button>
    </div>`;
  const input = document.getElementById("num-input");
  const btn = document.getElementById("continue-btn");
  const rangeError = document.getElementById("range-error");
  let currentUnit = step.units[0];

  function currentRange() {
    return (step.ranges && step.ranges[currentUnit]) || null;
  }
  function applyRangeAttrs() {
    const r = currentRange();
    if (r) { input.min = r[0]; input.max = r[1]; } else { input.removeAttribute("min"); input.removeAttribute("max"); }
  }
  function validateRange(val) {
    const r = currentRange();
    if (!r || isNaN(val)) { rangeError.classList.add("hidden"); return true; }
    if (val < r[0] || val > r[1]) {
      rangeError.textContent = `Please enter a value between ${r[0]} and ${r[1]} ${currentUnit}.`;
      rangeError.classList.remove("hidden");
      return false;
    }
    rangeError.classList.add("hidden");
    return true;
  }

  function updateFeedback() {
    const val = parseFloat(input.value);
    const slot = document.getElementById("feedback-slot");
    const inRange = validateRange(val);
    if (!val || isNaN(val) || !inRange) { slot.innerHTML = ""; return; }
    if (step.bmiBox) {
      const kg = currentUnit === "kg" ? val : val * 0.4536;
      const heightM = state.heightCm / 100 || 1.63;
      const bmi = (kg / (heightM * heightM)).toFixed(1);
      let cat = "normal weight";
      if (bmi >= 30) cat = "obese"; else if (bmi >= 25) cat = "overweight"; else if (bmi < 18.5) cat = "underweight";
      if (typeof trackQuizEvent === "function" && !bmiTracked) { bmiTracked = true; trackQuizEvent("bmi", "bmi_calculated", { bmi_range: cat }); }
      slot.innerHTML = `
        <div class="feedback-box">
          <div class="fb-icon">&#129518;</div>
          <div>
            <p class="fb-title">Your BMI is ${bmi}, which is considered ${cat}.</p>
            <p class="fb-body">You've got some work ahead, but it's great that you're taking the first step. We'll use your BMI to build a personalized weight-loss program.</p>
          </div>
        </div>`;
    } else if (step.realisticGoalBox) {
      slot.innerHTML = `
        <div class="feedback-box">
          <div class="fb-icon">&#128202;</div>
          <div>
            <p class="fb-title">Realistic goal!</p>
            <p class="fb-body">Studies show that losing 5% or more of your body weight can significantly reduce the risk of heart attacks, high blood sugar, and high blood pressure.</p>
            <p class="fb-source">Source: American Heart Association (AHA)</p>
          </div>
        </div>`;
    }
  }

  applyRangeAttrs();
  input.addEventListener("input", () => {
    const val = parseFloat(input.value);
    btn.disabled = input.value.trim() === "" || !validateRange(val);
    updateFeedback();
  });
  app.querySelectorAll(".unit-btn").forEach(b => b.addEventListener("click", () => {
    app.querySelectorAll(".unit-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    currentUnit = b.dataset.u;
    applyRangeAttrs();
    const val = parseFloat(input.value);
    btn.disabled = input.value.trim() === "" || !validateRange(val);
    updateFeedback();
  }));
  btn.addEventListener("click", () => {
    const val = parseFloat(input.value);
    if (!validateRange(val)) return;
    setAnswer(step.id, val);
    if (step.id === "q6") state.heightCm = currentUnit === "cm" ? val : Math.round(val * 30.48);
    if (step.id === "q7") { state.currentWeight = Math.round(currentUnit === "kg" ? val : val * 0.4536); state.unitWeight = currentUnit; }
    if (step.id === "q8") { state.goalWeight = Math.round(currentUnit === "kg" ? val : val * 0.4536); state.unitWeight = currentUnit; }
    next();
  });
}

/* ---------------- TRANSITION (text only, may include a chart) ---------------- */
function renderTransition(step) {
  const chartHtml = step.chartType === "stress" ? chartStress() : (step.chartType === "calm" ? chartCalm() : "");
  if (step.img) {
    app.innerHTML = `
      <div class="step">
        <div class="transition-card">
          <div class="transition-card-img">${renderPlaceholder(step.img, { w: 560, h: 360, natural: true, noRadius: true })}</div>
          <div class="transition-card-body">
            <h1 class="step-title">${step.title}</h1>
            <div class="transition-body">${step.body}</div>
            ${step.source ? `<p class="transition-source">Source: ${step.source}</p>` : ""}
          </div>
        </div>
        <button class="continue-btn" id="continue-btn">Continue</button>
      </div>`;
    document.getElementById("continue-btn").addEventListener("click", next);
    return;
  }
  app.innerHTML = `
    <div class="step">
      ${chartHtml}
      <h1 class="step-title">${step.title}</h1>
      <div class="transition-body">${step.body}</div>
      ${step.source ? `<p class="transition-source">Source: ${step.source}</p>` : ""}
      <button class="continue-btn" id="continue-btn">Continue</button>
    </div>`;
  document.getElementById("continue-btn").addEventListener("click", next);
}

/* ---------------- TRANSITION WITH IMAGE ---------------- */
function renderTransitionImage(step) {
  app.innerHTML = `
    <div class="step">
      <div class="transition-card">
        <div class="transition-card-img">${renderPlaceholder(step.img, { w: 560, h: 360, natural: true, noRadius: true })}</div>
        <div class="transition-card-body" style="text-align:center;">
          <h1 class="step-title" style="text-align:center;">${step.title}</h1>
          <div class="transition-body" style="text-align:center;">${step.body}</div>
        </div>
      </div>
      <button class="continue-btn" id="continue-btn">Continue</button>
    </div>`;
  document.getElementById("continue-btn").addEventListener("click", next);
}

/* Animated gift box with bursting confetti — first-screen reciprocity hook */
function giftBoxSvg() {
  return `
    <span class="gift-box-wrap">
      <svg class="gift-box-svg" viewBox="0 0 48 48" width="40" height="40">
        <path d="M24 17 C18 7, 8 9, 13 17 Z" fill="#ffcc33"/>
        <path d="M24 17 C30 7, 40 9, 35 17 Z" fill="#ffcc33"/>
        <rect x="6" y="16" width="36" height="9" rx="2" fill="#ffcc33"/>
        <rect x="8" y="24" width="32" height="19" rx="3" fill="#e63950"/>
        <rect x="20.5" y="16" width="7" height="27" fill="#ffcc33"/>
      </svg>
      <span class="confetti-burst c1" style="color:#b8923f;">&#10022;</span>
      <span class="confetti-burst c2" style="color:#b8456b;">&#9733;</span>
      <span class="confetti-burst c3" style="color:#4f7a63;">&#10038;</span>
      <span class="confetti-burst c4" style="color:#c23a4a;">&#9670;</span>
      <span class="confetti-burst c5" style="color:#b8923f;">&#9733;</span>
    </span>`;
}

/* Stick figure climbing a staircase — animated progress metaphor (loading1) */
function stairClimberSvg() {
  return `
    <svg viewBox="0 0 140 100" width="140" height="100">
      <rect x="0" y="80" width="26" height="20" rx="1" fill="#e9efe6"/>
      <rect x="26" y="64" width="24" height="36" rx="1" fill="#e9efe6"/>
      <rect x="50" y="48" width="24" height="52" rx="1" fill="#e9efe6"/>
      <rect x="74" y="32" width="24" height="68" rx="1" fill="#e9efe6"/>
      <rect x="98" y="16" width="26" height="84" rx="1" fill="#e9efe6"/>
      <g class="climber">
        <circle cx="0" cy="-30" r="6.5" fill="#243d30"/>
        <line x1="0" y1="-23.5" x2="0" y2="-9" stroke="#243d30" stroke-width="3" stroke-linecap="round"/>
        <line x1="0" y1="-19" x2="-8" y2="-13" stroke="#243d30" stroke-width="3" stroke-linecap="round"/>
        <line x1="0" y1="-19" x2="9" y2="-24" stroke="#b8923f" stroke-width="3" stroke-linecap="round"/>
        <line x1="0" y1="-9" x2="-7" y2="2" stroke="#243d30" stroke-width="3" stroke-linecap="round"/>
        <line x1="0" y1="-9" x2="7" y2="0" stroke="#243d30" stroke-width="3" stroke-linecap="round"/>
      </g>
    </svg>`;
}

/* ---------------- LOADING SINGLE (animated shoes + wide bar) ---------------- */
function renderLoadingSingle(step) {
  app.innerHTML = `
    <div class="step" style="text-align:center;">
      <div class="walking-shoes-wrap">${stairClimberSvg()}</div>
      <p style="font-size:15px; font-weight:600; margin-bottom:24px;">${step.text}<br><span style="font-size:11px;font-weight:400;color:var(--text-muted);font-style:italic;">Source: ${step.source}</span></p>
      <div class="wide-progress-track"><div class="wide-progress-fill" id="loader-fill" style="width:6%;">0%</div></div>
    </div>`;
  let pct = 0;
  const fill = document.getElementById("loader-fill");
  const iv = setInterval(() => {
    pct += 2;
    const shown = Math.min(pct, 100);
    fill.style.width = shown + "%";
    fill.textContent = shown + "%";
    if (pct >= 100) { clearInterval(iv); setTimeout(next, 600); }
  }, 110);
}

/* ---------------- PREDICTION CHART (Prediction #1 / #2) ---------------- */
function renderPrediction(step) {
  const fromLabel = `${displayWeight(state.currentWeight)}${weightUnitLabel()}`;
  const toLabel = `${displayWeight(state.goalWeight)}${weightUnitLabel()}`;
  const chart = chartPrediction(fromLabel, toLabel, "Now", step.short ? fmtDate(30) : fmtDate(90), step.note, step.source, step.simple);
  const headline = step.subtitleDynamic
    ? `<p class="pred-small-title">${step.title}</p><p class="pred-predict-label">${step.predictLabel || ""}</p><h1 class="pred-result-line">${interpolate(step.subtitleDynamic)}</h1>`
    : `<h1 class="step-title">${interpolate(step.title)}</h1>`;
  app.innerHTML = `
    <div class="step">
      ${headline}
      ${chart}
      <button class="continue-btn" id="continue-btn">Continue</button>
    </div>`;
  document.getElementById("continue-btn").addEventListener("click", next);
}

/* ---------------- BEFORE/AFTER QUOTE ---------------- */
function renderBeforeAfterQuote(step) {
  const imgBlock = step.splitPhoto
    ? `<div class="before-after-row" style="margin:0; gap:0;">
        <div class="ba-col" style="flex:1; line-height:0;">${renderPlaceholder("IMG-19-before", { w: 280, h: 360, natural: true, noRadius: true })}</div>
        <div class="ba-col" style="flex:1; line-height:0; border-left:2px solid rgba(255,255,255,0.6);">${renderPlaceholder("IMG-19-after", { w: 280, h: 360, natural: true, noRadius: true })}</div>
      </div>`
    : renderPlaceholder(step.img, { w: 560, h: 360, natural: true, noRadius: true });
  app.innerHTML = `
    <div class="step">
      <div class="transition-card">
        <div class="transition-card-img">${imgBlock}</div>
        <div class="transition-card-body" style="text-align:center;">
          <h1 class="step-title" style="text-align:center;">&ldquo;${step.quote}&rdquo;</h1>
          <p class="step-subtitle">${step.body}</p>
        </div>
      </div>
      <button class="continue-btn" id="continue-btn">Continue</button>
    </div>`;
  document.getElementById("continue-btn").addEventListener("click", next);
}

/* ---------------- ELIGIBILITY (+ 3-phase chart) ---------------- */
function renderEligibility(step) {
  app.innerHTML = `
    <div class="step">
      <h1 class="step-title" style="color:var(--sage-dark); text-align:left; font-size:22px;">${step.title}</h1>
      <p class="step-subtitle" style="text-align:left; font-family:'Plus Jakarta Sans',sans-serif; font-weight:400; font-size:14px; color:var(--text-muted);">${step.body}</p>
      ${chartEligibility()}
      <p style="font-size:13px; display:flex; gap:10px; align-items:flex-start;"><span class="chart-stat-box-icon" style="font-size:16px;">&#128241;</span><span>${interpolate(step.note)}</span></p>
      <button class="continue-btn" id="continue-btn">Continue</button>
    </div>`;
  document.getElementById("continue-btn").addEventListener("click", next);
}

/* ---------------- LOADING MULTI (realistic pacing + confetti + testimonial) ---------------- */
function renderLoadingMulti(step) {
  app.innerHTML = `
    <div class="step">
      <h2 class="loading-title" id="loading-headline">${step.title}</h2>
      ${step.items.map((label, i) => `
        <div class="loading-item">
          <div class="loading-item-label"><span>${label}</span><span><span class="loading-spinner" id="spin-${i}"></span> <span id="pct-${i}">0%</span></span></div>
          <div class="progress-bar-track"><div class="progress-bar-track filled" id="fill-${i}" style="width:0%;"></div></div>
        </div>`).join("")}
      <div id="side-question" style="margin-top:20px;"></div>
      <p class="social-proof-line">${step.socialProof}</p>
      <div id="testimonial-slot"></div>
    </div>`;

  // slower, deliberate pacing so each step reads as real personalized
  // analysis happening, not an instant fake bar: ~4.2-6s per item.
  let totalDelay = 0;
  step.items.forEach((_, i) => {
    const duration = 4200 + i * 600;
    setTimeout(() => animateBar(i, duration), totalDelay);
    totalDelay += duration * 0.85;
  });

  function animateBar(i, duration) {
    const fill = document.getElementById(`fill-${i}`);
    const pctEl = document.getElementById(`pct-${i}`);
    const spin = document.getElementById(`spin-${i}`);
    const start = performance.now();
    function tick() {
      const elapsed = performance.now() - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      fill.style.width = pct + "%";
      pctEl.textContent = pct + "%";
      if (pct < 100) requestAnimationFrame(tick);
      else spin.style.display = "none";
    }
    tick();
  }

  // side micro-question appears early — spotlighted as a floating card,
  // dimming the rest of the screen (loading bars + testimonial) like the
  // competitor's modal-style focus treatment.
  const stepEl = document.querySelector(".step");
  setTimeout(() => {
    const sq = step.sideQuestion;
    stepEl.classList.add("spotlight-active");
    document.getElementById("side-question").innerHTML = `
      <div class="feature-box spotlight-card" style="background:var(--sage-light);">
        <p style="font-weight:700; margin-bottom:10px;">${sq.title}</p>
        <p style="font-size:14px; margin-bottom:10px;">${sq.question}</p>
        <div class="options-list" style="gap:8px;">
          ${sq.options.map(o => `<div class="option-card radio" style="padding:10px 14px;" data-v="${o.v}">${o.l}<span class="option-check">&#10003;</span></div>`).join("")}
        </div>
      </div>`;
    document.querySelectorAll("#side-question .option-card").forEach(c => {
      c.addEventListener("click", () => {
        c.classList.add("selected");
        setTimeout(() => {
          const sqEl = document.getElementById("side-question");
          sqEl.style.transition = "opacity .35s ease, max-height .35s ease";
          sqEl.style.opacity = "0";
          sqEl.style.maxHeight = sqEl.offsetHeight + "px";
          requestAnimationFrame(() => { sqEl.style.maxHeight = "0"; sqEl.style.marginTop = "0"; sqEl.style.overflow = "hidden"; });
          stepEl.classList.remove("spotlight-active");
          setTimeout(() => { sqEl.innerHTML = ""; }, 400);
        }, 500);
      });
    });
  }, 500);

  // testimonial card appears mid-loading, then rotates through the list
  let testimonialInterval;
  const testimonials = step.testimonials || (step.testimonial ? [step.testimonial] : []);
  let tIndex = 0;
  function renderTestimonial(idx, fadeIn) {
    const t = testimonials[idx];
    const slot = document.getElementById("testimonial-slot");
    if (!slot || !t) return;
    slot.innerHTML = `
      <div class="testimonial-card" style="opacity:${fadeIn ? 0 : 1}; transition:opacity .35s ease;">
        <div class="stars">${"&#9733;".repeat(t.stars)}</div>
        <p style="font-style:italic; font-size:14px;">&ldquo;${t.quote}&rdquo;</p>
        <p style="font-size:12px; color:var(--text-muted); margin:0;">${t.name}</p>
      </div>`;
    if (fadeIn) requestAnimationFrame(() => { const c = slot.querySelector(".testimonial-card"); if (c) c.style.opacity = "1"; });
  }
  setTimeout(() => {
    renderTestimonial(tIndex, false);
    if (testimonials.length > 1) {
      testimonialInterval = setInterval(() => {
        tIndex = (tIndex + 1) % testimonials.length;
        renderTestimonial(tIndex, true);
      }, 3400);
    }
  }, 1200);

  // completion: confetti + headline swap
  setTimeout(() => {
    clearInterval(testimonialInterval);
    document.getElementById("loading-headline").innerHTML = step.completeTitle;
    fireConfetti();
    setTimeout(next, 1600);
  }, totalDelay + 600);
}

function fireConfetti() {
  const wrap = document.getElementById("confetti-canvas-wrap");
  wrap.style.display = "block";
  const colors = ["#243d30", "#b8923f", "#b8456b", "#f3e8d0", "#4f7a63"];
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const size = 6 + Math.random() * 6;
    piece.style.width = size + "px";
    piece.style.height = (size * 0.4) + "px";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2 + Math.random() * 1.5) + "s";
    piece.style.animationDelay = (Math.random() * 0.4) + "s";
    wrap.appendChild(piece);
  }
  setTimeout(() => { wrap.innerHTML = ""; wrap.style.display = "none"; }, 4000);
}

/* ---------------- EMAIL CAPTURE ---------------- */
function renderEmailCapture(step) {
  app.innerHTML = `
    <div class="step" style="text-align:center;">
      <div class="discount-gift-banner" style="justify-content:center; background:var(--sage-light); color:var(--sage-dark);">&#10003; ${step.badge}</div>
      <h1 class="step-title">${step.title}</h1>
      <div class="input-row">
        <input type="email" class="text-input" id="email-input" placeholder="Your email address" style="text-align:center;">
      </div>
      <button class="continue-btn" id="continue-btn" disabled>${step.cta}</button>
      <p class="fine-print">By submitting your email address, you may also receive email offers from Flowly about our services. You may unsubscribe at any time.<br>Your use of Flowly is bound by the Terms of Use and Privacy Policy.</p>
    </div>`;
  const input = document.getElementById("email-input");
  const btn = document.getElementById("continue-btn");
  input.addEventListener("input", () => { btn.disabled = !input.value.includes("@"); });
  btn.addEventListener("click", () => { setAnswer("email", input.value); next(); });
}

/* ---------------- NAME CAPTURE ---------------- */
function renderNameCapture(step) {
  app.innerHTML = `
    <div class="step" style="text-align:center;">
      <h1 class="step-title">${step.title}</h1>
      <div class="input-row">
        <input type="text" class="text-input" id="name-input" placeholder="Your name" style="text-align:center;">
      </div>
      <button class="continue-btn" id="continue-btn" disabled>Continue</button>
    </div>`;
  const input = document.getElementById("name-input");
  const btn = document.getElementById("continue-btn");
  input.addEventListener("input", () => { btn.disabled = input.value.trim() === ""; });
  btn.addEventListener("click", () => { state.name = input.value.trim(); next(); });
}

/* ---------------- GOALS PAGE (+ shaded/comparator chart) ---------------- */
function renderGoals(step) {
  const name = state.name || "there";
  const unit = weightUnitLabel();
  const goalW = displayWeight(state.goalWeight);
  const currentW = displayWeight(state.currentWeight);
  app.innerHTML = `
    <div class="step">
      <h1 class="goal-headline">${name}, reach your goal of <span class="accent">${goalW}${unit} by</span> ${fmtDate(30)}</h1>
      <p class="step-subtitle" style="font-family:'Plus Jakarta Sans',sans-serif; font-weight:400; color:var(--text-muted); font-size:14px;">And build a body you feel good living in</p>
      ${chartGoals(currentW, goalW, unit, "Now", fmtDate(30))}
      <div class="feature-box">
        <div class="feature-line">&#127939; Slim down and tone up with gentle but effective workouts</div>
        <div class="feature-line">&#127968; Fat-burning workouts, no equipment needed</div>
        <div class="feature-line">&#127858; Customized nutrition suggestions for better results</div>
        <div class="feature-line">&#128172; 24/7 Personalized Wellness Assistant</div>
      </div>
      <button class="continue-btn" id="continue-btn">${step.cta}</button>
    </div>`;
  document.getElementById("continue-btn").addEventListener("click", next);
}

/* ---------------- MILESTONE ANTICIPATION SCREENS ---------------- */
function renderMilestone(step) {
  const days = step.week * 7;
  const dateStr = fmtDate(days);
  app.innerHTML = `
    <div class="milestone-screen milestone-screen-centered">
      <div class="milestone-text ${step.bold ? "bold" : ""}">By <span class="accent">${dateStr}</span>, ${step.suffix}</div>
    </div>`;
  setTimeout(next, 1800);
}

function renderLetsGo() {
  app.innerHTML = `<div class="milestone-screen"><div></div><div class="milestone-letsgo">Let's go! &#10024;</div></div>`;
  fireConfetti();
  setTimeout(next, 1400);
}

/* ---------------- LOADING REDIRECT (brief) ---------------- */
function renderLoadingRedirect() {
  app.innerHTML = `<div class="step" style="text-align:center; padding-top:80px;"><div class="loading-spinner" style="width:30px;height:30px;"></div></div>`;
  setTimeout(next, 900);
}

/* Map the user's actual Q3 (current body) / Q4 (dream body) answers to the
   matching real photos, so the checkout Before/After reflects THEIR choices. */
function beforeAfterImg(which) {
  const q3Map = { thin: "IMG-05a", mid: "IMG-05b", plump: "IMG-05c", plus: "IMG-05d" };
  const q4Map = { slim: "IMG-06a", toned: "IMG-06b", curvy: "IMG-06c", smaller: "IMG-06d" };
  if (which === "before") return q3Map[state.answers.q3] || "IMG-15-before";
  return q4Map[state.answers.q4] || "IMG-15-after";
}

/* Returns the age-matched, profile-varied transformation image ID for checkout. */
function getTransformationImageId() {
  const ageMap = {
    "40-49": ["RESULT-40-1", "RESULT-40-2", "RESULT-40-3"],
    "18-39": ["RESULT-40-1", "RESULT-40-2", "RESULT-40-3"],
    "50-59": ["RESULT-50-1", "RESULT-50-2", "RESULT-50-3"],
    "60-69": ["RESULT-60-1", "RESULT-60-2", "RESULT-60-3"],
    "70-80": ["RESULT-70-1"],
  };
  const age = state.answers.age || "50-59";
  const options = ageMap[age] || ageMap["50-59"];
  const bodyVals = ["thin", "mid", "plump", "plus"];
  const goalVals = ["slim", "toned", "curvy", "smaller"];
  const bodyIdx = Math.max(0, bodyVals.indexOf(state.answers.q3 || "mid"));
  const goalIdx = Math.max(0, goalVals.indexOf(state.answers.q4 || "toned"));
  return options[(bodyIdx + goalIdx) % options.length];
}

const HOTMART_LINKS = {
  "1week": "https://pay.hotmart.com/H106541452D?off=fqhbhw72&checkoutMode=10",
  "4week": "https://pay.hotmart.com/H106541452D?off=39t62s03&checkoutMode=10",
  "12week": "https://pay.hotmart.com/H106541452D?off=6mnsj6t6&checkoutMode=10",
};

function barSegments(filled) {
  return [1, 2, 3].map(i => `<span class="ba-bar-seg ${i <= filled ? (filled >= 3 ? "filled-high" : "filled-low") : ""}"></span>`).join("");
}

/* ---------------- CHECKOUT ---------------- */
let checkoutTimerInterval;
function renderCheckout() {
  state.selectedPlan = "4week";
  document.getElementById("sticky-timer-bar").classList.remove("hidden");
  startCheckoutTimer();

  const plans = [
    { id: "1week", label: "1-week plan", oldPrice: "$21.99", newPrice: "$9.00", perDay: "$1.29" },
    { id: "4week", label: "4-week plan", oldPrice: "$49.95", newPrice: "$15.00", perDay: "$0.54", badge: true },
    { id: "12week", label: "12-week plan", oldPrice: "$84.95", newPrice: "$25.00", perDay: "$0.30" },
  ];

  app.innerHTML = `
    <div class="step">

      <!-- 1. FEATURE BOX -->
      <div class="feature-box co-feature-box">
        <h3 style="text-align:center;margin-top:0;">Your plan includes</h3>
        <div class="co-feature-line">&#128221; Personalized Tai Chi walking workout plan</div>
        <div class="co-feature-line">&#128340; 7–15 minute low-impact daily routines</div>
        <div class="co-feature-line">&#129497; Beginner-friendly mobility &amp; balance exercises</div>
        <div class="co-feature-line">&#129534; Joint-friendly movement plan</div>
        <div class="co-feature-line">&#128202; Progress tracking</div>
        <div class="co-feature-line">&#128153; 24/7 support group available</div>
        <div class="co-feature-line">&#127858; Simple nutrition tips to support your results</div>
      </div>

      <!-- 2. BIG HEADLINE -->
      <h1 class="co-headline">Start feeling stronger, lighter and with greater mobility in 4 weeks.</h1>

      <!-- 3. INLINE TIMER (pink full-width) -->
      <div class="checkout-timer-bar">
        <span class="ctb-icon">&#9201;</span>
        <span class="ctb-label">This offer ends in</span>
        <strong class="ctb-time" id="checkout-timer">10:00</strong>
        <span class="ctb-label">min</span>
      </div>

      <!-- 4. PLAN OPTIONS -->
      <div id="price-options">
        ${plans.map(p => `
          <div class="price-option ${p.badge ? "has-badge" : ""} ${p.id === state.selectedPlan ? "selected" : ""}" data-id="${p.id}">
            ${p.badge ? `<div class="price-most-popular">&#128077; MOST POPULAR</div>` : ""}
            <div style="display:flex;align-items:center;gap:12px;">
              <div class="radio"></div>
              <div>
                <div style="font-weight:700;font-size:15px;">${p.label}</div>
                <div style="font-size:13px;margin-top:2px;"><span class="price-old">${p.oldPrice}</span><span class="price-new">${p.newPrice}</span></div>
              </div>
            </div>
            <div style="text-align:right;">
              <div class="price-per-day">${p.perDay}</div>
              <div class="price-per-day-label">per day</div>
            </div>
          </div>`).join("")}
      </div>

      <!-- 5. 12-WEEK NOTE -->
      <p class="co-note">&#128202; People using the plan for <b>12 weeks</b> achieve <b>double the results</b> as for 4 weeks.<br><span style="font-size:11px;color:var(--text-muted);">*According to a study by Flowly, 2024</span></p>

      <!-- 6. GUARANTEE LINK -->
      <p class="co-guarantee-link">&#128176; 30-DAY MONEY-BACK GUARANTEE</p>

      <!-- 7. PRIMARY CTA -->
      <button class="continue-btn co-cta-green" id="get-plan-btn">GET MY PLAN</button>
      <div class="trust-row" style="margin-top:10px;"><span>&#128274; No hidden fees</span><span>&#128274; Secure SSL</span><span>&#128274; Cancel Anytime</span></div>
      <p class="fine-print" id="fine-print-billing"></p>

      <!-- SOCIAL PROOF BELOW CTA -->
      <p style="text-align:center; font-size:12px; color:var(--text-muted); margin:18px 0 6px;">&#128101; Join <b>163,432+</b> women already on their plan</p>

      <h2 class="step-title" style="margin-top:28px;">Success stories</h2>
      <div class="testimonial-card">
        <div class="before-after-row">
          <div class="ba-col ba-photo-tagged">${renderPlaceholder("IMG-16-before", { w: 140, h: 200, zoom: 1.0, position: "top center" })}<span class="ba-photo-tag before">before</span></div>
          <div class="ba-col ba-photo-tagged">${renderPlaceholder("IMG-16-after", { w: 140, h: 200, zoom: 1.0, position: "top center" })}<span class="ba-photo-tag after">AFTER</span></div>
        </div>
        <div class="testimonial-name-row"><div><b>Martha S.</b><br><span style="font-size:12px;color:var(--text-muted);">Los Angeles, CA</span></div><div style="text-align:right;"><b>-40lbs</b><br><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div></div>
        <p style="font-size:14px; line-height:1.6;"><b>Tried:</b> strict diets and intense workouts for years &mdash; nothing stuck.<br><b>Changed:</b> switched to 15-min daily Tai Chi walking routines.<br><b>Result:</b> Lost 40 lbs, sleeps better, and feels calmer every day.</p>
      </div>
      <div class="testimonial-card">
        <div class="before-after-row">
          <div class="ba-col ba-photo-tagged">${renderPlaceholder("IMG-17-before", { w: 140, h: 200, contain: true })}<span class="ba-photo-tag before">before</span></div>
          <div class="ba-col ba-photo-tagged">${renderPlaceholder("IMG-17-after", { w: 140, h: 200, contain: true })}<span class="ba-photo-tag after">AFTER</span></div>
        </div>
        <div class="testimonial-name-row"><div><b>Suzy B.</b><br><span style="font-size:12px;color:var(--text-muted);">Seattle, WA</span></div><div style="text-align:right;"><b>-60lbs</b><br><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div></div>
        <p style="font-size:14px; line-height:1.6;"><b>Tried:</b> every weight-loss program she could find &mdash; none felt sustainable.<br><b>Changed:</b> started gentle, balanced Tai Chi movement every morning.<br><b>Result:</b> Lost 60 lbs, higher energy, and joint pain is gone.</p>
      </div>

      <h2 class="step-title">Customer reviews</h2>
      ${renderReview("IMG-18a", "Brenda Ross", "I never write reviews. NEVER! As a single mum, I struggled to find time for myself. Flowly made it easy to follow and helped me lose weight. You SAVED MY LIFE. I feel more confident, I'm loving myself again, and I feel unstoppable right now.")}
      ${renderReview("IMG-18b", "Sandra Jane", "No more stiff joints! With Flowly Tai Chi walking, I finally feel free. I believe I feel better than I did in my 20s. I know it sounds funny, but that's how I feel after losing those extra pounds!")}
      ${renderReview("IMG-18c", "AmeliaXC", "Tai Chi walking helped me lose 22lbs last month. I can't imagine stopping it. Not only did I lose weight, but my confidence is back. My friends say I've changed!")}

      <!-- SECOND CTA -->
      <button class="continue-btn co-cta-green" style="margin-top:28px;" id="submit-payment-btn">Start my transformation &#8594;</button>
      <div class="guarantee-box" style="margin-top:20px;">
        <div style="font-size:30px;">&#128176;</div>
        <div>
          <b>100% Money Back Guarantee</b>
          <p style="font-size:14px; line-height:1.5; margin:6px 0 0;">If you do not achieve visible results within the first 30 days, you are eligible for a full refund &mdash; no questions asked.</p>
        </div>
      </div>
      <p style="text-align:center;font-size:11px;color:var(--text-muted);margin-top:30px;">Copyright &copy; 2026 Flowly. All rights reserved.</p>
    </div>`;

  const billingMap = {
    "1week": { price: 9.00, renew: 29.90 },
    "4week": { price: 15.00, renew: 29.90 },
    "12week": { price: 25.00, renew: 29.90 },
  };
  function updateFinePrint(id) {
    const p = billingMap[id];
    const el = document.getElementById("fine-print-billing");
    if (el && p) el.textContent = `By purchasing, I agree to pay $${p.price.toFixed(2)} for my plan and that if I do not cancel before the end of the introductory plan, Flowly will automatically charge my payment method the regular price $${p.renew.toFixed(2)} every billing cycle thereafter until I cancel. You can cancel online by visiting the subscription page in your account on our website.`;
  }
  function selectPlan(id) {
    state.selectedPlan = id;
    if (typeof trackPlanSelected === "function") trackPlanSelected(id);
    document.querySelectorAll(".price-option").forEach(el => el.classList.toggle("selected", el.dataset.id === id));
    const plan = plans.find(p => p.id === id);
    const stackPriceEl = document.getElementById("value-stack-today-price");
    if (plan && stackPriceEl) stackPriceEl.textContent = `Just ${plan.perDay}/day`;
    updateFinePrint(id);
  }
  document.querySelectorAll(".price-option").forEach(el => el.addEventListener("click", () => selectPlan(el.dataset.id)));
  updateFinePrint(state.selectedPlan);
  document.getElementById("get-plan-btn").addEventListener("click", () => {
    stopCheckoutTimer();
    if (typeof trackPurchaseIntent === "function") trackPurchaseIntent(state.selectedPlan);
    const url = HOTMART_LINKS[state.selectedPlan];
    if (url) { window.location.href = url; } else { next(); }
  });
  document.getElementById("submit-payment-btn").addEventListener("click", () => {
    stopCheckoutTimer();
    if (typeof trackPurchaseIntent === "function") trackPurchaseIntent(state.selectedPlan);
    const url = HOTMART_LINKS[state.selectedPlan];
    if (url) { window.location.href = url; } else { next(); }
  });
}

function renderReview(imgId, name, text) {
  return `
    <div class="review-card review-card-row">
      <div class="review-avatar-col">${renderPlaceholder(imgId, { w: 48, h: 48 })}</div>
      <div class="review-body-col">
        <div class="name">${name}</div>
        <p style="font-size:14px; line-height:1.5; margin:4px 0 0;">${text}</p>
      </div>
      <div class="review-stars-col"><span class="review-stars-badge">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div>
    </div>`;
}

function startCheckoutTimer() {
  let seconds = 10 * 60;
  const stickyEl = document.getElementById("sticky-timer");
  function tick() {
    const m = Math.floor(seconds / 60), s = seconds % 60;
    const str = `${m}:${s.toString().padStart(2, "0")}`;
    if (stickyEl) stickyEl.textContent = str;
    const inlineEl = document.getElementById("checkout-timer");
    if (inlineEl) inlineEl.textContent = str;
    seconds--;
    if (seconds < 0) seconds = 10 * 60;
  }
  tick();
  checkoutTimerInterval = setInterval(tick, 1000);
}
function stopCheckoutTimer() {
  clearInterval(checkoutTimerInterval);
  document.getElementById("sticky-timer-bar").classList.add("hidden");
}

/* ---------------- UPSELL + DOWNSELL ---------------- */
function renderUpsell() {
  app.innerHTML = `
    <div class="step" style="position:relative;">
      <span class="skip-link" id="skip-link">SKIP &rsaquo;</span>
      <div class="upsell-steps">
        <span class="upsell-step-dot done">&#10003;</span><span>Complete setup</span>
        <span style="width:30px;height:2px;background:var(--border);"></span>
        <span class="upsell-step-dot">2</span><span class="upsell-line-active">Add offer</span>
        <span style="width:30px;height:2px;background:var(--border);"></span>
        <span class="upsell-step-dot" style="background:var(--border);color:var(--text-muted);">3</span><span>Get your plan</span>
      </div>
      <h1 class="step-title">Reach your goal faster: add these guides to speed up your results &#128154;</h1>
      <div class="upsell-box">
        <div class="upsell-item"><span class="icon-circle">&#9989;</span> Get your personal plan</div>
        <div class="upsell-item"><span class="icon-circle">&#128293;</span> <b>Fat-burn plan</b></div>
        <div class="upsell-item"><span class="icon-circle">&#128202;</span> Full-body stress relief report</div>
        <div class="upsell-item"><span class="icon-circle">&#127858;</span> Weekly nutrition plan</div>
        <div class="upsell-item"><span class="icon-circle">&#127856;</span> Sweet & healthy desserts</div>
      </div>
      <div class="upsell-price-row">
        <div><b>Special offer</b><br><span style="font-size:12px;color:var(--text-muted);">Recurring subscription</span></div>
        <div style="text-align:right;">
          <span style="background:var(--red-urgency);color:white;border-radius:8px;padding:2px 8px;font-size:11px;font-weight:700;" id="upsell-discount-badge">-56%</span>
          <span style="text-decoration:line-through;color:var(--text-muted);font-size:13px;">$2.82</span>
          <span style="font-weight:700;font-size:18px;" id="upsell-price">$1.25/day</span>
        </div>
      </div>
      <button class="continue-btn pink" id="upsell-cta">Start my transformation &#10024;</button>
      <p class="fine-print" id="upsell-fine-print">By clicking "Start my transformation," you start a 4-week introductory offer at $1.25/day ($35.00 total); it then automatically renews at $79.00 every 4 weeks unless you cancel at least 24 hours before it ends. Cancel anytime in your account.</p>
      <p class="decline-link" id="decline-link">Continue without essential guides</p>
      <ul class="upsell-bullets">
        <li>Support your goal with guidance you can follow anywhere, anytime</li>
        <li>Designed in collaboration with medical and fitness experts</li>
        <li>You keep your essential guides even if you decide Flowly isn't for you</li>
      </ul>
      <p style="text-align:center;text-decoration:underline;font-size:13px;">Refund policy</p>
    </div>`;

  document.getElementById("upsell-cta").addEventListener("click", () => next());
  document.getElementById("skip-link").addEventListener("click", () => next());
  document.getElementById("decline-link").addEventListener("click", showDownsellModal);
}

function showDownsellModal() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal-card">
      <span class="skip-link" id="modal-skip" style="position:absolute;">SKIP &rsaquo;</span>
      <div class="modal-badge">&#127873;</div>
      <h2 style="margin:0 0 12px;">Extra 70% discount applied!</h2>
      <p style="font-size:14px;color:var(--text-dark);margin-bottom:20px;">With this <b>extra 70%</b>, extend your path toward lasting health. Take advantage of this one-time offer to keep up your progress.</p>
      <button class="continue-btn pink" id="claim-btn">Claim now</button>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById("modal-skip").addEventListener("click", () => { overlay.remove(); next(); });
  document.getElementById("claim-btn").addEventListener("click", () => {
    overlay.remove();
    document.getElementById("upsell-discount-badge").textContent = "-70%";
    document.getElementById("upsell-price").textContent = "$0.86/day";
    document.getElementById("upsell-fine-print").textContent =
      'By clicking "Start my transformation," you start a 4-week introductory offer at $0.86/day ($24.00 total); it then automatically renews at $79.00 every 4 weeks unless you cancel at least 24 hours before it ends.';
  });
}

/* ---------------- THANK YOU / WELCOME EMAIL PREVIEW ---------------- */
function renderThankYou() {
  app.innerHTML = `
    <div class="step">
      <h1 class="step-title" style="color:var(--sage-dark);">&#9989; Welcome to Flowly!</h1>
      <div class="testimonial-card">
        <p>Thanks for joining &mdash; we're excited to have you on this journey toward better health and confidence. Your personalized plan is ready.</p>
        <button class="continue-btn" style="margin:16px 0;">&#128077; Click here to access your report</button>
        <p><b>What your plan includes:</b></p>
        <ul>
          <li>&#9989; Personalized meal plans with nearly 1000 recipes</li>
          <li>&#9989; All-in-one fitness plans: yoga, Pilates, mobility and strength</li>
          <li>&#9989; Complete wellness kit: weight, calories, water and steps</li>
          <li>&#9989; Health challenges and Academy content</li>
        </ul>
        <div class="checkout-summary">
          <p style="margin:0 0 6px;font-weight:700;">Plan details</p>
          <div class="checkout-summary-row"><span>Your plan</span><span>4-week trial</span></div>
          <div class="checkout-summary-row"><span>Amount charged</span><span>$12.78</span></div>
          <div class="checkout-summary-row"><span>Next billing</span><span>$49.95 in 28 days</span></div>
        </div>
      </div>
      <p style="text-align:center;font-size:12px;color:var(--text-muted);">&mdash; End of funnel simulation &mdash;</p>
      <button class="continue-btn" id="restart-btn">Restart demo</button>
    </div>`;
  document.getElementById("restart-btn").addEventListener("click", () => {
    state.index = 0; state.answers = {}; render();
  });
}

/* ---------------- INIT ---------------- */
backBtn.addEventListener("click", back);
render();
