// ⚠️ AUTO-GENERATED — DO NOT EDIT MANUALLY

const detailedTopicsButtons = [
  {
    "label": "Topics: Mechanical\n                Robotics",
    "json": "/twc/courses/topics/jsons/mroboticstwc.json",
    "args": [
      "topicsContainer",
      "ttFrame1",
      "ttFrame2",
      "topicsHead"
    ],
    "classes": "btn bg-primary pad2 text-secondary bold round2 shadow2 center"
  },
  {
    "label": "Topics: Programmable\n                Robotics",
    "json": "/twc/courses/topics/jsons/proboticstwc.json",
    "args": [
      "topicsContainer",
      "ttFrame1",
      "ttFrame2",
      "topicsHead"
    ],
    "classes": "btn bg-primary text-secondary bold pad2 round2 shadow2 center"
  }
];

function injectButtons() {
  const section = document.getElementById("detailedTopics");
  if (!section) return false; // Section not ready

  // Use existing container or create it
  let container = section.querySelector("#detailedTopics > div.grid-card-c1.pad1");
  if (!container) {
    container = document.createElement("div");
    container.className = "grid-card-c1 pad1";
    section.insertBefore(container, section.firstChild);
  } else {
    container.innerHTML = ""; // Clear existing buttons
  }

  // Append buttons
  detailedTopicsButtons.forEach(cfg => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = cfg.label;
    btn.className = cfg.classes;

    btn.addEventListener("click", () => {
      loadCourseTopics(cfg.json, cfg.args[0], cfg.args[1], cfg.args[2], cfg.args[3]);
    });

    container.appendChild(btn);
  });

  return true; // Buttons injected
}

// ✅ Run on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Try immediately
  if (!injectButtons()) {
    // Retry every 100ms until section exists
    const interval = setInterval(() => {
      if (injectButtons()) {
        clearInterval(interval); // Stop once injected
      }
    }, 100);
  }
});
