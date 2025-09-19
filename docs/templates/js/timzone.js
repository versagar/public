var inputIdMatch="";
if(tzInputIds){tzInputIds = ['testTimezoneInput','testTimezone2'];} else {var tzInputIds = ['testTimezoneInput','testTimezone2'];} 
tzInputIds.forEach(id => {
  if(document.getElementById(id)) inputIdMatch = id
  //document.getElementById('test')
})
const timezoneInput =  document.getElementById(inputIdMatch?inputIdMatch:'timezoneInput');
timezoneInput.style.display = 'block';
const timezoneList = document.getElementById('timezoneList');
const timezoneOptions = document.querySelectorAll('.timezone-option');

function getUTCOffsetString() {
  const offsetMinutes = new Date().getTimezoneOffset();
  const totalMinutes = -offsetMinutes;
  const sign = totalMinutes >= 0 ? '+' : '−';
  const hours = String(Math.floor(Math.abs(totalMinutes) / 60)).padStart(2, '0');
  const minutes = String(Math.abs(totalMinutes) % 60).padStart(2, '0');
  return `UTC${sign}${hours}:${minutes}`;
}


  const userUTC = getUTCOffsetString(); // e.g. "UTC+05:30"
  let matched = false;
  timezoneOptions.forEach(option => {
    if (option.textContent.trim().includes(userUTC)) {
      timezoneInput.value = option.textContent;
      matched = true;
    }
      if (!matched) {
    timezoneInput.value = userUTC;
  }
  });




// Show the dropdown when the input is clicked
timezoneInput.addEventListener('click', function() {
  timezoneList.style.display = 'block';
  timezoneInput.value = "";
  document.getElementById('batchDetails').open = false;
  document.getElementById('batchSummary').style.display = 'none';
});

// Filter the timezones as the user types
timezoneInput.addEventListener('input', function() {
  const searchValue = timezoneInput.value.toLowerCase();
  
  // Loop through all the options and toggle visibility based on search
  timezoneOptions.forEach(option => {
    const optionText = option.textContent.toLowerCase();
    if (optionText.includes(searchValue)) {
      option.style.display = 'block';  // Show matching option
    } else {
      option.style.display = 'none';   // Hide non-matching option
    }
  });
});

// Hide the dropdown if the user clicks outside the input or dropdown
document.addEventListener('click', function(event) {
  if (!timezoneInput.contains(event.target) && !timezoneList.contains(event.target)) {
    timezoneList.style.display = 'none';  // Hide the dropdown
  }
});

// Select an option when clicked


timezoneOptions.forEach(option => {
  option.addEventListener('click', () => {
    timezoneInput.value = option.textContent;  // Set input field to selected timezone
    timezoneList.style.display = 'none';    // Hide the dropdown after selection
document.getElementsByName('Timestamp').forEach(el => el.value = getDate());  
document.getElementById('utcValue').value = timezoneInput.value.split("UTC")[1].split(")")[0];
document.getElementById('batchDetails').open = true;
  document.getElementById('batchSummary').style.display = 'inherit';

  });
});
function getDate()  {
      var options = {
  timeZone: timezoneInput.value.split("UTC")[1].split(")")[0], // Set the timezone dynamically
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
};
var toShow;    
var date = new Date();
toShow = date.toLocaleString('en-US', options)
return toShow;
}
//document.getElementById('timeStamp').value=getDate();
document.getElementsByName('Timestamp').forEach(el => el.value = getDate());
document.getElementById('utcValue').value = timezoneInput.value.split("UTC")[1].split(")")[0];