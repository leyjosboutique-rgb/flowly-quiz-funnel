/* ===================================================================
   META PIXEL + CONVERSION TRACKING
   Pixel ID: 2759452127747935
=================================================================== */

const PIXEL_ID = "2759452127747935";

function trackQuizEvent(screen, block, extraData = {}) {
  const eventData = {
    screen: screen,
    block: block,
    pixel_id: PIXEL_ID,
    timestamp: new Date().toISOString(),
    ...extraData,
  };

  if (typeof fbq !== "undefined") {
    switch (block) {
      case "quiz_start":
        fbq("track", "ViewContent", {
          content_name: "Quiz Started",
          content_category: "flowly_quiz",
        });
        break;

      case "bmi_calculated":
        fbq("trackCustom", "QuizBMI", {
          screen: screen,
          bmi_range: extraData.bmi_range || "unknown",
        });
        break;

      case "prediction_1":
        fbq("track", "AddToCart", {
          content_name: "Quiz Prediction 1",
          content_category: "flowly_quiz",
          value: 9.99,
          currency: "USD",
        });
        break;

      case "email_capture":
        fbq("track", "Lead", {
          content_name: "Quiz Email Captured",
          content_category: "flowly_quiz",
          value: 9.99,
          currency: "USD",
        });
        break;

      case "goals_page":
        fbq("track", "InitiateCheckout", {
          content_name: "28-Day Flowly Plan",
          content_category: "flowly_quiz",
          value: 9.99,
          currency: "USD",
          num_items: 1,
        });
        break;

      case "purchase":
        fbq("track", "Purchase", {
          content_name: "28-Day Flowly Plan",
          value: extraData.value || 9.99,
          currency: "USD",
          num_items: 1,
        });
        break;

      default:
        fbq("trackCustom", "QuizProgress", {
          screen: screen,
          block: block,
          ...extraData,
        });
    }
  }

  // localStorage backup
  localStorage.setItem("flowly_last_screen", String(screen));
  localStorage.setItem("flowly_last_block", block);
  localStorage.setItem("flowly_updated_at", Date.now());

  if (!localStorage.getItem("flowly_started_at")) {
    localStorage.setItem("flowly_started_at", Date.now());
  }

  console.log("FLOWLY PIXEL " + PIXEL_ID + ":", eventData);
}

function trackPurchase(planName, value) {
  trackQuizEvent("checkout_complete", "purchase", {
    value: value,
    plan: planName,
  });
}

/* Map a quiz step to its tracking screen/block, based on this app's
   actual STEPS structure (section field + step id) rather than a fixed
   Q-number list, since the quiz content doesn't line up 1:1 with the
   original Q1-Q40 spec. */
function trackStep(step) {
  if (step.id === "age") { trackQuizEvent(0, "quiz_start"); return; }
  if (step.id === "prediction1") { trackQuizEvent("prediction_1", "prediction_1"); return; }
  if (step.id === "prediction2") { trackQuizEvent("prediction_2", "prediction_1"); return; }
  if (step.id === "eligibility") { trackQuizEvent("eligibility", "eligibility_passed"); return; }
  if (step.id === "loading2") { trackQuizEvent("loading", "plan_generating"); return; }
  if (step.id === "email") { trackQuizEvent("email", "email_capture"); return; }
  if (step.id === "name") { trackQuizEvent("name", "name_capture"); return; }
  if (step.id === "goals") { trackQuizEvent("goals", "goals_page"); return; }
  if (step.id === "checkout") { trackQuizEvent("checkout", "checkout_view"); return; }
  if (step.id === "upsell") { trackQuizEvent("upsell", "upsell_view"); return; }
  if (step.id === "thankyou") { trackQuizEvent("thankyou", "purchase", { value: 12.78 }); return; }

  const sectionBlock = {
    "My Profile": "my_profile",
    "Activity": "activity",
    "Health & Safety": "health_safety",
    "Lifestyle": "lifestyle",
    "Almost there": "almost_there",
  };
  if (step.section && sectionBlock[step.section]) {
    trackQuizEvent(step.id, sectionBlock[step.section]);
  }
}
