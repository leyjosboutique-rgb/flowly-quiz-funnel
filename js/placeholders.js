/* ===================================================================
   PLACEHOLDER CATALOG
   Cada entrada documenta exactamente la imagen real que debe reemplazar
   este placeholder. Ver PLACEHOLDERS_PROMPTS.md para el detalle completo
   (prompt listo para ChatGPT/DALL-E, dimensiones y ubicación).
=================================================================== */

const PLACEHOLDERS = {
  "IMG-01": { w: 280, h: 350, label: "Mujer 40-49, postura Tai Chi 'empuje'" },
  "IMG-02": { w: 280, h: 350, label: "Mujer 50-59, manos al centro" },
  "IMG-03": { w: 280, h: 350, label: "Mujer 60-69, brazo en saludo" },
  "IMG-04": { w: 280, h: 350, label: "Mujer 70-80, de pie sonriendo" },
  "IMG-05a": { w: 160, h: 200, label: "Cuerpo actual: Delgada" },
  "IMG-05b": { w: 160, h: 200, label: "Cuerpo actual: Mediana" },
  "IMG-05c": { w: 160, h: 200, label: "Cuerpo actual: Llenita" },
  "IMG-05d": { w: 160, h: 200, label: "Cuerpo actual: Plus size" },
  "IMG-06a": { w: 160, h: 200, label: "Cuerpo soñado: Delgada" },
  "IMG-06b": { w: 160, h: 200, label: "Cuerpo soñado: Tonificada" },
  "IMG-06c": { w: 160, h: 200, label: "Cuerpo soñado: Curvy" },
  "IMG-06d": { w: 160, h: 200, label: "Cuerpo soñado: Unas tallas menos" },
  "IMG-07": { w: 560, h: 360, label: "Antes/después emocional post-predicción" },
  "IMG-08": { w: 90, h: 90, label: "Ilustración: escaleras 3D (sin aliento)" },
  "IMG-09": { w: 90, h: 90, label: "Ilustración: bandera blanca (workouts difíciles)" },
  "IMG-10": { w: 90, h: 90, label: "Ilustración: mancuernas verdes (frustración progreso)" },
  "IMG-11": { w: 90, h: 90, label: "Badge/ícono de elegibilidad aprobada" },
  "IMG-12": { w: 560, h: 360, label: "Mujer en pose namaste — 'Almost done!'" },
  "IMG-13": { w: 560, h: 360, label: "3 mujeres juntas sonriendo, ropa sage" },
  "IMG-14": { w: 560, h: 360, label: "Mujer sonriendo viendo su teléfono" },
  "IMG-15-before": { w: 260, h: 320, label: "Sales page BEFORE — misma identidad del quiz" },
  "IMG-15-after": { w: 260, h: 320, label: "Sales page AFTER — misma identidad del quiz" },
  "IMG-16-before": { w: 200, h: 260, label: "Testimonio Martha S. — antes" },
  "IMG-16-after": { w: 200, h: 260, label: "Testimonio Martha S. — después" },
  "IMG-17-before": { w: 200, h: 260, label: "Testimonio Suzy B. — antes" },
  "IMG-17-after": { w: 200, h: 260, label: "Testimonio Suzy B. — después" },
  "IMG-18a": { w: 48, h: 48, label: "Avatar review: Brenda Ross" },
  "IMG-18b": { w: 48, h: 48, label: "Avatar review: Sandra Jane" },
  "IMG-18c": { w: 48, h: 48, label: "Avatar review: AmeliaXC" },

  /* ---- GRUPO B: a generar por Lovable (ver LOVABLE_PROMPT.md) ---- */
  "IMG-Q5-legs": { w: 70, h: 70, label: "Foto: piernas (close-up)" },
  "IMG-Q5-belly": { w: 70, h: 70, label: "Foto: abdomen (close-up)" },
  "IMG-Q5-arms": { w: 70, h: 70, label: "Foto: brazo (close-up)" },
  "IMG-Q5-butt": { w: 70, h: 70, label: "Foto: glúteos (close-up)" },
  "IMG-Q5-face": { w: 70, h: 70, label: "Foto: cara y cuello (close-up)" },
  "IMG-Q18-home": { w: 70, h: 70, label: "Foto: mujer con mat de yoga (Hogar)" },
  "IMG-Q18-outside": { w: 70, h: 70, label: "Foto: mujer con mochila afuera" },
  "IMG-Q18-gym": { w: 70, h: 70, label: "Foto: mujer en máquina de gym" },
  "IMG-Q18-none": { w: 70, h: 70, label: "Foto: mujer con toalla, sin preferencia" },
  "IMG-Q20-hero": { w: 560, h: 300, label: "Foto grande: Tai Chi estiramientos y movilidad" },
  "IMG-Q21-hero": { w: 560, h: 300, label: "Foto grande: Tai Chi respiración consciente" },
  "IMG-Q22-hero": { w: 560, h: 300, label: "Foto grande: Tai Chi equilibrio/balance" },
  "IMG-Q23-hero": { w: 560, h: 300, label: "Foto grande: Tai Chi fuerza constante" },
};

function renderPlaceholder(id, opts = {}) {
  const ph = PLACEHOLDERS[id];
  if (!ph) return `<div class="img-placeholder" style="height:120px;">missing: ${id}</div>`;
  const w = opts.w || ph.w;
  const h = opts.h || ph.h;
  return `
    <div class="img-placeholder" style="aspect-ratio:${w}/${h}; max-width:${w}px; height:auto;">
      <div class="ph-icon">&#128247;</div>
      <div class="ph-id">${id}</div>
      <div>${ph.label}</div>
      <div class="ph-dims">${w}&times;${h}px</div>
    </div>`;
}
