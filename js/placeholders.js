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
  "IMG-12": { w: 560, h: 360, label: "Mujer en pose dinámica de Tai Chi — transición T1 (mecanismo)" },
  "IMG-t3": { w: 560, h: 360, label: "Mujer practicando Tai Chi al aire libre en parque" },
  "IMG-12b": { w: 560, h: 360, label: "Mujer en pose namaste — 'Almost done!'" },
  "IMG-t5": { w: 560, h: 360, label: "Mujer practicando Tai Chi en casa" },
  "IMG-t4": { w: 560, h: 360, label: "Mujer caminando — balance y estabilidad" },
  "IMG-t6": { w: 560, h: 360, label: "Mujer caminando al aire libre con botella de agua" },
  "IMG-t9": { w: 560, h: 360, label: "Mujer durmiendo plácidamente en cama" },
  "IMG-13": { w: 560, h: 360, label: "3 mujeres juntas sonriendo, ropa sage" },
  "IMG-14": { w: 560, h: 360, label: "Mujer sonriendo viendo su teléfono" },
  "IMG-t10": { w: 560, h: 360, label: "Fascia + alimentos saludables (nutrición)" },
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
  "IMG-fascia": { w: 560, h: 360, label: "Ilustración de fascia + mujer en pose de yoga" },
};

/* Real images already uploaded — id -> filename in assets/images/ */
const REAL_IMAGES = {
  "IMG-01": "IMG-01.jpg",
  "IMG-02": "IMG-02.jpg",
  "IMG-03": "IMG-03.jpg",
  "IMG-04": "IMG-04.jpg",
  "IMG-05a": "IMG-05a.jpg",
  "IMG-05b": "IMG-05b.jpg",
  "IMG-05c": "IMG-05c.jpg",
  "IMG-05d": "IMG-05d.jpg",
  "IMG-06a": "IMG-06a.jpg",
  "IMG-06b": "IMG-06b.jpg",
  "IMG-06c": "IMG-06c.jpg",
  "IMG-06d": "IMG-06d.jpg",
  "IMG-07": "IMG-07.jpg",
  "IMG-08": "IMG-08.jpg",
  "IMG-09": "IMG-09.jpg",
  "IMG-10": "IMG-10.jpg",
  "IMG-Q20-hero": "IMG-Q20-hero.jpg",
  "IMG-Q21-hero": "IMG-Q21-hero.jpg",
  "IMG-Q22-hero": "IMG-Q22-hero.jpg",
  "IMG-Q23-hero": "IMG-Q23-hero.jpg",
  "IMG-12": "IMG-12.jpg",
  "IMG-t3": "IMG-t3.jpg",
  "IMG-t4": "IMG-t4.jpg",
  "IMG-t5": "IMG-t5.jpg",
  "IMG-t6": "IMG-t6.jpg",
  "IMG-t9": "IMG-t9.jpg",
  "IMG-12b": "IMG-12b.jpg",
  "IMG-13": "IMG-13.jpg",
  "IMG-14": "IMG-14.jpg",
  "IMG-t10": "IMG-t10.jpg",
  "IMG-16-before": "IMG-16-before.jpg",
  "IMG-16-after": "IMG-16-after.jpg",
  "IMG-17-before": "IMG-17-before.jpg",
  "IMG-17-after": "IMG-17-after.jpg",
  "IMG-Q18-outside": "IMG-Q18-outside.jpg",
  "IMG-fascia": "IMG-fascia.jpg",
  "IMG-Q5-legs": "IMG-Q5-legs.jpg",
  "IMG-Q5-belly": "IMG-Q5-belly.jpg",
  "IMG-Q5-arms": "IMG-Q5-arms.jpg",
  "IMG-Q5-butt": "IMG-Q5-butt.jpg",
  "IMG-Q5-face": "IMG-Q5-face.jpg",
  "IMG-Q18-home": "IMG-Q18-home.jpg",
  "IMG-Q18-gym": "IMG-Q18-gym.jpg",
  "IMG-Q18-none": "IMG-Q18-none.jpg",
};

/* Per-image zoom/position overrides for the cover-crop mode — tuned per
   source photo to crop out baked-in black mattes or excess backdrop
   without cutting off hands/heads. */
const ZOOM_OVERRIDES = {
  "IMG-01": 1.0, "IMG-02": 1.0, "IMG-03": 1.0, "IMG-04": 1.0,
  "IMG-Q5-legs": 2.2, "IMG-Q5-belly": 2.2, "IMG-Q5-arms": 2.2,
  "IMG-Q5-butt": 2.2, "IMG-Q5-face": 2.2,
};
const POSITION_OVERRIDES = {
  "IMG-Q5-legs": "center", "IMG-Q5-belly": "center", "IMG-Q5-arms": "center",
  "IMG-Q5-butt": "center", "IMG-Q5-face": "center",
};

/* Bump this on every deploy that changes an existing image file so the
   cache-busting query param forces browsers/CDN to fetch the new bytes
   instead of serving the stale cached version of the same filename. */
const ASSET_VERSION = "20260628b";

function renderPlaceholder(id, opts = {}) {
  const ph = PLACEHOLDERS[id];
  if (!ph) return `<div class="img-placeholder" style="height:120px;">missing: ${id}</div>`;
  const w = opts.w || ph.w;
  const h = opts.h || ph.h;
  if (REAL_IMAGES[id]) {
    const src = `assets/images/${REAL_IMAGES[id]}?v=${ASSET_VERSION}`;
    if (opts.natural) {
      const r = opts.noRadius ? "0" : "10px";
      const mw = opts.noRadius ? "100%" : `${w}px`;
      return `<img src="${src}" alt="${ph.label}" style="width:100%; max-width:${mw}; height:auto; display:block; border-radius:${r};">`;
    }
    const zoom = opts.zoom || ZOOM_OVERRIDES[id] || 1.25;
    const position = opts.position || POSITION_OVERRIDES[id] || "top center";
    const radius = opts.shape === "arch" ? "50% 50% 8px 8px" : "10px";
    const bg = opts.shape === "arch" ? "var(--sage-light, #e9efe6)" : "#ffffff";
    return `
      <div style="aspect-ratio:${w}/${h}; max-width:${w}px; width:100%; height:auto; border-radius:${radius}; overflow:hidden; background:${bg};">
        <img src="${src}" alt="${ph.label}" style="width:100%; height:100%; object-fit:cover; object-position:${position}; display:block; transform:scale(${zoom}); transform-origin:${position};">
      </div>`;
  }
  const phMw = opts.noRadius ? "100%" : `${w}px`;
  const phRadius = opts.noRadius ? "0" : "10px";
  return `
    <div class="img-placeholder" style="aspect-ratio:${w}/${h}; max-width:${phMw}; height:auto; border-radius:${phRadius};">
      <div class="ph-icon">&#128247;</div>
      <div class="ph-id">${id}</div>
      <div>${ph.label}</div>
      <div class="ph-dims">${w}&times;${h}px</div>
    </div>`;
}
