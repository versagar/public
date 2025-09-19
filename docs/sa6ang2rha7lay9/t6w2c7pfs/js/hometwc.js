// Animate on scroll for both sets of classes
const animatedItems = document.querySelectorAll('.twc-animated, .fade-in-section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Check for both types of classes and add the correct "visible" class
            if (entry.target.classList.contains('twc-animated')) {
                entry.target.classList.add('twc-visible');
            } else if (entry.target.classList.contains('fade-in-section')) {
                entry.target.classList.add('fade-in-visible');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedItems.forEach(item => observer.observe(item));

// Code for the popup and form submission (unmodified)
const popup = document.getElementById('flagPopup');
popup.classList.add('show');
setTimeout(() => popup.classList.remove('show'), 1000);

const callbackForm= document.getElementById("callbackForm");
callbackForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(callbackForm);
    const payload = {
        function: "getCallBack",
        formData: {
            timestamp: new Date().toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata"
            }),
            name: formData.get("name"),
            phone: formData.get("tel"),
            availability: formData.get("availability") || "Not Provided",
            hp_field: formData.get("hp_field") || "",
        },
        userDetails: {
            ua: navigator.userAgent,
            time: new Date().toISOString(),
        },
    };

    const respBox = document.getElementById("formResp");
    respBox.textContent = "Submitting...";

    try {
        const response = await fetch("https://twc.physer.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });
        const result = await response.json();
        respBox.textContent = result.message || JSON.stringify(result);
    } catch (err) {
        respBox.textContent = "Error submitting form.";
    }
});