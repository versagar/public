
soundOnEvent('#regFormSection button[type="submit"], #regFormSection input[type="checkbox"]');
loadTWCForm('regForm','registrationform').then(() => {

    const dobFromForm = document.getElementById('regFormstudent_dob');
    const ageField = document.getElementById('regFormstudent_age');

    if (!dobFromForm || !ageField) return;

    dobFromForm.addEventListener('change', function () {
        const age = getAgeYMText(this.value);
        ageField.value = age;
    });

});



async function submitRegistrationForm(form) {

  // Add timestamp
  const timestamp = getIndianDateTime(new Date());

  const formData = new FormData(form);

  // ✅ Add timestamp into formData
  formData.append("timestamp", timestamp);

  const payload = {
    function: "register",
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
        <h3 style="margin:10px 0;">Registration Successful!</h3>
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


  const form = document.querySelector("#registrationForm");

  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      await submitRegistrationForm(form);
    });
  }
