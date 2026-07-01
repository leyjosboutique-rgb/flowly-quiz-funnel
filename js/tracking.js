/* ===================================================================
   META PIXEL — CONVERSION TRACKING
   Pixel ID: 1466663398470516

   FUNNEL DE CONVERSIÓN:
   ┌─────────────────────────────────────────────────────────┐
   │  ViewContent       → Quiz abierto                       │
   │  QuizStarted       → Pregunta de edad respondida        │
   │  Lead              → Email capturado                    │
   │  CompleteReg.      → Nombre capturado (quiz completo)   │
   │  InitiateCheckout  → Pantalla de checkout vista         │
   │  AddToCart         → Plan seleccionado                  │
   │  Purchase          → CTA clic → redirige a Hotmart      │
   └─────────────────────────────────────────────────────────┘
=================================================================== */

const PIXEL_ID = "1466663398470516";

/* Precio real por plan — usado en todos los eventos de valor */
const PLAN_VALUES = {
  "1week":  { value: 9.00,  name: "Flowly 1-Week Plan",  content_id: "flowly_1w"  },
  "4week":  { value: 15.00, name: "Flowly 4-Week Plan",  content_id: "flowly_4w"  },
  "12week": { value: 25.00, name: "Flowly 12-Week Plan", content_id: "flowly_12w" },
};

/* ── helpers ──────────────────────────────────────────────────── */
function _fbStd(event, params) {
  if (typeof fbq === "undefined") return;
  fbq("track", event, { currency: "USD", ...params });
  _log(event, params);
}
function _fbCustom(event, params) {
  if (typeof fbq === "undefined") return;
  fbq("trackCustom", event, params);
  _log(event, params);
}
function _log(event, params) {
  console.log(`%c[Flowly Pixel]%c ${event}`, "color:#4CAF50;font-weight:700", "color:#333", params);
  try {
    const key  = "flowly_events";
    const log  = JSON.parse(localStorage.getItem(key) || "[]");
    log.push({ event, ...params, ts: Date.now() });
    if (log.length > 60) log.splice(0, log.length - 60);
    localStorage.setItem(key, JSON.stringify(log));
    localStorage.setItem("flowly_last_event", event);
    localStorage.setItem("flowly_last_event_ts", Date.now());
  } catch (e) {}
}
function _plan() {
  /* Lee el plan actualmente seleccionado desde state (global en app.js) */
  const id = (typeof state !== "undefined" && state.selectedPlan) ? state.selectedPlan : "4week";
  return PLAN_VALUES[id] || PLAN_VALUES["4week"];
}

/* ── eventos públicos llamados desde app.js ───────────────────── */

/**
 * Llamar cuando el usuario hace clic en una tarjeta de plan.
 * @param {string} planId  "1week" | "4week" | "12week"
 */
function trackPlanSelected(planId) {
  const p = PLAN_VALUES[planId] || PLAN_VALUES["4week"];
  _fbStd("AddToCart", {
    content_name:  p.name,
    content_ids:   [p.content_id],
    content_type:  "product",
    value:         p.value,
    num_items:     1,
  });
  _fbCustom("PlanSelected", { plan_id: planId, value: p.value });
}

/**
 * Llamar justo ANTES de redirigir a Hotmart (mayor señal de intención).
 * @param {string} planId
 */
function trackPurchaseIntent(planId) {
  const p = PLAN_VALUES[planId] || PLAN_VALUES["4week"];
  _fbStd("Purchase", {
    content_name:  p.name,
    content_ids:   [p.content_id],
    content_type:  "product",
    value:         p.value,
    num_items:     1,
  });
  _fbCustom("CheckoutStarted", { plan_id: planId, value: p.value });
}

/* ── trackStep — llamado automáticamente en cada render() ─────── */
function trackStep(step) {

  /* ── 1. INICIO DEL QUIZ ─────────────────────────────────── */
  if (step.id === "age") {
    _fbStd("ViewContent", {
      content_name:     "Flowly Quiz — Tai Chi Walking for Weight Loss",
      content_category: "quiz",
    });
    _fbCustom("QuizStarted");
    if (!localStorage.getItem("flowly_started_at"))
      localStorage.setItem("flowly_started_at", Date.now());
    return;
  }

  /* ── 2. PREDICCIÓN (señal de alta intención) ────────────── */
  if (step.id === "prediction1" || step.id === "prediction2") {
    _fbCustom("PredictionViewed", { step: step.id });
    return;
  }

  /* ── 3. ELEGIBILIDAD APROBADA ───────────────────────────── */
  if (step.id === "eligibility") {
    _fbCustom("EligibilityPassed");
    return;
  }

  /* ── 4. CAPTURA DE EMAIL → Lead ─────────────────────────── */
  if (step.id === "email") {
    _fbStd("Lead", {
      content_name:     "Flowly Email Lead",
      content_category: "quiz",
      value:            15.00,
    });
    return;
  }

  /* ── 5. CAPTURA DE NOMBRE → CompleteRegistration ────────── */
  if (step.id === "name") {
    _fbStd("CompleteRegistration", {
      content_name: "Flowly Quiz Completed",
      status:       true,
      value:        15.00,
    });
    _fbCustom("QuizCompleted");
    return;
  }

  /* ── 6. PÁGINA DE OBJETIVOS ─────────────────────────────── */
  if (step.id === "goals") {
    _fbCustom("GoalsViewed");
    return;
  }

  /* ── 7. CHECKOUT → InitiateCheckout ─────────────────────── */
  if (step.id === "checkout") {
    const p = _plan();
    _fbStd("InitiateCheckout", {
      content_name:  "Flowly Plan Checkout",
      content_ids:   [p.content_id],
      content_type:  "product",
      value:         p.value,
      num_items:     1,
    });
    return;
  }

  /* ── 8. UPSELL ──────────────────────────────────────────── */
  if (step.id === "upsell") {
    _fbCustom("UpsellViewed");
    return;
  }

  /* ── 9. PROGRESO POR SECCIÓN ────────────────────────────── */
  const sections = {
    "My Profile":    "SectionProfile",
    "Activity":      "SectionActivity",
    "Health & Safety": "SectionHealth",
    "Lifestyle":     "SectionLifestyle",
    "Almost there":  "SectionAlmostThere",
  };
  if (step.section && sections[step.section]) {
    _fbCustom("QuizProgress", {
      section: sections[step.section],
      step_id: step.id,
    });
  }
}
