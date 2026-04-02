
/* -----------------------------------------
   SCHEDULE LOADER
----------------------------------------- */
let scheduleLoaded = false;
setProfileOption();

async function loadSchedule() {
  if (scheduleLoaded) return;
  scheduleLoaded = true;

  await loadScript('/1san9cha1la7k9/cardcat.js');
  console.log('cardcat loaded');

  async function renderDate1(datesJson, ContainerId, selectionBoxId) {
    const selectionBox = document.getElementById(selectionBoxId);

    const datesHtmlJson = datesJson.map(item => ({
      date: `
        <div class="date">
          <div class="calendar-icon">${new Date(item.Date).getDate()}</div>
          <h3>${new Intl.DateTimeFormat("en-US", {
            month: "long",
            year: "numeric"
          }).format(new Date(item.Date)).replace(" ", ", ")}</h3>
        </div>
      `,
      time: `<h2>${item.Time}</h2>`,
      batchType: `<h4>${item.BatchType}</h4>`,
      info1: `<p>${item.Info1}</p>`,
      onclick: (article) => {
        const selectedDate = document.createElement('div');
        selectedDate.textContent =
          article.querySelector('.date').textContent;

        selectedDate.addEventListener('click', () => {
          article.style.display = '';
          selectedDate.remove();
        });

        selectionBox.appendChild(selectedDate);
        sortDateBox(selectionBox);
        article.style.display = 'none';
      }
    }));

    renderGenericCards(datesHtmlJson, ContainerId);
  }

  function renderGenericCards(items, cardContainerId) {
    const container = document.getElementById(cardContainerId);
    container.innerHTML = "";

    items.forEach(item => {
      const article = document.createElement("article");

      article.innerHTML = Object.entries(item)
        .filter(([key]) => key !== "onclick")
        .map(([, value]) => `<div>${value}</div>`)
        .join("");

      if (typeof item.onclick === "function") {
        article.addEventListener("click", () => item.onclick(article));
        article.style.cursor = "pointer";
      }

      container.appendChild(article);
    });
  }

  async function loadDates() {
    const batchTypes = ["UI", "Tech", "Design"];
    const times = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM"];

    const datesJson = Array.from({ length: 12 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);

      return {
        Date: d.toISOString().split("T")[0],
        Time: times[i % times.length],
        BatchType: batchTypes[i % batchTypes.length],
        Info1: `Session Topic ${i + 1}`
      };
    });

    await renderDate1(datesJson, 'testContainer', 'selectionBox');
  }

  loadDates();
}


/* -----------------------------------------
   SELECTION OBSERVER
----------------------------------------- */
const datesAction = document.getElementById('datesAction');
const selectionBox = document.getElementById('selectionBox');

datesAction.style.display = 'none';

new MutationObserver(() => {
  datesAction.style.display =
    selectionBox.children.length ? 'block' : 'none';
}).observe(selectionBox, { childList: true });


/* -----------------------------------------
   PROFILE BUTTON
----------------------------------------- */
async function setProfileOption() {
  const pageHeading = document.getElementById('pageHeading');
  if (!pageHeading) return;

  // Remove old button
  const oldBtn = pageHeading.querySelector('[data-profile-btn]');
  if (oldBtn) oldBtn.remove();

  const profileBtn = document.createElement('span');
  profileBtn.dataset.profileBtn = 'true';
  profileBtn.dataset.hasOpenLoginForm = 'no';

  const isLoggedIn =
    localStorage.getItem('physertwcloginstatus') === 'true';

  // NOT LOGGED IN
  if (!isLoggedIn) {
    profileBtn.className = 'abs right round2 bg-light btn mr1';
    profileBtn.textContent = '👤';
    profileBtn.title = 'Login / Signup';
    profileBtn.addEventListener('click', () => {
      if (profileBtn.dataset.hasOpenLoginForm !== 'no') return;
      const loginForm = document.createElement('form');
      loginForm.className =
        'flex-column gap2 pw50 m1vw-75 ov-hidden pw80 center pad1 gap1 line2 bg-gradient grad-wl';
      openLoginForm(loginForm);
      document.getElementById('testContainer').appendChild(loginForm);
      profileBtn.dataset.hasOpenLoginForm = 'yes';
    });

    pageHeading.appendChild(profileBtn);
    return;
  }

  // LOGGED IN
  profileBtn.className = 'abs right btn';
  profileBtn.textContent = '👤 ☰';

  profileBtn.addEventListener('click', () => {
    // Implement profile dropdown here
    alert('Profile menu clicked');
  });

  pageHeading.appendChild(profileBtn);
}


/* -----------------------------------------
   LOGIN STATE HANDLING
----------------------------------------- */
window.addEventListener('login-status-changed', async (e) => {
  if (e.detail.loggedIn) {
    await loadSchedule();
    setProfileOption();
  }
});

