//body color
//loading pages
// Added event listener for body onload
window.addEventListener('load', async function() { await loadIn('loadedBody','page.html'); 
    console.log('page loaded');
    await visitorTask()
  //  await loadScript('/returns.js');
   // console.log('returns js');
await loadScript('/twc/connect/diary/connector.js');
console.log('connector js');
await loadScript('/1san9cha1la7k9/dhwani.js');

await loadScript('index.js');
console.log('index js');
console.log('script loaded');
await setProfile();
});
//loading pages
function waitForFunction(fnName, interval = 100) {
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (typeof window[fnName] === 'function') {
        clearInterval(timer);
        resolve(window[fnName]);
      }
    }, interval);
  });
}

async function waitUntil(condition, intervalTime = 5) {
  return new Promise((resolve) => {
    function check() {
      if (condition()) {
        resolve();
      } else {
        setTimeout(check, intervalTime);
      }
    }
    check();
  });
}

// await waitUntil(() => someValue === true);
// console.log("Now it's true!");


function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));

        document.head.appendChild(script);
    });
}

function generateTopics(jsonData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `<div class="ttframe flex-we">`;

    jsonData.forEach((item, index) => {
        const ttId = `tt-${index}`;
        const ttpId = `ttp-${index}`;
        const ttsId = `tts-${index}`;

        html += `
        <a href="javascript:void(0)"
            onclick="twcttOpen('${ttsId}','${item.id1}','${item.id2}')">
            <div id="${ttId}" class="twctopic">
                <div id="${ttpId}" class="twctopicpre">
                    <img src="${item.image_link}" alt="${item.alt_text}" />
                </div>
                <div id="${ttsId}" class="twctopicsub">${item.topic_name}</div>
            </div>
        </a>
        `;
    });

    html += `</div>`;

    container.innerHTML = html;
}

function fileToTopics(jsonFilePath, containerId) {
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file: " + jsonFilePath);
            }
            return response.json();
        })
        .then(data => {
            generateTopics(data, containerId);
        })
        .catch(error => {
            console.error("Error loading topics:", error);
        });
}

async function loadTWCForm(
    formId,
    formname,
    cl_classes = 'bg-light bold text-primary pad3 round3',
    ci_classes = 'bg-secondary bold text-primary pad3 round3 wrap-normal',
    txtdir = '/san9g3rah345alay/forms/'
) {
    try {
        await loadScript('/san9g3rah345alay/forms/formactions.js');
        await waitForFunction('createAdvancedForm');

        const formPath = `${txtdir}${formname}.txt`;
        await createAdvancedForm(formId, formPath, cl_classes, ci_classes);
    } catch (err) {
        console.error('Failed to load TWC form:');
    }
}

function getAgeNumber(dobString) {
    const dob = new Date(dobString);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}
function getAgeYMText(dobString) {
    const dob = new Date(dobString);
    const today = new Date();

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();

    if (today.getDate() < dob.getDate()) {
        months--;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const mm = String(months).padStart(2, '0');
    return `${years}Y${mm}M`;
}


const apiRoutes = {
  "Dashboard": () => { window.location.href = "/twc/connect/dashboard"; },
  "Notifications": () => 'showPhyserNotifications()',
  "Schedule": () => { window.location.href = "/twc/connect/schedule"; },
  "Logout": async() => {await logout(); await setProfile();}
};


/* -----------------------------------------
   PROFILE BUTTON
----------------------------------------- */
async function setProfile(){
  const pageHeading = document.getElementById('pageHeading');
  if (!pageHeading) return;
const isLoggedIn =
  localStorage.getItem('physertwcloginstatus') === 'true';
const userProfile = JSON.parse(localStorage.getItem('physertwcuserlogdata') || '{}');
const iconLink = userProfile?.userInfo? userProfile.userInfo.icon: null;
// const dpOpener = document.createElement('div');
// dpOpener.className = 'right flex ov-hidden gap1 text2';



const dpOpener = document.querySelector('.user-profile-btn');
function setUserMenus(containerNode, routes){
  containerNode.innerHTML = '';
const closeBtn = document.createElement('button');
closeBtn.className = 'left btn bold line1 pad3 circle block text-primary';
closeBtn.innerHTML = '&times;';
closeBtn.onclick = () => {
containerNode.classList.add('hidden');
  dpOpener.classList.remove('hidden');
}

containerNode.appendChild(closeBtn);

Object.keys(apiRoutes).forEach(option => {
  const menuItem = document.createElement('div');
  menuItem.textContent = option;
  menuItem.className = 'pad3 ml3 btn mb1 bg-gradient grad-ws pw100';
menuItem.onclick = async () => {
  const action = routes[option];

  if (typeof action === "function") {
    await action();
  }

  containerNode.classList.add('hidden');
  dpOpener.classList.remove('hidden');
};

  containerNode.appendChild(menuItem);
});
}

console.log('Log In Status: '+ isLoggedIn);
if(isLoggedIn){
  console.log('Executing If');
  dpOpener.innerHTML = '';
const dpIcon = document.createElement('span');
dpIcon.className = 'ph80 square right btn';
// dpIcon.innerHTML = iconLink
//   ? `<img src="${iconLink}" />`
//   : '&#128100;';

  // image with base64 storage

                const base64 = iconLink || '&#128100';

                const img = document.createElement("img");
                img.className = 'profile-icon';
                img.src = base64;
                dpIcon.appendChild(img);


const userOption = document.createElement('span');
userOption.className = 'btn right';
userOption.innerHTML = '☰';

const menuContainer = document.createElement('div');
menuContainer.className = 'abs z100 top block pw25 mw-100 right hidden';

pageHeading.appendChild(menuContainer);

userOption.onclick = () => {
    menuContainer.classList.remove('hidden');
    setUserMenus(menuContainer, apiRoutes);
    dpOpener.classList.add('hidden');
}
dpOpener.appendChild(userOption);
dpOpener.appendChild(dpIcon);

} else {
  console.log('Executing else');
  dpOpener.innerHTML = '&#128100;';
  dpOpener.classList.add('btn');
dpOpener.title = 'Login / Register';
dpOpener.onclick = async () => {
openFrontLoginForm();
};
}
console.log('Profile Set');
}

async function openFrontLoginForm(){
   let loginForm = document.querySelector('#twcMainLoginContainer form');

  if (loginForm) {
    loginForm.remove();
  } else {

    loginForm = document.createElement('form');
    loginForm.className = 'grid2-m1 gap2 pw50 m1vw-75 ov-hidden pw50 center pad1 gap1 line2';

    document
      .getElementById('twcMainLoginContainer')
      .replaceChildren(loginForm);

    await openLoginForm(loginForm);

    await waitUntil(() => localStorage.getItem('physertwcloginstatus') === 'true');

    window.location.reload();

    dpOpener.onclick = () => {};

    await setProfile();
  }
}


function openPop(itemInside = "", classes = "", top = "50%", left = "50%") {
  // Remove old popup
  document.querySelector(".custom-popup")?.remove();
  document.querySelector(".popup-overlay")?.remove();

  // Create popup
  const pop = document.createElement("div");
  pop.className = `custom-popup ${classes}`;

  // Add content
  if (typeof itemInside === "string") {
    pop.innerHTML = itemInside;
  } else {
    pop.appendChild(itemInside);
  }

  // Styles
Object.assign(pop.style, {
  position: "fixed",
  top: top,
  left: left,
  zIndex: 1000,
  padding: "15px",
  background: "rgba(255,255,255,0.8)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  borderRadius: "12px"
});

  // Center correction only if default values
  if (top === "50%" && left === "50%") {
    pop.style.transform = "translate(-50%, -50%)";
  }

  // Overlay
  const overlay = document.createElement("div");
  overlay.className = "popup-overlay";

Object.assign(overlay.style, {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.3)", // slightly transparent
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Safari support
  zIndex: 999
});

  overlay.onclick = () => {
    pop.remove();
    overlay.remove();
  };

  document.body.appendChild(overlay);
  document.body.appendChild(pop);
}







// Visitors ---

async function visitorTask() {

  const ENDPOINT = "https://twc.physer.workers.dev";
  const LAST_URL_KEY = "physer_last_url";
  const SEEN_KEY = "physer_notice_seen";

  // --- Notice UI (clean + lightweight) ---
  function createNotice() {
    const el = document.createElement("div");
    el.className = "pad2 round2 bg-white shadow2 text-center";

    el.innerHTML = `
      <p class="text1 text-primary pad1 center text-center round1">
        We use minimal usage data to improve your experience.
      </p>
      <p class="text-accent mt1 bold">✓ Lightweight • ✓ Private • ✓ No tracking abuse</p>
      <i>Click outside to continue</i>
    `;

    return el;
  }

  // --- Data ---
function getData() {
  return {
    function: "trackVisit",

    formData: {
      timestamp: new Date().toISOString(),
      url: location.pathname + location.search,
      title: document.title,
      referrer: document.referrer || "direct"
    },

    userDetails: {
      ua: navigator.userAgent,
      lang: navigator.language,
      screen: window.innerWidth + "x" + window.innerHeight,
      time: new Date().toISOString()
    },

    extra: {
      host: location.hostname
    }
  };
}

  function send() {
    const data = getData();

    if (localStorage.getItem(LAST_URL_KEY) === data.url) return;
    localStorage.setItem(LAST_URL_KEY, data.url);

    try {
      navigator.sendBeacon(ENDPOINT, JSON.stringify(data));
    } catch {
      fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify(data),
        keepalive: true
      });
    }
  }

  // --- SPA Tracking ---
  function hookNavigation() {
    const trigger = () => send();

    const push = history.pushState;
    history.pushState = function () {
      push.apply(this, arguments);
      trigger();
    };

    const replace = history.replaceState;
    history.replaceState = function () {
      replace.apply(this, arguments);
      trigger();
    };

    window.addEventListener("popstate", trigger);
  }

  function initTracking() {
    send();
    hookNavigation();
  }

  // --- Init ---
  function init() {

    if (!localStorage.getItem(SEEN_KEY)) {
      openPop(createNotice()); // bottom center

      // mark seen immediately (no button dependency)
      localStorage.setItem(SEEN_KEY, "1");
    }

    initTracking();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();

};