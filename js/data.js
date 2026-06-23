/* ===================================================================
   QUIZ DATA — Flowly (Tai Chi Walking) — réplica visual fiel
   v2: incorpora correcciones de fidelidad (íconos por opción, BMI box,
   objetivo realista, gráficas dedicadas, bottom-sheet, milestones, etc.)
=================================================================== */

const STEPS = [

  // ---------------- AGE / FIRST SCREEN ----------------
  {
    id: "age", type: "age-select", section: null,
    banner: "&#127873; Take the quiz - get your <b>printable guide</b>!",
    title: "TAI CHI WALKING FOR WEIGHT LOSS",
    subtitle: "BASED ON YOUR <b>AGE</b>",
    cards: [
      { value: "40-49", label: "Age: 40-49", img: "IMG-01" },
      { value: "50-59", label: "Age: 50-59", img: "IMG-02" },
      { value: "60-69", label: "Age: 60-69", img: "IMG-03" },
      { value: "70-80", label: "Age: 70-80", img: "IMG-04" },
    ],
    catchAll: "I'm 18-39",
    legal: "By choosing your age and continuing you agree to our Terms of Service | Privacy Policy. Please review before continuing."
  },

  // ---------------- SECTION: MY PROFILE ----------------
  { id: "q1", type: "single", binary: true, section: "My Profile", progress: 0.05,
    title: "Have you tried Tai Chi Walking before?",
    options: [{ v: "yes", l: "Yes" }, { v: "no", l: "No" }] },

  { id: "t1", type: "transition", section: "My Profile",
    img: "IMG-12",
    title: "Tai Chi Walking is not &ldquo;just walking&rdquo;",
    body: "Regular walking moves in a straight line. <b>Tai Chi Walking</b> adds slow rotational, spiral movement through the hips and spine &mdash; the movement pattern shown to release deep tension most workouts never touch.<br><br>&#10003; Combines walking with Tai Chi's rotational mechanics<br>&#10003; Joint-friendly &amp; adapted for 55s<br>&#10003; Just 20&ndash;30 mins a day" },

  { id: "q2", type: "multi", section: "My Profile", progress: 0.10,
    title: "What are your main focus areas?",
    options: [
      { v: "lose_weight", l: "Lose weight", emoji: "&#9878;&#65039;" },
      { v: "feel_healthier", l: "Feel healthier", emoji: "&#10084;&#65039;" },
      { v: "lower_stress", l: "Lower stress", emoji: "&#129704;" },
      { v: "boost_memory", l: "Boost memory & focus", emoji: "&#129504;" },
    ] },

  { id: "t2", type: "transition", section: "My Profile",
    img: "IMG-fascia",
    title: "Why fascia tension causes most movement pain in women 50+",
    body: "Underneath your muscles is a web of connective tissue called <b>fascia</b>. As it tightens with age and inactivity, it restricts movement and creates the stiffness most women mistake for &ldquo;just getting older.&rdquo;<br><br>Tai Chi Walking's rotational movement is specifically designed to release fascial tension &mdash; something linear walking, running, or static stretching rarely reaches.",
    source: "Fascia research, International Fascia Research Congress" },

  { id: "q3", type: "photo-grid", section: "My Profile", progress: 0.15,
    title: "Which best describes your current body type?",
    options: [
      { v: "thin", l: "Thin", img: "IMG-05a" },
      { v: "mid", l: "Mid-sized", img: "IMG-05b" },
      { v: "plump", l: "Plump", img: "IMG-05c" },
      { v: "plus", l: "Plus-sized", img: "IMG-05d" },
    ] },

  { id: "q4", type: "photo-grid", section: "My Profile", progress: 0.20,
    title: "What's your dream body?",
    options: [
      { v: "slim", l: "Slim", img: "IMG-06a" },
      { v: "toned", l: "Toned", img: "IMG-06b" },
      { v: "curvy", l: "Curvy", img: "IMG-06c" },
      { v: "smaller", l: "A few sizes smaller", img: "IMG-06d" },
    ] },

  { id: "q5", type: "multi", section: "My Profile", progress: 0.25,
    title: "Which areas would you like to focus on?",
    options: [
      { v: "legs", l: "Legs", img: "IMG-Q5-legs" },
      { v: "belly", l: "Belly", img: "IMG-Q5-belly" },
      { v: "arms", l: "Arms", img: "IMG-Q5-arms" },
      { v: "butt", l: "Butt", img: "IMG-Q5-butt" },
      { v: "face_neck", l: "Face and neck", img: "IMG-Q5-face" },
    ] },

  { id: "q6", type: "number-input", section: "My Profile", progress: 0.30,
    title: "What's your height?",
    units: ["ft", "cm"], placeholder: "e.g. 5'4\" or 163 cm" },

  { id: "q7", type: "number-input", section: "My Profile", progress: 0.33,
    title: "What's your current weight?",
    bmiBox: true,
    units: ["lb", "kg"], placeholder: "e.g. 176 lb or 80 kg" },

  { id: "q8", type: "number-input", section: "My Profile", progress: 0.36,
    title: "What's your goal weight?",
    subtitle: "An estimate will do &ndash; you can easily change this later.",
    realisticGoalBox: true,
    units: ["lb", "kg"], placeholder: "e.g. 150 lb or 68 kg" },

  { id: "loading1", type: "loading-single", section: "My Profile",
    text: "Losing just 5% of your weight can improve your health &mdash; and reduce your risk of many different health conditions",
    source: "American Heart Association" },

  { id: "prediction1", type: "prediction", section: "My Profile", chartType: "prediction",
    title: "We predict you'll hit {{goalWeight}} by {{date90}}",
    note: "Losing weight gradually can also lower blood pressure and improve cholesterol levels.",
    source: "*Looking at Flowly members like you &mdash; American Heart Association" },

  { id: "ba1", type: "before-after-quote", section: "My Profile",
    img: "IMG-07",
    quote: "A goal without a plan is just a wish.",
    body: "Women in their 55s may need an approach tailored to their unique needs." },

  // ---------------- SECTION: ACTIVITY ----------------
  { id: "q9", type: "single", section: "Activity", progress: 0.40,
    title: "When were you last in your best shape?",
    options: [
      { v: "lt1", l: "Less than a year ago", emoji: "&#128552;" },
      { v: "1to2", l: "1-2 years ago", emoji: "&#128558;" },
      { v: "gt3", l: "More than 3 years ago", emoji: "&#128543;" },
      { v: "never", l: "Never", emoji: "&#129336;&#8205;&#9792;&#65039;" },
    ] },

  { id: "q10", type: "single", section: "Activity", progress: 0.43,
    title: "Which best describes your typical day?",
    options: [
      { v: "sitting", l: "I spend most of the day sitting" },
      { v: "some", l: "I move around from time to time" },
      { v: "active", l: "I'm on my feet all day" },
    ] },

  { id: "q11", type: "multi", section: "Activity", progress: 0.46,
    title: "Which of these activities do you currently do?",
    options: [
      { v: "pet", l: "Walking my pet", emoji: "&#128054;" }, { v: "child", l: "Active time with child", emoji: "&#128118;" },
      { v: "stairs", l: "Climbing stairs frequently", emoji: "&#127979;" }, { v: "household", l: "Active household tasks", emoji: "&#129529;" },
      { v: "no", l: "No", emoji: "&#128683;" },
    ] },

  { id: "q12", type: "single", section: "Activity", progress: 0.49,
    title: "How often do you walk?",
    options: [
      { v: "daily", l: "Almost every day" }, { v: "3to4", l: "3-4x per week" },
      { v: "1to2", l: "1-2x per week" }, { v: "rarely", l: "Once a month or less" },
    ] },

  { id: "t3", type: "transition", section: "Activity",
    img: "IMG-t3",
    title: "Tai Chi Walking: as effective as high-impact workouts",
    body: "Slow movement can make a difference. By releasing fascial tension instead of just burning calories, Mindful Tai Chi Walking helps you feel healthier, lose weight, and supports longevity &mdash; without the joint impact of running or HIIT." },

  { id: "q13", type: "single", binary: true, section: "Activity", progress: 0.52,
    title: "I get out of breath from simply walking or climbing stairs",
    illustration: "IMG-08",
    options: [{ v: "no", l: "No" }, { v: "yes", l: "Yes" }] },

  { id: "q14", type: "single", binary: true, section: "Activity", progress: 0.55,
    title: "I feel like most workouts are too hard to stick with long term",
    illustration: "IMG-09",
    options: [{ v: "no", l: "No" }, { v: "yes", l: "Yes" }] },

  { id: "q15", type: "single", binary: true, section: "Activity", progress: 0.58,
    title: "I feel frustrated when I don't see visible progress from my workouts",
    illustration: "IMG-10",
    options: [{ v: "no", l: "No" }, { v: "yes", l: "Yes" }] },

  { id: "eligibility", type: "eligibility", section: "Activity", chartType: "eligibility",
    title: "Great news, you're eligible!",
    body: "Looks like you are a perfect fit for Walking Tai Chi&hellip; time to crush your goals.",
    note: "Based on Flowly's historical data for women in their 55s &mdash; start seeing results in just one week on your path to your {{goalWeight}} goal!" },

  // ---------------- SECTION: HEALTH & SAFETY ----------------
  { id: "q16", type: "single", binary: true, section: "Health & Safety", progress: 0.62,
    title: "Are you currently taking any medications?",
    subtitle: "Rest assured this information is for your safety.",
    options: [{ v: "yes", l: "Yes" }, { v: "no", l: "No" }] },

  { id: "q17", type: "single", section: "Health & Safety", progress: 0.65,
    title: "Do you have any physical or mobility restrictions?",
    subtitle: "Rest assured this information is for your safety.",
    options: [{ v: "yes", l: "Yes" }, { v: "no", l: "No" }, { v: "prefer_not", l: "Prefer not to answer" }],
    bottomSheet: {
      title: "Priorizando su salud y seguridad",
      body: "Adapte cualquier elemento de su plan a sus necesidades. Le recomendamos que consulte con su médico o fisioterapeuta antes de realizar cualquier cambio en su estilo de vida que pueda afectar su bienestar físico o su salud en general."
    } },

  { id: "t4", type: "transition", section: "Health & Safety",
    title: "A safer way to build balance and stability",
    body: "Gentle Tai Chi Walking strengthens your whole body while staying soft on your joints. A safe alternative to high-impact workouts, while being as effective." },

  { id: "q18", type: "multi", section: "Health & Safety", progress: 0.68,
    title: "Where do you prefer to exercise?",
    options: [
      { v: "home", l: "Home", img: "IMG-Q18-home" }, { v: "outside", l: "Outside", img: "IMG-Q18-outside" },
      { v: "gym", l: "Gym", img: "IMG-Q18-gym" }, { v: "none", l: "No preference", img: "IMG-Q18-none" },
    ] },

  { id: "t5", type: "transition", section: "Health & Safety",
    img: "IMG-t5",
    title: "Discover the benefits of indoor walking",
    body: "Tai Chi Walking makes your home a calming space for practice. It builds strength, balance, and focus, so you can move freely, even on quieter days." },

  { id: "q19", type: "single", section: "Health & Safety", progress: 0.71,
    title: "How many daily steps do you think you need?",
    options: [
      { v: "easy", l: "Easy: under 5,000" }, { v: "medium", l: "Medium: 5,000-10,000" },
      { v: "hard", l: "Hard: over 10,000" }, { v: "not_sure", l: "I'm not sure" },
    ] },

  { id: "t6", type: "transition", section: "Health & Safety",
    img: "IMG-t6",
    title: "The myth of 10,000 steps",
    body: "Surprisingly, the 10,000-steps-per-day rule came from a 1960s pedometer company's marketing, not science. Just 15 minutes of Tai Chi Walking can lift your metabolism and support weight loss." },

  { id: "q20", type: "like-dislike", section: "Health & Safety", progress: 0.74,
    img: "IMG-Q20-hero", caption: "Estiramientos y movilidad",
    title: "¿Te gusta o no te gusta?" },

  { id: "q21", type: "like-dislike", section: "Health & Safety", progress: 0.76,
    img: "IMG-Q21-hero", caption: "Respiración consciente",
    title: "¿Te gusta o no te gusta?" },

  { id: "q22", type: "like-dislike", section: "Health & Safety", progress: 0.78,
    img: "IMG-Q22-hero", caption: "Equilibrio",
    title: "¿Te gusta o no te gusta?" },

  { id: "q23", type: "like-dislike", section: "Health & Safety", progress: 0.80,
    img: "IMG-Q23-hero", caption: "Paso de fuerza constante",
    title: "¿Te gusta o no te gusta?" },

  { id: "prediction2", type: "prediction", section: "Health & Safety", chartType: "prediction", short: true,
    title: "You'll achieve your dream body even sooner than expected!",
    subtitleDynamic: "We predict you'll be {{goalWeight}} by {{date30}}",
    note: "Next, tell us more about your lifestyle so we can help you hit your goal even more effectively.",
    source: "*Based on Flowly members with similar goal" },

  // ---------------- SECTION: LIFESTYLE ----------------
  { id: "q24", type: "single", section: "Lifestyle", progress: 0.83,
    title: "Do you feel mentally tense or on edge?",
    options: [
      { v: "a_lot", l: "I feel that a lot lately" }, { v: "ups_downs", l: "I have some ups and downs" },
      { v: "steady", l: "I feel mostly steady" },
    ] },

  { id: "t7", type: "transition", section: "Lifestyle", chartType: "stress",
    title: "Reduce stress and cut anxiety by 42% just by walking",
    body: "Just 20 minutes of walking can lower cortisol and boost serotonin, improving mood, focus, and emotional resilience.",
    source: "British Journal of Sports Medicine" },

  { id: "q25", type: "single", section: "Lifestyle", progress: 0.85,
    title: "How much water do you drink daily?",
    subtitle: "It's important to consume enough fluid when walking",
    options: [
      { v: "coffee_tea", l: "I mainly drink coffee or tea" }, { v: "2glasses", l: "About 2 glasses" },
      { v: "2to6", l: "2 to 6 glasses" }, { v: "6plus", l: "More than 6 glasses" },
    ] },

  { id: "q26", type: "single", section: "Lifestyle", progress: 0.86,
    title: "How is your mood most days?",
    options: [
      { v: "low", l: "Low &mdash; I often feel down or irritable", emoji: "&#128267;" },
      { v: "updown", l: "Up and down &mdash; it depends on the day", emoji: "&#128267;" },
      { v: "steady", l: "Steady &mdash; I usually feel okay", emoji: "&#128267;" },
    ] },

  { id: "t8", type: "transition", section: "Lifestyle", chartType: "calm",
    title: "Feel calmer and more focused in just 2 weeks",
    body: "Walking boosts brain circulation and improves energy balance &mdash; helping you feel sharper, more motivated, and emotionally steady.",
    source: "Harvard Health Publishing" },

  { id: "q27", type: "single", section: "Lifestyle", progress: 0.88,
    title: "Do you wake up feeling rested?",
    options: [
      { v: "always", l: "Always" }, { v: "frequently", l: "Frequently" },
      { v: "infrequently", l: "Infrequently" }, { v: "never", l: "Never" },
    ] },

  { id: "q28", type: "multi", section: "Lifestyle", progress: 0.89,
    title: "Do you experience any of these sleep issues?",
    options: [
      { v: "no", l: "No, I sleep well" }, { v: "fall_asleep", l: "Difficulty falling asleep" },
      { v: "wake_tired", l: "Waking up tired" }, { v: "wake_night", l: "Waking up during the night" },
      { v: "hot_flashes", l: "Hot flashes / Night sweats" }, { v: "no_schedule", l: "Lack of sleep schedule" },
    ] },

  { id: "t9", type: "transition", section: "Lifestyle",
    title: "Walking can improve sleep quality by up to 25%",
    body: "Regular walking helps you fall asleep faster and get deeper, more restorative sleep &mdash; so you wake up refreshed and ready for the day.",
    source: "Sport Sciences for Health" },

  { id: "q29", type: "multi", section: "Lifestyle", progress: 0.90,
    title: "Do you follow any particular dietary pattern?",
    options: [
      { v: "no", l: "No" }, { v: "low_carb", l: "Low-carb" }, { v: "vegetarian", l: "Vegetarian" },
      { v: "plant", l: "Fully plant-based" }, { v: "pescatarian", l: "Pescatarian" },
      { v: "lactose_free", l: "Lactose-free" }, { v: "gluten_free", l: "Gluten-free" },
      { v: "keto", l: "Keto" }, { v: "other", l: "Other" },
    ] },

  { id: "q30", type: "single", section: "Lifestyle", progress: 0.91,
    title: "Generally, how many fruit and veggies do you eat a day?",
    options: [
      { v: "little", l: "None or a little" }, { v: "fair", l: "A fair bit" }, { v: "rabbit", l: "I might be a rabbit" },
    ] },

  { id: "t10", type: "transition", section: "Lifestyle",
    title: "Support your metabolism for lasting weight loss",
    body: "You'll also get a personalized nutrition plan that supports your energy, health, and long-term progress &mdash; <b>without strict diets or food restrictions.</b>" },

  { id: "q31", type: "multi", section: "Lifestyle", progress: 0.92,
    title: "What foods do you crave most often?",
    options: [
      { v: "sweet", l: "Sweet treats", emoji: "&#129399;" }, { v: "salty", l: "Salty snacks", emoji: "&#129385;" },
      { v: "fastfood", l: "Fast food", emoji: "&#127839;" }, { v: "wine", l: "I like my wine", emoji: "&#127863;" },
      { v: "soda", l: "Soda", emoji: "&#129380;" }, { v: "none", l: "None of the above", emoji: "&#129343;" },
    ] },

  { id: "q32", type: "multi", section: "Lifestyle", progress: 0.93,
    title: "Do you have any of the following habits?",
    options: [
      { v: "emotional", l: "Emotional or boredom eating", emoji: "&#128547;" },
      { v: "full", l: "Continuing to eat when full", emoji: "&#129360;" },
      { v: "latenight", l: "Late-night snacking", emoji: "&#127813;" },
      { v: "screen", l: "Mixing screen time with mealtime", emoji: "&#128187;" },
      { v: "skipping", l: "Skipping meals too often", emoji: "&#127860;" },
      { v: "none", l: "None of the above", emoji: "&#129343;" },
    ] },

  { id: "q33", type: "single", binary: true, section: "Lifestyle", progress: 0.94,
    title: "Do you wear a smartwatch or fitness tracker?",
    subtitle: "Like: Apple Watch, Fitbit, Samsung Galaxy, etc.",
    options: [{ v: "yes", l: "Yes" }, { v: "no", l: "No" }] },

  { id: "q34", type: "single", section: "Health & Safety", progress: 0.95,
    title: "Have you gone through menopause?",
    subtitle: "Hormonal changes can impact your metabolism and nutritional needs.",
    options: [
      { v: "no", l: "No" }, { v: "going", l: "Going through it" }, { v: "passed", l: "Already passed it" },
      { v: "not_sure", l: "Not sure" }, { v: "prefer_not", l: "Prefer not to answer" },
    ] },

  // ---------------- SECTION: ALMOST THERE ----------------
  { id: "t11", type: "transition-image", section: "Almost there",
    img: "IMG-12b",
    title: "Almost done!",
    body: "You're moments away from discovering your personalized path to looking and feeling your best.<br><br>Let's finish up by exploring what keeps you going, so we know how to better support you!" },

  { id: "q35", type: "multi", section: "Almost there", progress: 0.96,
    title: "What's your main reason for wanting to get in shape?",
    options: [
      { v: "confident", l: "Feel more confident in my body" }, { v: "healthier", l: "Feel healthier and more energetic" },
      { v: "look", l: "Change how I look" }, { v: "clothes", l: "Fit in my clothes better" }, { v: "other", l: "Other" },
    ] },

  { id: "q36", type: "multi", section: "Almost there", progress: 0.965,
    title: "What motivates you to exercise?",
    options: [
      { v: "health", l: "Improving health" }, { v: "immune", l: "Boosting immune system" },
      { v: "looking_better", l: "Looking better" }, { v: "strength", l: "Building strength and endurance" },
      { v: "postpartum", l: "Losing postpartum baby weight" }, { v: "stress", l: "Managing stress / improving mood" },
      { v: "example", l: "Setting a positive example for others" }, { v: "other", l: "Other" },
    ] },

  { id: "q37", type: "single", section: "Almost there", progress: 0.97,
    title: "Right now, how motivated are you to reach your happy weight?",
    options: [
      { v: "ready", l: "I'm 100% ready" }, { v: "hopeful", l: "I'm pretty hopeful about it" },
      { v: "unsure", l: "I'm a bit unsure" }, { v: "easy", l: "I'm kinda taking it easy" },
    ] },

  { id: "q38", type: "multi", section: "Almost there", progress: 0.975,
    title: "What made it hard for you to stay motivated to exercise in the past?",
    options: [
      { v: "no_results", l: "Didn't see noticeable results" }, { v: "yoyo", l: "I'd lose weight, but gain it back" },
      { v: "no_plan", l: "Didn't have a clear effective plan" }, { v: "too_hard", l: "Previous plans were too hard" },
      { v: "no_time", l: "Didn't have the time to exercise" }, { v: "coaching", l: "Ineffective coaching" },
      { v: "no_obstacles", l: "I didn't face any obstacles" },
    ] },

  { id: "t12", type: "transition-image", section: "Almost there",
    img: "IMG-13",
    title: "Why do people give up on their weight-loss efforts?",
    body: "<b>The #1 reason is starting too big too quickly.</b> That's exactly why our program's primary goal is to help you make sustainable changes to your lifestyle, so you can transform your body and enjoy thriving health - <i>for life.</i>" },

  { id: "q39", type: "multi", section: "Almost there", progress: 0.98,
    title: "While we're customizing your journey, what else do you want to explore?",
    subtitle: "Our holistic approach goes beyond weight loss to improve your well-being, mood, and health.",
    options: [
      { v: "energy", l: "Upping my energy levels" }, { v: "behaviors", l: "Cultivating healthy behaviors" },
      { v: "digestion", l: "Understand digestion" }, { v: "stress", l: "Reducing stress" },
      { v: "flexibility", l: "Improving flexibility" }, { v: "posture", l: "Getting better posture" },
    ] },

  { id: "q40", type: "single", section: "Almost there", progress: 0.99,
    title: "Your walking Tai Chi plan is ready!",
    subtitle: "It's designed to work at your pace. So, tell us: How quickly do you want to get in shape?",
    options: [
      { v: "fast", l: "As quickly as possible" }, { v: "slow", l: "Slow and steady does it" }, { v: "mid", l: "Somewhere between the two" },
    ] },

  { id: "t13", type: "transition-image", section: "Almost there",
    img: "IMG-14",
    title: "Perfect - we adjusted your plan to match your pace!",
    body: "And it doesn't stop here: we'll adapt your personal plan as your body and activity level change throughout your journey." },

  // ---------------- CLOSING SEQUENCE ----------------
  { id: "loading2", type: "loading-multi", section: null,
    title: "Creating your personalized action plan&hellip;",
    items: ["Analyzing Body Parameters", "Activity Preferences", "Health & Safety", "Generating Your Action Plan"],
    sideQuestion: { title: "Quick one while we finish up:", question: "How would you describe your energy by mid-afternoon?",
      options: [{ v: "low", l: "Usually low" }, { v: "ok", l: "Okay, but fades" }, { v: "good", l: "Pretty good" }] },
    socialProof: "Trusted by over 163,432 clients",
    testimonial: { stars: 5, quote: "Sin gimnasio, sin dietas extremas. Solo pequeños cambios cada día. 4,5 kg menos y estoy orgullosa.", name: "Emily Davis" },
    completeTitle: "&iexcl;Enhorabuena, tu plan est&aacute; completo!" },

  { id: "email", type: "email-capture", section: null,
    title: "Enter your email to get your personal Tai Chi Walking plan",
    badge: "Your action plan is ready",
    cta: "See my Plan" },

  { id: "name", type: "name-capture", section: null,
    title: "What's your name?" },

  { id: "goals", type: "goals", section: null, chartType: "goals",
    cta: "Get My Plan" },

  // ---------------- MILESTONE ANTICIPATION SEQUENCE ----------------
  { id: "milestone1", type: "milestone", section: null, week: 1, suffix: "you'll feel it", bold: false },
  { id: "milestone2", type: "milestone", section: null, week: 2, suffix: "you'll see it", bold: true },
  { id: "milestone3", type: "milestone", section: null, week: 3, suffix: "everyone else will notice too", bold: true },
  { id: "letsgo", type: "letsgo", section: null },

  { id: "checkout-loader", type: "loading-redirect", section: null },

  { id: "checkout", type: "checkout", section: null },

  { id: "upsell", type: "upsell", section: null },

  { id: "welcome", type: "thankyou", section: null },
];
