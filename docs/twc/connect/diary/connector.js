// const suchnaKendra = 'https://api.physer.workers.dev'; // base URL
// await loadScript('/return.js');
// await waitUntil(() => loadScript('/return.js'));
const suchnaKendra = 'https://api.physer.workers.dev'; // base URL


async function connectMe(type, endpoint, payload = {}) {
  type = type.toUpperCase();
  let url = suchnaKendra + endpoint;

  const options = {
    method: type,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  };

  // GET → query params
  if (type === "GET") {
    const query = new URLSearchParams(payload).toString();
    url += `?${query}`;
  }

  if (["POST", "PUT", "PATCH"].includes(type)) {
    options.body = JSON.stringify({
      data: payload || {},
      localReturn: localStorage.getItem('physertwclconnectorcode')
    });
  }


  try {
    const response = await fetch(url, options);

    const resp = await response.json();
    console.log(resp);
    if (resp?.localCode) {
      localStorage.setItem('physertwclconnectorcode', resp.localCode);
    }

    return resp.vastu;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

function getCurrentUserContext() {
    return {
        // App-level info
        timestamp: new Date().toISOString(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

        // Page context
        url: window.location.href,
        path: window.location.pathname,
        referrer: document.referrer || null,

        // Basic device info
        userAgent: navigator.userAgent,
        language: navigator.language,

        // Example: app-specific state (safe only!)
        appState: {
            theme: localStorage.getItem('theme') || 'default'
        },

        // Example: user info (ONLY if safe)
        user: {
            id: localStorage.getItem('userId') || null
        }
    };
}

async function submitForm(formSelector, type = 'POST', endpoint, additionalData = {}) {
    const form = document.querySelector(formSelector);
    if (!form) return console.error('Form not found');

    const formData = new FormData(form);
    const payload = {};

    for (let [key, value] of formData.entries()) {
        if (payload[key]) {
            if (!Array.isArray(payload[key])) payload[key] = [payload[key]];
            payload[key].push(value);
        } else {
            payload[key] = value;
        }
    }

    // Merge everything
    Object.assign(
        payload,
        additionalData,
        {
            _context: getCurrentUserContext()
        }
    );

    return await connectMe(type, endpoint, payload);
}

async function frontLogin(username, password, riktika) {

  const data = await connectMe('POST', 'login', {
    loginId: username,
    password: password,
    riktika: riktika });

  if (data.callResult !== 'LOGGED_IN') {
    localStorage.setItem('physertwcloginstatus', false);
    return 'login_failed';
  }

  localStorage.setItem('physertwcloginstatus', true);
  localStorage.setItem('physertwcuserlogdata', JSON.stringify(data.data));
  window.location.reload;
  // await setProfile();
  return 'success';
  // use JSON.parse(localStorage.getItem('physertwcuserlogdata')) to get
}

async function logout(){
  const resp = await connectMe('GET', 'logout');
  if (resp.callResult == 'LOGGED_OUT'){
localStorage.setItem('physertwcloginstatus', false);  
localStorage.setItem('physertwcuserlogdata', null);
window.location.reload();
return 'Logged Out Successfully';
}else {return 'Could not log out. Please Try again';}
}

async function openLoginForm(form) {
  const fields = ['Student Id', 'Password', 'riktika'];

  fields.forEach(field => {
    const id = field.replace(/\s+/g, '');
    const input = document.createElement('input');

    input.name = field;
    input.id = id;
    input.autocomplete = 'off';

    if (field === 'Password') {
      input.type = 'password';
    } else {
      input.type = 'text';
    }

    // Honeypot field (no label)
    if (field === 'riktika') {
      input.tabIndex = -1;
      input.style.position = 'absolute';
      input.style.left = '-9999px';
      form.appendChild(input);
      return;
    }

    // Normal visible fields
    const lbl = document.createElement('label');
    lbl.htmlFor = id;
    lbl.textContent = field;

    input.placeholder = `${field} here...`;

    form.appendChild(lbl);
    form.appendChild(input);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Login';

  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const loginId = formData.get('Student Id');
    const password = formData.get('Password');
    const riktika = formData.get('riktika');

    try {
      const login = await frontLogin(loginId, password, riktika);
      form.innerHTML = login=='success'?  `<h2 class="blink hide-after text-primary">Login successful</h2>`:'<h2>Login Failed</h2>';
    } catch (err) {
      form.insertAdjacentHTML(
        'beforeend',
        `<p>Login failed</p>`
      );
    }
  });


  form.appendChild(submitBtn);
}