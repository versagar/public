// ================================
// Card Detail Layout System Script
// ================================
//Required - /1san9cha1la7k9/dbhhfcfcfabe.js

// Dummy dates
const batchTypes = ["UI", "Tech", "Design"];
const times = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"];

const dates = Array.from({ length: 12 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);

  return {
    Date: d.toISOString().split("T")[0],
    Time: times[i % times.length],
    BatchType: batchTypes[i % batchTypes.length],
    Info1: `Session Topic ${i + 1}`,
    image: `https://picsum.photos/seed/${i + 1}/800/600`
  };
});


const data1 = Array.from({ length: 12 }, (_, i) => ({
  title: `Title ${i + 3}`,
  subtitle: `Subtitle ${i + 1}`,
  description: `This is description text for item ${i + 1}.`,
  image: `https://picsum.photos/seed/${i + 1}/800/600`,
  tag: ["UI", "Tech", "Design"][i % 3]
}));



const data3 = data1.map(item => ({
  title: `<h2>${item.title}</h2>`,
  subtitle: `<h3>${item.subtitle}</h3>`,
  description: `<p>${item.description}</p>`,
  image: `<img src="${item.image}">`,
  tag: ''
}));






async function loadCourseTopics(jsonFile, containerId, slideFrameId, docFrameId, headingId) {
  function createOnclickTopic(name, gids, gidd){
gslidetwc(slideFrameId,gids);
gdoctwc(docFrameId,gidd);
document.getElementById(headingId).innerHTML = name;
}
  const response = await fetch(jsonFile);
  const fetchedJson = await response.json(); // ← ARRAY

  // Convert fetched data into card-friendly format
  const jsonData = fetchedJson.map(item => ({
    title: item.topic_name || "",
    subtitle: "", // not provided in JSON
    description: "",
    image: item.image_link || "",
    tag: "",
    onclick: () => createOnclickTopic(item.topic_name, item.id1, item.id2)
  }));

  //return jsonData;
  renderCards(jsonData, containerId)
}

// DOM references
const cardContainer = document.getElementById("cardContainer");
const controls = document.querySelector(".controls"); // Where we inject buttons
const slider = document.getElementById("styleSlider");
const styleLabel = document.getElementById("styleNum");
styleLabel.style.display = 'none';
const MAX_STYLE = 71; // Total number of styles


const data2 = dates.map(item => ({
  date: `
  <div class="date">
  <div class="calendar-icon">${new Date(item.Date).getDate()}</div>
  <h3>
  ${new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric"
  }).format(new Date(item.Date)).replace(" ", ", ")}
</h3>

  </div>
  `,
  time: `<h2>${item.Time}</h2>`,
  info1: `<p>${item.Info1}</p>`
}));

// --------------------------------
// Create unstyled card structure
// --------------------------------
function renderGenericCards(items, cardContainerId) {
  const container = document.getElementById(cardContainerId);
  container.innerHTML = "";

  items.forEach(item => {
    const article = document.createElement("article");

    article.innerHTML = Object.values(item)
      .map(el => `<div>${el}</div>`)
      .join("");

    if (typeof item.onclick === "function") {
      article.addEventListener("click", item.onclick);
      article.style.cursor = "pointer";
    }

    container.appendChild(article);
  });
}

renderCards(data1, "cardContainer");

function renderCards(items,cardContainerId) {
  const container = document.getElementById(cardContainerId);

  container.innerHTML = "";

  items.forEach(item => {
    const article = document.createElement("article");

    article.innerHTML = `
      <figure>
        <img src="${item.image}" alt="">
      </figure>
      <section>
        <h2>${item.title}</h2>
        <h4>${item.subtitle}</h4>
        <p>${item.description}</p>
        <span>${item.tag}</span>
      </section>
    `;

        // ✅ Attach click handler
    if (typeof item.onclick === "function") {
      article.addEventListener("click", item.onclick);
      article.style.cursor = "pointer";
    }
    container.appendChild(article);
  });
}
// --------------------------------
// Update style based on current slider
// --------------------------------
function updateStyle() {
  styleLabel.style.display = 'inline-block';
  const styleNumber = parseInt(slider.value);
  styleLabel.textContent = styleNumber;

  // Remove all style classes first
  for (let i = 1; i <= MAX_STYLE; i++) {
    cardContainer.classList.remove(`style-${i}`);
  }
  // Add selected style
  cardContainer.classList.add(`style-${styleNumber}`);
}

// --------------------------------
// Initialize slider logic
// --------------------------------
function initStyleSlider() {
  slider.min = 0;
  slider.max = MAX_STYLE;
  slider.value = 0;
  // updateStyle();

  slider.addEventListener("input", () => {
    updateStyle();
  });
}

// --------------------------------
// Create Next and Back buttons
// --------------------------------
function createNavButtons() {
  const backBtn = document.createElement("button");
  backBtn.textContent = "Back";
  backBtn.style.cursor = "pointer";
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.style.cursor = "pointer";

  // Append buttons to controls container
  controls.appendChild(backBtn);
  controls.appendChild(nextBtn);

  // Button click logic
  backBtn.addEventListener("click", () => {
    slider.value = Math.max(parseInt(slider.value) - 1, 1);
    updateStyle();
  });

  nextBtn.addEventListener("click", () => {
    slider.value = Math.min(parseInt(slider.value) + 1, MAX_STYLE);
    updateStyle();
  });
}

// --------------------------------
// Init
// --------------------------------
// loadCourseTopics('bcodertwc.json').then(jsonData => {
//renderCards(data2, 'cardContainer');
// });
//loadCourseTopics('bcodertwc.json','cardContainer','slideFrame','docFrame','topicName');

initStyleSlider();
createNavButtons();
 