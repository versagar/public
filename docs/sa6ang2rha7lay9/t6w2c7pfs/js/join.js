function scheduleBooking(){
  loadIn('scheduleBooking','/sa6ang2rha7lay9/t6w2c7pfs/schedule.html');
  document.getElementById('formApplication').style.display = 'none';
  document.getElementById('scheduleBooking').style.display = 'block';
}
 var form;
const respBox = document.getElementById("formResp");
function openForm(purpose) {
  document.querySelectorAll('form').forEach(form => {
    form.style.display = 'none';
  });
  const targetForm = document.getElementById(purpose + 'Form');
  if (targetForm) {
    targetForm.style.display = 'flex';
    form = targetForm;
    respBox.innerText = purpose.toUpperCase();

      form.addEventListener("submit", handleSubmit);
  }
  loadFormTimezone(purpose);
}
//openForm('demo');
 function loadFormTimezone(purpose){
  if (document.getElementById(purpose+'TimeStamp')){
   displayItem('formTimeZone',1);
createTimezoneSelector('timeZoneData', 'timezoneListForm', purpose+'TimeStamp', null);
  }
 };
  async function handleSubmit(event) {
    event.preventDefault();

const formData = new FormData(form);

    const payload = {
      function: form.id == 'registrationForm'?'register':'bookDemo',
formData: Object.fromEntries(formData.entries()),
      userDetails: {
        ua: navigator.userAgent,
        time: new Date().toISOString()
      }
    };

    respBox.textContent = "Submitting...";
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://twc.physer.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      respBox.textContent = result;
      form.reset();
    } catch (err) {
      respBox.textContent = "Error submitting form.";
    }

    submitBtn.disabled = false;
  };

async  function getDemoDates() {
const formData = new FormData(form);

const payload = {
      function: "getDemoBatches",
formData: {
course: formData.get('Course'),
mode: formData.get('mode'),
location: formData.get('location')
},
      userDetails: {
        ua: navigator.userAgent,
        time: new Date().toISOString()
      }
    };
  document.getElementById('demoDateBtn').style.display ='none';
  const select = document.createElement('select');
  select.name = 'batch';
  select.required = true;
  const loadingOption = new Option("Loading demo timings...", "", true, true);
  loadingOption.disabled = true;
  select.appendChild(loadingOption);
  form.appendChild(select);

  try {
    const response = await fetch("https://twc.physer.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    // Clear previous options
    select.innerHTML = '';

    if (Array.isArray(result) && result.length > 0) {
      select.appendChild(new Option("Select a demo timing", "Null", true, true));
      select.firstChild.disabled = false;

      result.forEach(batch => {
        const option = new Option(batch, batch);
        select.appendChild(option);
      });
    } else {
      select.appendChild(new Option("No Batches: Enter your availability", "NoBatchesFound", true, true));
      select.firstChild.disabled = false;
      const availabilityInput = document.createElement('input');
      availabilityInput.name = "availability";
      availabilityInput.type =  "text";
      form.appendChild(availabilityInput);
    }

  } catch (err) {
    select.innerHTML = '';
    select.appendChild(new Option("Error: Submit without Batch Entry", "ErrorBatch", true, true));
    select.firstChild.disabled = false;
  }

const submitBtn = document.createElement('button');
submitBtn.type = "submit";
submitBtn.className = "btn bg-primary";
submitBtn.textContent = "Submit"
form.appendChild(submitBtn);


};

function test() {
  const formData = new FormData(form);
  let output = form.id;
  for (const [key, value] of formData.entries()) {
    output += `${key}: ${value}<br>`;
  }
  document.getElementById('testData').innerHTML = output;
}
openForm("callback");  

const thirdSegment = localStorage.getItem('thirdSegmentafterconnect');

if (thirdSegment) {
  respBox.textContent = thirdSegment;

  switch (thirdSegment) {
    case 'demo':
      openForm("demo");
      break;
    case 'registration':
      openForm("registration");
      break;
    case 'scheduling':
      scheduleBooking();
      break;  
    default:
      openForm("callback");
  }

  // Remove only after use
  localStorage.removeItem('thirdSegmentafterconnect');
}