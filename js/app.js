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

function interpolate(str) {
  if (!str) return str;
  return str
    .replace(/{{goalWeight}}/g, state.goalWeight + (state.unitWeight === "kg" ? "kg" : "lb"))
    .replace(/{{currentWeight}}/g, state.currentWeight + (state.unitWeight === "kg" ? "kg" : "lb"))
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
    const tracks = progressBar.querySelectorAll(".progress-bar-track");
    const filled = Math.round(step.progress * tracks.length);
    tracks.forEach((t, i) => t.classList.toggle("filled", i < filled));
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
      <div class="gift-banner-big"><span class="gift-emoji">&#127873;</span><span>${step.banner.replace("&#127873; ", "")}</span></div>
      <h1 class="step-title">${step.title}</h1>
      <p class="step-subtitle">${step.subtitle}</p>
      <div class="photo-grid">
        ${step.cards.map(c => `
          <div class="photo-option" data-v="${c.value}">
            ${renderPlaceholder(c.img)}
            <div class="ph-label">${c.label}</div>
          </div>`).join("")}
      </div>
      <p style="text-align:center;"><a href="#" id="catchall-link" style="color:var(--text-dark); font-weight:700; text-decoration:none;">${step.catchAll} &rsaquo;</a></p>
      ${step.authorityBadge ? `
      <div class="authority-badge">
        <div class="authority-avatar">&#129658;</div>
        <div>
          <p class="authority-name">${step.authorityBadge.name} <span class="authority-credential">&middot; ${step.authorityBadge.credential}</span></p>
          <p class="authority-quote">&ldquo;${step.authorityBadge.quote}&rdquo;</p>
        </div>
      </div>` : ""}
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
  if (o.img) return renderPlaceholder(o.img, { w: 70, h: 70 });
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
      ${step.illustration ? `<div class="step-image-wrap" style="max-width:90px;margin:0 auto 14px;">${renderPlaceholder(step.illustration)}</div>` : ""}
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
      <button class="continue-btn" id="sheet-continue-btn">Continuar</button>
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
        ${renderPlaceholder(step.img, { w: 560, h: 300 })}
        <div class="ld-caption">${step.caption}</div>
      </div>
      <div class="like-dislike-row">
        <div class="ld-option" data-v="dislike"><span class="ld-emoji">&#128078;</span><span class="ld-label">Aversi&oacute;n</span></div>
        <div class="ld-option" data-v="neutral"><span class="ld-emoji">&#129300;</span><span class="ld-label">Neutral</span></div>
        <div class="ld-option" data-v="like"><span class="ld-emoji">&#128077;</span><span class="ld-label">Como</span></div>
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
      <div id="feedback-slot"></div>
      <button class="continue-btn" id="continue-btn" disabled>Continue</button>
    </div>`;
  const input = document.getElementById("num-input");
  const btn = document.getElementById("continue-btn");
  let currentUnit = step.units[0];

  function updateFeedback() {
    const val = parseFloat(input.value);
    const slot = document.getElementById("feedback-slot");
    if (!val || isNaN(val)) { slot.innerHTML = ""; return; }
    if (step.bmiBox) {
      const kg = currentUnit === "kg" ? val : val * 0.4536;
      const heightM = state.heightCm / 100 || 1.63;
      const bmi = (kg / (heightM * heightM)).toFixed(1);
      let cat = "peso normal";
      if (bmi >= 30) cat = "obesidad"; else if (bmi >= 25) cat = "sobrepeso"; else if (bmi < 18.5) cat = "bajo peso";
      slot.innerHTML = `
        <div class="feedback-box">
          <div class="fb-icon">&#129518;</div>
          <div>
            <p class="fb-title">Tu IMC es de ${bmi}, lo que se considera ${cat}.</p>
            <p class="fb-body">Te queda trabajo por delante, pero es genial que estés dando el primer paso. Usaremos tu IMC para crear un programa de pérdida de peso personalizado.</p>
          </div>
        </div>`;
    } else if (step.realisticGoalBox) {
      slot.innerHTML = `
        <div class="feedback-box">
          <div class="fb-icon">&#128202;</div>
          <div>
            <p class="fb-title">&iexcl;Objetivo realista!</p>
            <p class="fb-body">Los estudios han demostrado que perder un 5% o más del peso corporal puede reducir significativamente el riesgo de sufrir ataques cardíacos, niveles altos de azúcar en sangre e hipertensión arterial.</p>
            <p class="fb-source">Fuente: Asociaci&oacute;n Americana del Coraz&oacute;n (AHA)</p>
          </div>
        </div>`;
    }
  }

  input.addEventListener("input", () => { btn.disabled = input.value.trim() === ""; updateFeedback(); });
  app.querySelectorAll(".unit-btn").forEach(b => b.addEventListener("click", () => {
    app.querySelectorAll(".unit-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    currentUnit = b.dataset.u;
    updateFeedback();
  }));
  btn.addEventListener("click", () => {
    const val = parseFloat(input.value);
    setAnswer(step.id, val);
    if (step.id === "q6") state.heightCm = currentUnit === "cm" ? val : Math.round(val * 30.48);
    if (step.id === "q7") state.currentWeight = Math.round(currentUnit === "kg" ? val : val * 0.4536);
    if (step.id === "q8") state.goalWeight = Math.round(currentUnit === "kg" ? val : val * 0.4536);
    next();
  });
}

/* ---------------- TRANSITION (text only, may include a chart) ---------------- */
function renderTransition(step) {
  const chartHtml = step.chartType === "stress" ? chartStress() : (step.chartType === "calm" ? chartCalm() : "");
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
      <div class="transition-image">${renderPlaceholder(step.img, { w: 560, h: 360 })}</div>
      <h1 class="step-title">${step.title}</h1>
      <div class="transition-body" style="text-align:center;">${step.body}</div>
      <button class="continue-btn" id="continue-btn">Continue</button>
    </div>`;
  document.getElementById("continue-btn").addEventListener("click", next);
}

/* ---------------- LOADING SINGLE (animated shoes + wide bar) ---------------- */
function renderLoadingSingle(step) {
  app.innerHTML = `
    <div class="step" style="text-align:center;">
      <div class="walking-shoes-wrap"><span class="walking-shoes">&#129450;</span></div>
      <p style="font-size:15px; font-weight:600; margin-bottom:24px;">${step.text}<br><span style="font-size:11px;font-weight:400;color:var(--text-muted);font-style:italic;">Source: ${step.source}</span></p>
      <div class="wide-progress-track"><div class="wide-progress-fill" id="loader-fill" style="width:6%;">0%</div></div>
    </div>`;
  let pct = 0;
  const fill = document.getElementById("loader-fill");
  const iv = setInterval(() => {
    pct += 4;
    const shown = Math.min(pct, 100);
    fill.style.width = shown + "%";
    fill.textContent = shown + "%";
    if (pct >= 100) { clearInterval(iv); setTimeout(next, 600); }
  }, 70);
}

/* ---------------- PREDICTION CHART (Prediction #1 / #2) ---------------- */
function renderPrediction(step) {
  const fromLabel = `Now ${state.currentWeight}${state.unitWeight === "kg" ? "kg" : "lb"}`;
  const toLabel = `${state.goalWeight}${state.unitWeight === "kg" ? "kg" : "lb"}`;
  const chart = chartPrediction(fromLabel, toLabel, "Now", step.short ? fmtDate(30) : fmtDate(90));
  const headline = step.subtitleDynamic
    ? `<h1 class="step-title">${step.title}</h1><p class="step-subtitle" style="font-size:16px;font-weight:600;color:var(--text-dark);">${interpolate(step.subtitleDynamic)}</p>`
    : `<h1 class="step-title">${interpolate(step.title)}</h1>`;
  app.innerHTML = `
    <div class="step">
      ${headline}
      ${chart}
      <p style="font-size:13px;">${step.note}</p>
      <p class="transition-source">${step.source}</p>
      <button class="continue-btn" id="continue-btn">Continue</button>
    </div>`;
  document.getElementById("continue-btn").addEventListener("click", next);
}

/* ---------------- BEFORE/AFTER QUOTE ---------------- */
function renderBeforeAfterQuote(step) {
  app.innerHTML = `
    <div class="step">
      <div class="transition-image">${renderPlaceholder(step.img, { w: 560, h: 360 })}</div>
      <h1 class="step-title">&ldquo;${step.quote}&rdquo;</h1>
      <p class="step-subtitle">${step.body}</p>
      <button class="continue-btn" id="continue-btn">Continue</button>
    </div>`;
  document.getElementById("continue-btn").addEventListener("click", next);
}

/* ---------------- ELIGIBILITY (+ 3-phase chart) ---------------- */
function renderEligibility(step) {
  app.innerHTML = `
    <div class="step">
      <h1 class="step-title" style="color:var(--sage-dark); text-align:left; font-size:22px;">${step.title}</h1>
      <p class="step-subtitle" style="text-align:left;">${step.body}</p>
      ${chartEligibility()}
      <p style="font-size:13px; display:flex; gap:10px; align-items:flex-start;"><span style="font-size:20px;">&#128241;</span>${interpolate(step.note)}</p>
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

  // realistic, non-instant pacing: each bar takes 1.6-2.4s with live % ticking
  let totalDelay = 0;
  step.items.forEach((_, i) => {
    const duration = 1800 + i * 250;
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

  // side micro-question appears early
  setTimeout(() => {
    const sq = step.sideQuestion;
    document.getElementById("side-question").innerHTML = `
      <div class="feature-box" style="background:var(--sage-light);">
        <p style="font-weight:700; margin-bottom:10px;">${sq.title}</p>
        <p style="font-size:14px; margin-bottom:10px;">${sq.question}</p>
        <div class="options-list" style="gap:8px;">
          ${sq.options.map(o => `<div class="option-card radio" style="padding:10px 14px;" data-v="${o.v}">${o.l}<span class="option-check">&#10003;</span></div>`).join("")}
        </div>
      </div>`;
    document.querySelectorAll("#side-question .option-card").forEach(c => {
      c.addEventListener("click", () => { c.classList.add("selected"); });
    });
  }, 500);

  // testimonial card appears mid-loading, stays through completion
  setTimeout(() => {
    const t = step.testimonial;
    document.getElementById("testimonial-slot").innerHTML = `
      <div class="testimonial-card">
        <div class="stars">${"&#9733;".repeat(t.stars)}</div>
        <p style="font-style:italic; font-size:14px;">&ldquo;${t.quote}&rdquo;</p>
        <p style="font-size:12px; color:var(--text-muted); margin:0;">${t.name}</p>
      </div>`;
  }, 1200);

  // completion: confetti + headline swap
  setTimeout(() => {
    document.getElementById("loading-headline").innerHTML = step.completeTitle;
    fireConfetti();
    setTimeout(next, 1600);
  }, totalDelay + 600);
}

function fireConfetti() {
  const wrap = document.getElementById("confetti-canvas-wrap");
  wrap.style.display = "block";
  const colors = ["#3aa66b", "#d63b6e", "#f5b400", "#4f8ff0", "#6b9c7a"];
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
  const unit = state.unitWeight === "kg" ? "kg" : "lb";
  app.innerHTML = `
    <div class="step">
      <h1 class="goal-headline">${name}, reach your goal of <span class="accent">${state.goalWeight}${unit}</span> by ${fmtDate(30)}</h1>
      <p class="step-subtitle">And build a body you feel good living in</p>
      ${chartGoals(state.currentWeight, state.goalWeight, unit, "Now", fmtDate(30))}
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
    <div class="milestone-screen">
      <div></div>
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

/* ---------------- CHECKOUT ---------------- */
let checkoutTimerInterval;
function renderCheckout() {
  document.getElementById("sticky-timer-bar").classList.remove("hidden");
  startCheckoutTimer();

  const plans = [
    { id: "1week", label: "1-week plan", oldPrice: "$21.99", newPrice: "$5.19", perDay: "$0.74" },
    { id: "4week", label: "4-week plan", oldPrice: "$49.95", newPrice: "$9.99", perDay: "$0.36", badge: true },
    { id: "12week", label: "12-week plan", oldPrice: "$84.95", newPrice: "$19.99", perDay: "$0.24" },
  ];

  app.innerHTML = `
    <div class="step">
      <h1 class="step-title">Your personalized Tai Chi walking workout plan is ready</h1>
      <div class="before-after-row">
        <div class="ba-col">
          <span class="ba-tag before">BEFORE</span>
          ${renderPlaceholder("IMG-15-before")}
          <div class="ba-stat-label">Body fat</div><div class="ba-stat-value">High</div>
          <div class="ba-bar low"></div>
          <div class="ba-stat-label">Energy levels</div><div class="ba-stat-value">Low</div>
        </div>
        <div class="ba-col">
          <span class="ba-tag after">AFTER</span>
          ${renderPlaceholder("IMG-15-after")}
          <div class="ba-stat-label">Body fat</div><div class="ba-stat-value">Low</div>
          <div class="ba-bar high"></div>
          <div class="ba-stat-label">Energy levels</div><div class="ba-stat-value">High</div>
        </div>
      </div>

      <div class="feature-box" style="background:var(--sage-light);">
        <h3 style="text-align:center;margin-top:0;">Your plan includes</h3>
        <div class="feature-line">&#128221; Personalized Tai Chi walking workout plan</div>
        <div class="feature-line">&#128340; 7-15 minute low-impact daily routines</div>
        <div class="feature-line">&#129497; Beginner-friendly mobility and balance exercises</div>
        <div class="feature-line">&#129534; Joint-friendly movement plan</div>
        <div class="feature-line">&#128202; Progress tracking</div>
        <div class="feature-line">&#128153; 24/7 Support group</div>
        <div class="feature-line">&#127858; Simple nutrition guidance to support your results</div>
      </div>

      <h2 class="step-title" style="font-size:20px;">Start feeling stronger, lighter, and more mobile in 4 weeks</h2>
      <div class="checkout-timer-bar">&#9201; This offer ends in <span id="checkout-timer">10:00</span> min</div>

      <div id="price-options">
        ${plans.map(p => `
          <div class="price-option ${p.badge ? "has-badge" : ""} ${p.id === state.selectedPlan ? "selected" : ""}" data-id="${p.id}">
            ${p.badge ? `<div class="price-most-popular">&#128077; MOST POPULAR</div>` : ""}
            <div style="display:flex;align-items:center;">
              <div class="radio"></div>
              <div>
                <div style="font-weight:700;">${p.label}</div>
                <div><span class="price-old">${p.oldPrice}</span><span class="price-new">${p.newPrice}</span></div>
              </div>
            </div>
            <div style="text-align:right;">
              <div class="price-per-day">${p.perDay}</div>
              <div class="price-per-day-label">per day</div>
            </div>
          </div>`).join("")}
      </div>
      <p style="font-size:12px; display:flex; gap:8px; align-items:flex-start;">&#128202; People using the plan for <b>12 weeks</b> achieve <b>double the results</b> as for 4 weeks<br><span style="font-size:11px;color:var(--text-muted);">*According to a study by Flowly, 2024</span></p>
      <p class="guarantee-link">30-DAY MONEY-BACK GUARANTEE</p>
      <button class="continue-btn pink" id="get-plan-btn">GET MY PLAN</button>

      <div class="press-row">
        <span style="font-size:11px;color:var(--text-muted);width:100%;text-align:center;">TAI CHI WALKING FEATURED IN</span>
        <span class="press-logo">BUSINESS INSIDER</span><span class="press-logo">The New York Times</span>
        <span class="press-logo">Women'sHealth</span><span class="press-logo">Men'sHealth</span><span class="press-logo">SHAPE</span>
      </div>

      <h2 class="step-title">Success stories</h2>
      <div class="testimonial-card">
        <div class="before-after-row">
          <div class="ba-col">${renderPlaceholder("IMG-16-before", { w: 140, h: 180 })}</div>
          <div class="ba-col">${renderPlaceholder("IMG-16-after", { w: 140, h: 180 })}</div>
        </div>
        <div class="testimonial-name-row"><div><b>Martha S.</b><br><span style="font-size:12px;color:var(--text-muted);">Los Angeles, CA</span></div><div style="text-align:right;"><b>-40lbs</b><br><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div></div>
        <p style="font-size:13px;">I used to think weight loss was impossible after years of strict diets and tough workouts. Then I tried Tai Chi walking. When I focused on gentle, steady movement, the results came quickly. I didn't just lose weight (40 lbs). I also slept better, felt calmer, and noticed positive changes in my body.</p>
      </div>
      <div class="testimonial-card">
        <div class="before-after-row">
          <div class="ba-col">${renderPlaceholder("IMG-17-before", { w: 140, h: 180 })}</div>
          <div class="ba-col">${renderPlaceholder("IMG-17-after", { w: 140, h: 180 })}</div>
        </div>
        <div class="testimonial-name-row"><div><b>Suzy B.</b><br><span style="font-size:12px;color:var(--text-muted);">Seattle, WA</span></div><div style="text-align:right;"><b>-60lbs</b><br><span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span></div></div>
        <p style="font-size:13px;">I've tried many weight-loss programs, but this one is different. It focuses on gentle, balanced movement. Even if you're a beginner or haven't moved in ages, it makes weight loss feel natural. This approach finally led to significant weight loss for me. My energy is higher, and my joints feel better too.</p>
      </div>

      <h2 class="step-title">Customer reviews</h2>
      ${renderReview("IMG-18a", "Brenda Ross", "I never write reviews. NEVER! As a single mum, I struggled to find time for myself. Flowly made it easy to follow and helped me lose weight. You SAVED MY LIFE. I feel more confident, I'm loving myself again, and I feel unstoppable right now.")}
      ${renderReview("IMG-18b", "Sandra Jane", "No more stiff joints! With Flowly Tai Chi walking, I finally feel free. I believe I feel better than I did in my 20s. I know it sounds funny, but that's how I feel after losing those extra pounds!")}
      ${renderReview("IMG-18c", "AmeliaXC", "Tai Chi walking helped me lose 22lbs last month. I can't imagine stopping it. Not only did I lose weight, but my confidence is back. My friends say I've changed!")}

      <h2 class="step-title">Get visible results in 4 weeks</h2>
      <div style="display:flex; justify-content:space-around; text-align:center; margin-bottom:20px;">
        <div><div style="font-size:22px;">&#9989;</div><div style="font-size:12px;color:var(--text-muted);">Perfect for</div><div style="font-weight:700;">Women Over 55</div></div>
        <div><div style="font-size:22px;">&#127942;</div><div style="font-size:12px;color:var(--text-muted);">Goal</div><div style="font-weight:700;">Lose 8kg</div></div>
      </div>

      <h2 class="step-title">Checkout</h2>
      <div class="checkout-summary" id="checkout-summary"></div>
      <div class="pay-btn-row">
        <button class="pay-btn pay-paypal">PayPal</button>
      </div>
      <p class="divider-text">OR PAY BY CREDIT CARD</p>
      <div class="pay-btn-row">
        <button class="pay-btn pay-gpay">Buy with G Pay</button>
      </div>
      <p style="font-size:13px;font-weight:600;margin-bottom:4px;">Name on card</p>
      <input class="text-input" style="margin-bottom:12px;width:100%;" placeholder="Jane Doe">
      <p style="font-size:13px;font-weight:600;margin-bottom:4px;">Card number</p>
      <input class="text-input" style="margin-bottom:12px;width:100%;" placeholder="1234 1234 1234 1234">
      <div style="display:flex;gap:10px;margin-bottom:14px;">
        <div style="flex:1;"><p style="font-size:13px;font-weight:600;margin-bottom:4px;">Expiration</p><input class="text-input" style="width:100%;" placeholder="MM / YY"></div>
        <div style="flex:1;"><p style="font-size:13px;font-weight:600;margin-bottom:4px;">CVC</p><input class="text-input" style="width:100%;" placeholder="CVC"></div>
      </div>
      <button class="continue-btn" id="submit-payment-btn">Submit secure payment &#128274;</button>
      <p style="text-align:center;font-size:12px;margin:14px 0;">Guaranteed <b>safe checkout</b></p>
      <div class="trust-row"><span>&#128274; No hidden fees</span><span>&#128274; Secure SSL-protected</span><span>&#128274; Cancel Anytime</span></div>
      <p class="fine-print" id="fine-print-billing"></p>
      <div class="guarantee-box">
        <div style="font-size:30px;">&#128176;</div>
        <div>
          <b>100% Money Back Guarantee</b>
          <p style="font-size:13px; margin:6px 0 0;">We have confidence in the quality of our service and the results it provides. If you do not achieve visible results within the first 30 days, you are eligible for a refund. Please note that you will need to demonstrate that you followed the program.</p>
        </div>
      </div>
      <p style="text-align:center;font-size:11px;color:var(--text-muted);margin-top:30px;">Copyright &copy; 2026 Flowly. All rights reserved.</p>
    </div>`;

  function selectPlan(id) {
    state.selectedPlan = id;
    document.querySelectorAll(".price-option").forEach(el => el.classList.toggle("selected", el.dataset.id === id));
    updateCheckoutSummary();
  }
  function updateCheckoutSummary() {
    const map = {
      "1week": { plan: "1 week plan", old: 21.99, price: 5.19, fee: 1.50, renew: 21.99 },
      "4week": { plan: "4 weeks plan", old: 49.95, price: 9.99, fee: 2.79, renew: 49.95 },
      "12week": { plan: "12 weeks plan", old: 84.95, price: 19.99, fee: 3.90, renew: 84.95 },
    };
    const p = map[state.selectedPlan];
    const total = (p.price + p.fee).toFixed(2);
    document.getElementById("checkout-summary").innerHTML = `
      <div class="checkout-summary-row"><span>${p.plan}</span><span style="text-decoration:line-through;color:var(--text-muted);">$${p.old.toFixed(2)}</span></div>
      <div class="checkout-summary-row discount"><span>Discount (-80%)</span><span>-$${(p.old - p.price).toFixed(2)}</span></div>
      <div class="checkout-summary-row"><span>Service fee</span><span>$${p.fee.toFixed(2)}</span></div>
      <div class="checkout-summary-row total"><span>Total</span><span>$${total}</span></div>`;
    document.getElementById("fine-print-billing").textContent =
      `By purchasing, I agree to pay $${p.price.toFixed(2)} for my plan and that if I do not cancel before the end of the introductory plan, Flowly will automatically charge my payment method the regular price $${p.renew.toFixed(2)} every billing cycle thereafter until I cancel. You can cancel online by visiting subscription page in your account on website.`;
  }
  document.querySelectorAll(".price-option").forEach(el => el.addEventListener("click", () => selectPlan(el.dataset.id)));
  updateCheckoutSummary();
  document.getElementById("get-plan-btn").addEventListener("click", () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
  document.getElementById("submit-payment-btn").addEventListener("click", () => { stopCheckoutTimer(); next(); });
}

function renderReview(imgId, name, text) {
  return `
    <div class="review-card">
      <div class="review-header">
        ${renderPlaceholder(imgId, { w: 44, h: 44 })}
        <div class="name">${name}</div>
        <div style="margin-left:auto;" class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
      </div>
      <p style="font-size:13px;margin:0;">${text}</p>
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
      <span class="skip-link" id="skip-link">SALTAR &rsaquo;</span>
      <div class="upsell-steps">
        <span class="upsell-step-dot done">&#10003;</span><span>Completar configuraci&oacute;n</span>
        <span style="width:30px;height:2px;background:var(--border);"></span>
        <span class="upsell-step-dot">2</span><span class="upsell-line-active">A&ntilde;adir oferta</span>
        <span style="width:30px;height:2px;background:var(--border);"></span>
        <span class="upsell-step-dot" style="background:var(--border);color:var(--text-muted);">3</span><span>Obtener el plan</span>
      </div>
      <h1 class="step-title">Alcanza tu objetivo m&aacute;s r&aacute;pido: A&ntilde;ade estas gu&iacute;as para acelerar tus resultados &#128154;</h1>
      <div class="upsell-box">
        <div class="upsell-item"><span class="icon-circle">&#9989;</span> Obt&eacute;n tu plan personal</div>
        <div class="upsell-item"><span class="icon-circle">&#128293;</span> <b>Plan quema grasa</b></div>
        <div class="upsell-item"><span class="icon-circle">&#128202;</span> Informe de liberaci&oacute;n de estr&eacute;s de cuerpo completo</div>
        <div class="upsell-item"><span class="icon-circle">&#127858;</span> Plan nutricional semanal</div>
        <div class="upsell-item"><span class="icon-circle">&#127856;</span> Postres dulces y saludables</div>
      </div>
      <div class="upsell-price-row">
        <div><b>Oferta especial</b><br><span style="font-size:12px;color:var(--text-muted);">Suscripci&oacute;n recurrente</span></div>
        <div style="text-align:right;">
          <span style="background:var(--red-urgency);color:white;border-radius:8px;padding:2px 8px;font-size:11px;font-weight:700;" id="upsell-discount-badge">-56%</span>
          <span style="text-decoration:line-through;color:var(--text-muted);font-size:13px;">$2.82</span>
          <span style="font-weight:700;font-size:18px;" id="upsell-price">$1.25/d&iacute;a</span>
        </div>
      </div>
      <button class="continue-btn pink" id="upsell-cta">Empezar la transformaci&oacute;n &#10024;</button>
      <p class="fine-print" id="upsell-fine-print">Al hacer clic en "Empezar la transformaci&oacute;n", inicias una oferta introductoria de 4 semanas a $1.25/d&iacute;a ($35.00 en total); despu&eacute;s se renueva autom&aacute;ticamente a $79.00 cada 4 semanas salvo que cancele al menos 24 horas antes de que finalice. Cancela cuando quieras en tu cuenta.</p>
      <p class="decline-link" id="decline-link">Continuar sin gu&iacute;as esenciales</p>
      <ul class="upsell-bullets">
        <li>Apoya tu objetivo con pautas que puedes hacer en cualquier lugar y momento</li>
        <li>Dise&ntilde;ado en colaboraci&oacute;n con expertos m&eacute;dicos y de fitness</li>
        <li>Puedes conservar tus gu&iacute;as esenciales incluso si decides que Flowly no es para ti</li>
      </ul>
      <p style="text-align:center;text-decoration:underline;font-size:13px;">Pol&iacute;tica de reembolso</p>
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
      <span class="skip-link" id="modal-skip" style="position:absolute;">SALTAR &rsaquo;</span>
      <div class="modal-badge">&#127873;</div>
      <h2 style="margin:0 0 12px;">&iexcl;70% de descuento extra aplicado!</h2>
      <p style="font-size:14px;color:var(--text-dark);margin-bottom:20px;">Con este <b>70% adicional</b>, extiende tu camino hacia una salud duradera. Aprovecha esta oferta &uacute;nica para mantener tu progreso.</p>
      <button class="continue-btn pink" id="claim-btn">Reclamar ahora</button>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById("modal-skip").addEventListener("click", () => { overlay.remove(); next(); });
  document.getElementById("claim-btn").addEventListener("click", () => {
    overlay.remove();
    document.getElementById("upsell-discount-badge").textContent = "-70%";
    document.getElementById("upsell-price").textContent = "$0.86/día";
    document.getElementById("upsell-fine-print").textContent =
      'Al hacer clic en "Empezar la transformación", inicias una oferta introductoria de 4 semanas a $0.86/día ($24.00 en total); después se renueva automáticamente a $79.00 cada 4 semanas salvo que cancele al menos 24 horas antes de que finalice.';
  });
}

/* ---------------- THANK YOU / WELCOME EMAIL PREVIEW ---------------- */
function renderThankYou() {
  app.innerHTML = `
    <div class="step">
      <h1 class="step-title" style="color:var(--sage-dark);">&#9989; &iexcl;Bienvenido a Flowly!</h1>
      <div class="testimonial-card">
        <p>Gracias por unirte &mdash; estamos emocionados de tenerte en este camino hacia la salud y la confianza en ti mismo. Tu plan personalizado est&aacute; listo.</p>
        <button class="continue-btn" style="margin:16px 0;">&#128077; Haz clic aqu&iacute; para acceder a tu informe</button>
        <p><b>Qu&eacute; incluye tu plan:</b></p>
        <ul>
          <li>&#9989; Planes de comidas personalizados con casi 1000 recetas</li>
          <li>&#9989; Planes de fitness todo en uno: yoga, Pilates, movilidad y fuerza</li>
          <li>&#9989; Kit completo de bienestar: peso, calor&iacute;as, agua y pasos</li>
          <li>&#9989; Desaf&iacute;os de salud y contenido de la Academia</li>
        </ul>
        <div class="checkout-summary">
          <p style="margin:0 0 6px;font-weight:700;">Detalles del plan</p>
          <div class="checkout-summary-row"><span>Tu plan</span><span>4-week trial</span></div>
          <div class="checkout-summary-row"><span>Importe cobrado</span><span>$12.78</span></div>
          <div class="checkout-summary-row"><span>Pr&oacute;xima facturaci&oacute;n</span><span>$49.95 en 28 d&iacute;as</span></div>
        </div>
      </div>
      <p style="text-align:center;font-size:12px;color:var(--text-muted);">&mdash; Fin de la simulaci&oacute;n del funnel &mdash;</p>
      <button class="continue-btn" id="restart-btn">Reiniciar demo</button>
    </div>`;
  document.getElementById("restart-btn").addEventListener("click", () => {
    state.index = 0; state.answers = {}; render();
  });
}

/* ---------------- INIT ---------------- */
backBtn.addEventListener("click", back);
render();
