
        const phrases = ["Build Real Robots", "Think Like Engineers", "Create, Not Consume", "Future Skills Start Here"];
        
        function showTypingText(phrases){
            let i = 0, j = 0, del = false;
        function type() {
            let el = document.getElementById('dynamic-text'); if (!el) return; let p = phrases[i]; el.textContent = del ? p.substring(0, j--) : p.substring(0, j++);
            if (!del && j > p.length) setTimeout(() => del = true, 1200);
            else if (del && j < 0) { del = false; i = (i + 1) % phrases.length }
            setTimeout(type, del ? 60 : 120)
        }
        type();
        }
        showTypingText(phrases);
  
// -- Camp Week Options Start
const IST_OFFSET = 5.5 * 60 * 60 * 1000; // IST offset in ms

function toISTDate(date) {
    return new Date(date.getTime() + IST_OFFSET);
}

function formatDateIST(date) {
    const istDate = toISTDate(date);
    return istDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).replace(/\s/g, ''); // optional: remove spaces if you want 13Apr2026 format
}

function populateCampWeeks() {
    const select = document.getElementById("campWeekInput");

    let startDate = new Date(Date.UTC(2026, 3, 12)); // April 12, 2026 UTC
    const endDate = new Date(Date.UTC(2026, 6, 31)); // July 31, 2026 UTC

    // Move to first Monday (IST)
    while (toISTDate(startDate).getDay() !== 1) {
        startDate.setUTCDate(startDate.getUTCDate() + 1);
    }

    while (startDate <= endDate) {
        let monday = new Date(startDate);
        let friday = new Date(startDate);
        friday.setUTCDate(monday.getUTCDate() + 4);

        if (friday > endDate) break;

        const displayText = `${formatDateIST(monday)} - ${formatDateIST(friday)}`;

        const option = document.createElement("option");
        option.value = displayText;   // ✅ simple readable string
        option.textContent = displayText;

        select.appendChild(option);

        // Move to next week
        startDate.setUTCDate(startDate.getUTCDate() + 7);
    }
}

populateCampWeeks();
// -- Camp Week Options End
function getIndianDateTime(date) {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata"
  });
}

// --- Submit Logic ---
async function submitTWCForm(form) {

  // Add timestamp
  const timestampInput = form.querySelector('input[name="Timestamp"]');
  if (timestampInput) {
    timestampInput.value = getIndianDateTime(new Date());
  }

  const formData = new FormData(form);

  const payload = {
    function: "bookEvent",
    formData: Object.fromEntries(formData.entries()),
    userDetails: {
      ua: navigator.userAgent,
      time: new Date().toISOString()
    },
    extra: null
  };

  // --- Show Submitting Popup ---
  openPop(`
    <div style="text-align:center; min-width:250px;">
      <div style="font-size:2rem;">⏳</div>
      <p style="margin-top:10px; font-weight:600;">Submitting your enrollment...</p>
    </div>
  `);

  try {
    const response = await fetch("https://twc.physer.workers.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    // --- Success UI ---
    if (result && !result.toLowerCase().includes("error")) {

      const successBox = document.createElement("div");
      successBox.style.textAlign = "center";
      successBox.style.minWidth = "260px";

      successBox.innerHTML = `
        <div style="font-size:3rem;">🎉</div>
        <h3 style="margin:10px 0;">Enrollment Successful!</h3>
        <p style="font-size:0.95rem;">
          Thank you for registering.<br>
          Our team will contact you shortly.
        </p>
      `;

      openPop(successBox);

    } else {
      throw new Error(result);
    }

  } catch (err) {

    // --- Error UI ---
    openPop(`
      <div style="text-align:center; min-width:250px;">
        <div style="font-size:2rem;">⚠️</div>
        <p style="margin-top:10px; font-weight:600;">
          Something went wrong.<br>Please try again.
        </p>
      </div>
    `);

  }

}


  const form = document.querySelector("#enrollment-form form");

  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      await submitTWCForm(form);
    });
  }

