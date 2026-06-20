Build a multi-step marketing quiz funnel web app called **"Flowly"** — tagline "Move gently. Feel lighter." — for a product called "Tai Chi Walking for Weight Loss" (React + Tailwind, single-page app with internal step routing via state, no backend — all logic client-side with React state/useState).

# 4 STRATEGIC DIFFERENTIATORS vs. the competitor this is modeled on
These are not cosmetic — they are the core competitive positioning of Flowly. Weave them in exactly where noted below, don't bolt them on as an afterthought:

1. **Unique mechanism — Fascia Release.** The competitor's quiz never explains WHY their method works at a tissue/anatomical level. Flowly does: tension in the fascia (the connective tissue web under the muscles) is framed as the real, mostly-unaddressed cause of movement stiffness/pain in women 50+, and Tai Chi Walking's rotational movement is positioned as releasing it — something linear walking/running/static stretching doesn't reach. Introduce this in the early "My Profile" transition screens (see T2 below).
2. **Proprietary mechanism naming — "Tai Chi Walking", not generic "walking".** Every transition that mentions the method should reinforce that this is a named, specific technique (rotational/spiral movement through hips and spine) — not just "go for a walk." Explicitly contrast it with regular walking in the first transition screen (T1).
3. **Named authority figure from screen 0 — Dr. Sarah Mitchell, Movement & Mobility Specialist.** The competitor (Digesti/Digestiplan) has zero visible authority figure — no founder, no doctor, no expert byline anywhere in their funnel. Flowly fixes this gap by attributing the method to a named expert immediately on the first screen (a small "authority badge" card: avatar circle, name + credential, short italicized quote) and re-citing her as the source on key educational transition screens throughout the quiz (acts like a recurring "as recommended by" trust anchor).
4. **Market targeting note (not a build requirement, just context):** this product targets Ireland/UK/Canada rather than the US, to avoid direct traffic/CPM collision with the competitor's dominant US market. No code implication — just don't hardcode US-only assumptions (e.g. avoid "$" if you want it market-flexible, though USD pricing is fine for this prototype).

# BRAND
- Name: **Flowly**. Logo: a stylized green leaf-shaped "F" mark (two curved strokes forming an F with a small leaf accent) followed by the wordmark "Flowly" in a serif display font, with tagline "Move gently. Feel lighter." underneath in a lighter sage color. Use a simplified text-based version of this logo in the app header: a small leaf-accented "F" + "lowly" wordmark.
- Headings font: a warm serif display font (e.g. "Fraunces" from Google Fonts). Body font: a clean geometric sans-serif (e.g. "Plus Jakarta Sans" from Google Fonts). This typography should feel more distinctive/branded than a generic system font — it's a key visual differentiator from the generic competitor quiz this is modeled on.

# DESIGN SYSTEM
- Colors: sage-dark `#4a7c59`, sage `#6b9c7a`, sage-light `#e8f0e9`, cream `#f7f5ef`, cream-dark `#f1ede2`, text-dark `#1f2d22`, text-muted `#6b7a70`, pink `#d63b6e`, pink-light `#fde8ee`, red-urgency `#e0334d`, green-ok `#3aa66b`, border `#e2e2da`.
- Rounded corners (12-18px), soft shadows, mobile-first, max content width ~600px centered, generous white space.
- Sticky header with: back arrow (hidden on first/last screens), centered Flowly logo wordmark, a 3-segment progress bar + section label (e.g. "Lifestyle") that only shows during quiz questions.
- A sticky red/green countdown timer bar appears only during checkout.
- Image placeholders for photos the user will supply separately: dashed-border box, light beige diagonal stripe pattern, camera emoji, image ID, short description, exact pixel dimensions.

# IMAGE GENERATION — IMPORTANT
Two groups of images:

**Group A (provided separately by the project owner, do NOT generate):** the first-screen 4 age-based hero photos, all full-screen transition images (namaste pose, group of 3 women, woman with phone, before/after planning scene), the checkout before/after hero photos, and the 2 testimonial before/after photo pairs. Leave these as labeled placeholder boxes only.

**Group B (GENERATE THESE YOURSELF using your built-in image generation):** these are smaller supporting photos for specific quiz questions. Generate each as a small (~140x140px square or 4:5 portrait, as noted) photorealistic lifestyle photo and use it directly as the option's thumbnail image:

1. **Q5 "Which areas would you like to focus on?"** — 5 small close-up photos: a) toned legs close-up, b) abdomen/belly close-up on a person in fitted activewear, c) a toned arm close-up, d) glutes/hips close-up in leggings, e) a woman's face and neck in soft profile light. Neutral grey studio background, photorealistic, body-positive, no identifiable full faces except for option (e).
2. **Q18 "Where do you prefer to exercise?"** — 4 small lifestyle photos: a) a woman holding a rolled yoga mat at home, b) a woman with a small backpack exercising outdoors in a park, c) a woman using a cable/machine at a gym, d) a woman with a towel around her neck after a workout, relaxed. All same woman type (50s, athletic-casual), soft natural lighting, photorealistic.
3. **Q20-Q23 "Do you like or dislike this?"** — 4 large hero photos (560x300px, landscape) of a woman practicing Tai Chi in a bright minimalist room with large windows and a plant in the background, wearing a dark loose-fit Tai Chi uniform: a) a stretching/mobility pose, b) a calm breathing/meditation pose with eyes closed, c) a one-leg balance pose, d) a grounded strength/stance pose. Each photo should have a small dark caption pill overlay in the bottom-left corner with the pose name ("Estiramientos y movilidad", "Respiración consciente", "Equilibrio", "Paso de fuerza constante" respectively) — render that caption pill in your generated image OR leave it as an HTML overlay on top of the generated photo (HTML overlay preferred since it's dynamic text).

Generate Group B images at build time and wire them directly into the corresponding question components — no placeholder needed for these.

# APP FLOW (linear, single path, ~65 screens)
Build a `STEPS` config-driven engine: each step has a `type`. A generic `<QuizStep step={current} onNext={} onBack={} />` dispatches to the right renderer.

## 1. First screen (age-select)
- Pink/magenta gradient banner, larger and more eye-catching than a plain text line, with a big gift emoji icon: "🎁 Take the quiz - get your **printable guide**!"
- Headline (uppercase, serif display font): "TAI CHI WALKING FOR WEIGHT LOSS"
- Subtitle: "BASED ON YOUR **AGE**"
- 4 clickable photo cards (Group A placeholders) in a 2x2 grid: "Age: 40-49", "Age: 50-59", "Age: 60-69", "Age: 70-80"
- Secondary link, no photo: "I'm 18-39 ›"
- **Authority badge (Differentiator 3)**, placed below the age cards, above the legal footer: a small rounded card with a circular avatar icon, the name "Dr. Sarah Mitchell" + credential "Movement & Mobility Specialist" in smaller muted text next to it, and a short italicized quote below: "The method I developed after 15 years studying why women 50+ stop losing weight." This establishes authority before the user answers a single question.
- Footer legal text about Terms/Privacy.

## 2. Section "My Profile" (progress 5%–36%)
1. Single-choice, binary Yes/No style (see "Binary questions" note below): "Have you tried Tai Chi Walking before?"
2. **Transition (Differentiator 2 — mechanism naming):** headline "Tai Chi Walking is not 'just walking'" — body: "Regular walking moves in a straight line. Tai Chi Walking adds slow rotational, spiral movement through the hips and spine — the same movement pattern Dr. Sarah Mitchell identified as key to releasing deep tension most workouts never touch." + bullet list (combines walking with Tai Chi's rotational mechanics / joint-friendly & adapted for 55s / just 20-30 mins a day) + small attribution line "— Dr. Sarah Mitchell, Movement & Mobility Specialist"
3. Multi-choice **with an icon per option** (use simple flat icon illustrations or emoji — generate these as small inline icons, not photos): "What are your main focus areas?" — Lose weight (scale/feet icon) / Feel healthier (heart icon) / Lower stress (stacked stones icon) / Boost memory & focus (brain icon)
4. **Transition (Differentiator 1 — Fascia Release mechanism):** headline "Why fascia tension causes most movement pain in women 50+" — body: "Underneath your muscles is a web of connective tissue called fascia. As it tightens with age and inactivity, it restricts movement and creates the stiffness most women mistake for 'just getting older.' Tai Chi Walking's rotational movement is specifically designed to release fascial tension — something linear walking, running, or static stretching rarely reaches." + small source line "Fascia research, International Fascia Research Congress"
5. Photo-grid (Group A placeholders): "Which best describes your current body type?" — Thin / Mid-sized / Plump / Plus-sized
6. Photo-grid (Group A placeholders): "What's your dream body?" — Slim / Toned / Curvy / A few sizes smaller
7. **Multi-choice with Group B generated photos** (see Image Generation section): "Which areas would you like to focus on?" — Legs / Belly / Arms / Butt / Face and neck
8. Number input: "What's your height?" unit toggle ft/cm — store as `heightCm`
9. Number input: "What's your current weight?" unit toggle lb/kg — store as `currentWeight`. **Below the input, live-render a "BMI feedback box"** once a value is entered: icon + "Tu IMC es de {bmi}, lo que se considera {categoría}." + "Te queda trabajo por delante, pero es genial que estés dando el primer paso. Usaremos tu IMC para crear un programa de pérdida de peso personalizado." (Compute BMI from heightCm + the entered weight, live, as the user types.)
10. Number input: "What's your goal weight?" (subtitle: "An estimate will do - you can easily change this later.") unit toggle lb/kg — store as `goalWeight`. **Below the input, live-render a "¡Objetivo realista!" feedback box**: calculator icon + "¡Objetivo realista!" + "Los estudios han demostrado que perder un 5% o más del peso corporal puede reducir significativamente el riesgo de sufrir ataques cardíacos, niveles altos de azúcar en sangre e hipertensión arterial." + small source line "Fuente: Asociación Americana del Corazón (AHA)".
11. **Loading screen with animated walking-shoes illustration**: a small icon/illustration of two sneakers that visually animate side-to-side as if taking steps (simple CSS keyframe animation — rotate/translate alternating), inside a white card. Below it: text "Losing just 5% of your weight can improve your health — and reduce your risk of many different health conditions" (source: American Heart Association). Below that: a **wide, bold, rounded progress bar** (not a thin line) — dark green/black fill, with the live percentage number displayed in white text INSIDE the filled portion of the bar itself. Auto-advances at 100%.
12. **Prediction chart screen** (see "Chart components" section below for the exact visual spec — this is Chart Type A): headline "We predict you'll hit **{goalWeight}** by **{today+90days}**". Footnote: "*Looking at Flowly members like you — American Heart Association"
13. Before/after quote screen (Group A placeholder image) + quote "A goal without a plan is just a wish." + subtext.

## 3. Section "Activity" (progress 40%–58%)
1. Single-choice **with an emoji per option** illustrating the emotional tone: "When were you last in your best shape?" — Less than a year ago 😨 / 1-2 years ago 😮 / More than 3 years ago 😟 / Never 🤷‍♀️
2. Single: "Which best describes your typical day?" (no icons)
3. Multi **with emoji per option**: "Which of these activities do you currently do?" — Walking my pet 🐾 / Active time with child 👦 / Climbing stairs frequently 🏛️ / Active household tasks 🧹 / No 🚫
4. Single: "How often do you walk?" (no icons)
5. Transition: "Tai Chi Walking: as effective as high-impact workouts"
6. Binary Yes/No (with a small icon illustration ABOVE the question, not per-option — a simple 3D-style staircase icon): "I get out of breath from simply walking or climbing stairs"
7. Binary Yes/No (icon above: a small white flag illustration): "I feel like most workouts are too hard to stick with long term"
8. Binary Yes/No (icon above: a pair of green dumbbells illustration): "I feel frustrated when I don't see visible progress from my workouts"
9. **Eligibility screen with Chart Type C** (see Chart components): headline "Great news, you're eligible!" in sage-dark + "Looks like you are a perfect fit for Walking Tai Chi… time to crush your goals." + the 3-phase chart + note box with phone icon: "Basado en datos históricos de Flowly para mujeres de {edad} años. ¡Empieza a ver resultados en tan solo una semana y sigue perdiendo peso de forma constante hasta alcanzar tu objetivo de {goalWeight} kg!"

## 4. Section "Health & Safety" (progress 62%–80%, + one Q at 95%)
1. Binary Yes/No: "Are you currently taking any medications?"
2. Single-choice (3 options: Yes/No/Prefer not to answer — NOT binary, no big icons): "Do you have any physical or mobility restrictions?" subtitle "Rest assured this information is for your safety." **After the user picks an answer, open a bottom-sheet modal** (slides up from the bottom of the screen, dark overlay backdrop dimming the page behind it) titled "Priorizando su salud y seguridad" with body text: "Adapte cualquier elemento de su plan a sus necesidades. Le recomendamos que consulte con su médico o fisioterapeuta antes de realizar cualquier cambio en su estilo de vida que pueda afectar su bienestar físico o su salud en general." and a "Continuar" button that closes the sheet and advances.
3. Transition: "A safer way to build balance and stability"
4. **Multi-choice with Group B generated photos**: "Where do you prefer to exercise?" — Home / Outside / Gym / No preference
5. Transition: "Discover the benefits of indoor walking"
6. Single: "How many daily steps do you think you need?" (no icons)
7. Transition: "The myth of 10,000 steps"
8-11. **Four "Like/Dislike" screens with a special layout** (Q20-Q23 — see Image Generation Group B for the hero photos): one large hero photo at the top with a caption pill overlay in the bottom-left corner ("Estiramientos y movilidad" / "Respiración consciente" / "Equilibrio" / "Paso de fuerza constante" respectively), headline above it "¿Te gusta o no te gusta?", then below the photo 3 side-by-side buttons each with a large emoji on top and a label below: 👎 Aversión / 🤔 Neutral / 👍 Como.
12. **Prediction chart #2, Chart Type A again** (shorter timeframe): headline "You'll achieve your dream body even sooner than expected!" subtitle "We predict you'll be {goalWeight} by **{today+30days}**" + footnote "*Based on Flowly members with similar goal" + closing line "Next, tell us more about your lifestyle so we can help you hit your goal even more effectively."

## 5. Section "Lifestyle" (progress 83%–95%)
1. Single: "Do you feel mentally tense or on edge?" (no icons)
2. **Transition with Chart Type D (Cortisol/Serotonin crossing lines)** — see Chart components: "Reduce stress and cut anxiety by 42% just by walking" + body text + source "British Journal of Sports Medicine"
3. Single: "How much water do you drink daily?" (no icons)
4. Single **with a battery emoji per option** (color-coded conceptually): "How is your mood most days?" — Low 🔋 / Up and down 🔋 / Steady 🔋
5. **Transition with Chart Type E (Hoy → 2 semanas, red vs sage lines with emoji endpoints)** — see Chart components: "Feel calmer and more focused in just 2 weeks" + source "Harvard Health Publishing"
6. Single: "Do you wake up feeling rested?" (no icons)
7. Multi: "Do you experience any of these sleep issues?" (no icons) — include "Hot flashes / Night sweats" as one option
8. Transition: "Walking can improve sleep quality by up to 25%" — source "Sport Sciences for Health"
9. Multi: "Do you follow any particular dietary pattern?" (no icons, 9 options)
10. Single: "Generally, how many fruit and veggies do you eat a day?" (no icons)
11. Transition: "Support your metabolism for lasting weight loss"
12. Multi **with emoji per option**: "What foods do you crave most often?" — Sweet treats 🧁 / Salty snacks 🥨 / Fast food 🍟 / I like my wine 🍷 / Soda 🥤 / None of the above 🙅
13. Multi **with emoji per option**: "Do you have any of the following habits?" — Emotional or boredom eating 😪 / Continuing to eat when full 🫃 / Late-night snacking 🌙 / Mixing screen time with mealtime 💻 / Skipping meals too often 🍽️ / None of the above 🙅
14. Binary Yes/No: "Do you wear a smartwatch or fitness tracker?"
15. Single (5 options, not binary): "Have you gone through menopause?" — No / Going through it / Already passed it / Not sure / Prefer not to answer

## 6. Section "Almost there" (progress 96%–99%)
1. Transition-image (Group A placeholder — namaste pose): "Almost done!"
2. Multi: "What's your main reason for wanting to get in shape?" (no icons)
3. Multi: "What motivates you to exercise?" (no icons, 8 options)
4. Single: "Right now, how motivated are you to reach your happy weight?" (no icons)
5. Multi: "What made it hard for you to stay motivated to exercise in the past?" (no icons, 7 options)
6. Transition-image (Group A placeholder — 3 women laughing): "Why do people give up on their weight-loss efforts?" — "**The #1 reason is starting too big too quickly.**" + body
7. Multi: "While we're customizing your journey, what else do you want to explore?" (no icons)
8. Single: "Your walking Tai Chi plan is ready!" — "How quickly do you want to get in shape?" (no icons)
9. Transition-image (Group A placeholder — woman with phone): "Perfect - we adjusted your plan to match your pace!"

## 7. Closing sequence (no progress bar)

**Loading-multi screen** (this is a key psychological moment — simulate REAL processing time, don't snap instantly):
- Title: "Creating your personalized action plan…"
- 4 progress bars that fill SLOWLY and sequentially over ~1.8-2.4 seconds EACH (not instant) labeled: "Analyzing Body Parameters", "Activity Preferences", "Health & Safety", "Generating Your Action Plan" — each shows a live ticking percentage + spinner icon while filling.
- ~0.5s in, fade in a side card (mint/sage-light background, rounded): "Quick one while we finish up: How would you describe your energy by mid-afternoon?" with 3 selectable white pill options — cosmetic only, doesn't block progress.
- ~1.2s in, below that, fade in: "Trusted by over 163,432 clients" AND a testimonial card with 5 gold stars + quote: "Sin gimnasio, sin dietas extremas. Solo pequeños cambios cada día. 4,5 kg menos y estoy orgullosa." — Emily Davis. This stays visible through completion.
- When all 4 bars hit 100%: **trigger a colorful confetti burst animation** (falling/rotating colored rectangles across the screen, CSS-animated, ~3 seconds) AND change the headline to "¡Enhorabuena, tu plan está completo!" Auto-advance ~1.5s after that.

**Email capture**: green checkmark badge "Your action plan is ready", headline "Enter your email to get your personal Tai Chi Walking plan", email input, CTA "See my Plan", fine print mentioning Flowly + Terms/Privacy.

**Name capture**: "What's your name?", text input, Continue.

**Goals page** — uses **Chart Type B** (see Chart components, distinct from the Prediction chart): headline "{name}, reach your goal of **{goalWeight}kg** by {today+30days}" + "And build a body you feel good living in" + the chart + feature box (Slim down and tone up / Fat-burning workouts no equipment / Customized nutrition / 24/7 Wellness Assistant) + CTA "Get My Plan".

**Milestone anticipation sequence** (3 minimal screens right before checkout, building urgency/anticipation): each screen shows just the Flowly logo at the top and one bold line of text positioned toward the bottom of an otherwise empty cream-colored screen, auto-advancing after ~1.8s each with the text font-weight escalating (lighter → bolder) across the sequence:
  1. "By **{today+7days}**, you'll feel it" (lighter weight, mint-colored date)
  2. "By **{today+14days}**, you'll see it" (bold, green-colored date)
  3. "By **{today+21days}**, everyone else will notice too" (bold, green-colored date)
  4. Final screen: big centered text "Let's go! ✨" with a confetti burst, auto-advances to checkout (~1.4s).

## 8. CHECKOUT PAGE
(Same structure as before — keeping this section largely unchanged from prior spec, just rebrand "Digesti" → "Flowly" everywhere)
- Sticky top bar: "⏲ Introductory offer expires in **MM:SS**" counting down from 10:00, looping.
- Headline: "Your personalized Tai Chi walking workout plan is ready"
- Before/After photo row (Group A placeholders) with Body fat/Energy level stat bars (red→green).
- "Your plan includes" feature box.
- Red urgency bar mirroring the timer.
- 3 selectable pricing cards: 1-week ~~$21.99~~ $5.19 ($0.74/day) / 4-week MOST POPULAR (default selected) ~~$49.95~~ $9.99 ($0.36/day) / 12-week ~~$84.95~~ $19.99 ($0.24/day).
- "30-DAY MONEY-BACK GUARANTEE" link, pink "GET MY PLAN" CTA that smooth-scrolls to checkout form.
- Press logo row (Business Insider, NYT, Women'sHealth, Men'sHealth, Shape).
- "Success stories" — 2 testimonial cards (Group A before/after placeholders): Martha S. -40lbs, Suzy B. -60lbs, full quotes as in prior spec.
- "Customer reviews" — 3 review cards (Brenda Ross, Sandra Jane, AmeliaXC) with full quotes as in prior spec.
- "Get visible results in 4 weeks" — "Perfect for: Women Over 55" / "Goal: Lose 8kg".
- Checkout form: live order summary (plan, strikethrough original price, "Discount (-80%)", service fee, bold Total), PayPal/Google Pay buttons, mock card fields (non-functional), CTA "Submit secure payment 🔒", trust row, dynamic fine print mentioning Flowly's auto-renewal terms, "100% Money Back Guarantee" box, footer "Copyright © 2026 Flowly. All rights reserved."
- Submitting advances to the Upsell screen — no real payment processing, this is a funnel mockup.

## 9. UPSELL PAGE (Spanish copy — keep in Spanish)
Identical structure to prior spec: 3-step progress indicator, "Alcanza tu objetivo más rápido…" headline, bundle list (Plan quema grasa / Informe de liberación de estrés / Plan nutricional semanal / Postres dulces y saludables), price row with -56% badge → $1.25/día, pink CTA "Empezar la transformación ✨", decline link "Continuar sin guías esenciales" (opens downsell modal, does not advance), bullet list, "Política de reembolso" — replace any "Digesti" mentions with "Flowly".

### Downsell modal
Identical to prior spec: "¡70% de descuento extra aplicado!" modal with "Reclamar ahora" CTA that updates the upsell page's price/badge/fine-print in place to -70% / $0.86/día without advancing; small "SALTAR ›" closes modal and advances.

## 10. Thank you / Welcome screen (final)
"✅ ¡Bienvenido a Flowly!" + welcome card with plan contents list + order summary box (plan, amount charged $12.78, next billing $49.95 in 28 days) + "Reiniciar demo" button resetting all state to step 1.

---

# CHART COMPONENTS — build these as 5 distinct reusable chart sub-components (SVG-based)

**Chart Type A — "Prediction" chart** (used: Prediction #1, Prediction #2): a single smooth green descending curve. At the start point, a small circular dark badge with a walking-person icon/emoji (🚶‍♀️) inside it. At the end point, a dark speech-bubble label pointing down that reads "Goal {weight}kg". A plain weight value label at the top-left of the chart (e.g. "70kg"). Simple axis labels below: "Now" and the target date/month. No shading, no second line, no axis grid beyond a few faint vertical lines.

**Chart Type B — "Goals page" chart** (used only on the post-quiz Goals page, visually richer than Type A): a green curve with a light-green shaded confidence band beneath/around it, PLUS a pink dashed comparison line above representing the "without taking action" scenario (relatively flat/slightly rising). Two dark label bubbles: one at the start "Ahora {weight}kg" and one at the goal point "Objetivo: {weight}kg". Axis labels "Ahora" / target month.

**Chart Type C — "Eligibility" chart** (used only on the eligibility screen): a single curve that visually transitions in COLOR from red/orange at the start to green at the end (use a gradient stroke), across 3 labeled phases on the x-axis: "1 week", "4 weeks", "12 weeks". An annotation with a rocket emoji "🚀 First results" pointing (with a thin connecting line) at the point on the curve roughly at the "1 week" mark, where the color is transitioning from orange to green.

**Chart Type D — "Stress" chart** (Cortisol vs Serotonin, used in the stress-reduction transition): two crossing lines forming an X pattern over a dotted/faint vertical grid, x-axis labeled "0min, 5min, 10min, 15min, 20min, 25min". One line (blue, labeled "Cortisol" with a cloud emoji ☁️) and one line (purple, labeled "Serotonin" with a sun emoji ☀️), each with a soft outer glow effect.

**Chart Type E — "Calm" chart** (used in the "feel calmer in 2 weeks" transition): two lines on a simple x-axis labeled "Hoy" → "Después de 2 semanas". A red/coral line labeled "No hay actividad" (in a small pill-shaped label directly on the chart) that stays relatively high/jagged and ends near an angry-face emoji 😠. A sage/purple line labeled "Plan de caminata" (pill label) that smoothly descends and ends near a smiling-face emoji 😊.

# BINARY QUESTIONS — visual treatment
Any question with exactly Yes/No options (or visually similar binary framing) should render with a LARGE checkmark icon (✅ or a bold green ✓) next to "Yes"/"Sí" and a LARGE X icon (❌) next to "No" — bigger and more visually prominent than the standard small checkbox indicator used on other multi/single-choice questions. This applies to: "Have you tried Tai Chi Walking before?", "I get out of breath…", "I feel like most workouts are too hard…", "I feel frustrated when I don't see…", "Are you currently taking any medications?", "Do you wear a smartwatch or fitness tracker?".

# TECHNICAL NOTES
- Use React state for: current step index, all answers, currentWeight, goalWeight, heightCm, selected plan id, name, email.
- `interpolate(text)` helper replaces `{goalWeight}`, `{currentWeight}`, `{date+N}` tokens with live computed values.
- Most single-choice questions auto-advance ~250-300ms after selection — EXCEPT the "physical/mobility restrictions" question (opens the bottom sheet instead) and number-input/email/name steps (need an explicit Continue/CTA).
- Multi-choice questions require a Continue button (disabled until ≥1 option selected).
- No backend, no real payment processing — this is a fully client-side funnel simulation/prototype for internal marketing research.
