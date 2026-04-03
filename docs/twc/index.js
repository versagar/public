document.addEventListener('DOMContentLoaded', async function() {
    await waitForFunction('loadProfiles');
    await loadProfiles('tutors','/san9g3rah345alay/objects/teachers.json');
    

    // Add hover effects to feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to course categories
    document.querySelectorAll('.course-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to neuro features
    document.querySelectorAll('.neuro-feature').forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to specialization items
    document.querySelectorAll('.specialization-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = '#27ae60';
            this.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = 'transparent';
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .course-category, .neuro-feature, .specialization-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
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


  const form = document.querySelector("#callbackForm");

  if (form) {
    form.addEventListener("submit", async function(e) {
      e.preventDefault();
      await addTimestampAndSubmit(form, 'getCallBack');
    });
  }
