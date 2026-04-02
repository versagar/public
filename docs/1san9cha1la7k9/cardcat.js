
async function loadCourseTopics(jsonFile, containerId, slideFrameId, docFrameId, headingId) {
  function createOnclickTopic(name, gids, gidd){
gslidetwc(slideFrameId,gids);
gdoctwc(docFrameId,gidd);
document.getElementById(headingId).innerHTML = name;
window.location.href = "#topicDetails";
}
  const response = await fetch(jsonFile);
  const fetchedJson = await response.json(); // ← ARRAY

  // Convert fetched data into card-friendly format
  const jsonData = fetchedJson.map(item => ({
    title: '<span class="text2">'+ item.topic_name +'</span>' || "",
    subtitle: "", // not provided in JSON
    description: "",
    image: item.image_link || "",
    tag: "",
    onclick: () => createOnclickTopic(item.topic_name, item.id1, item.id2)
  }));

  //return jsonData;
  renderCards(jsonData, containerId);
}

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

function equalizeCardHeights(containerId) {
  const cards = document.querySelectorAll(`#${containerId} article`);
  let maxHeight = 0;

  // Reset first
  cards.forEach(card => (card.style.height = "auto"));

  // Find max
  cards.forEach(card => {
    const h = card.offsetHeight;
    if (h > maxHeight) maxHeight = h;
  });

  // Apply max height to all
  cards.forEach(card => (card.style.height = maxHeight + "px"));
}



//load buttons from json

function createButtons(buttonsJson,containerId) {
  const section = document.getElementById(containerId);
  if (!section) return false; // Section not ready

   let container = document.createElement("div");
    container.className = "grid-card-c1 pad1";
    section.insertBefore(container, section.firstChild);

  // Append buttons
  buttonsJson.forEach(cfg => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = cfg.label;
    btn.className = cfg.classes;

    btn.addEventListener("click", () => {
      cfg.func;
    });

    container.appendChild(btn);
  });

  return true; // Buttons injected
}

async function loadProfiles(containerId, jsonFile) {
  try {
    const response = await fetch(jsonFile);
    if (!response.ok) throw new Error("Failed to fetch JSON");

    const fetchedJson = await response.json();

    const jsonData = fetchedJson.map(item => ({
      title: item.name
        ? `<span class="text3">${item.name}</span>`
        : "",

      subtitle: item.role || "",

      description: item.about || "",

      image: item.image || "",

      tag: item.courses
        ? item.courses
            .split(",")
            .map(course => `<span class="pad2 ml1">${course.trim()}</span>`)
        : [],

      onclick: () =>
        createOnclickTopic(
          item.topic_name,
          item.id1,
          item.id2
        )
    }));

    renderCards(jsonData, containerId);
    equalizeCardHeights('tutors');

  } catch (error) {
    console.error("Error while loading tutor profile");
  }
}
