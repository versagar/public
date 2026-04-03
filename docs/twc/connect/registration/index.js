
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



async function addTimestampAndSubmit(form, func) {

  // ✅ Create timestamp
  const timestamp = getIndianDateTime(new Date());

  // ✅ Convert form → object
  const formObj = Object.fromEntries(new FormData(form).entries());

  // ✅ Prepend timestamp
  const payload = {
    function: func,
    formData: {
      timestamp,
      ...formObj
    },
    userDetails: {
      ua: navigator.userAgent,
      time: new Date().toISOString()
    },
    extra: null
  };

  // --- Show Submitting Popup ---
  openPop(`
    <div class="flex-center flex-column pad1 round1">
      <div class="bold">⏳</div>
      <p class="mt1 bold">Submitting...</p>
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
        <div class="flex-column flex-center pad1 gap1 round2 bg-white">
          <div>🎉</div>
          <h2 class="mt1 mb1 center">Callback Request Submitted!</h2>
          <p>
            Thank you for this move.<br>
            Our team will contact you shortly.
          </p>
        </div>
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
      await addTimestampAndSubmit(form, 'register');
    });
  }
