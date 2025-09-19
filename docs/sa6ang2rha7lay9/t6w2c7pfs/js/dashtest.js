let nDates = 0;

  const testData = "APM MR O1 SON5,Monday, 16:00:00 ,,Phy AP O2 SON1,Monday, 04:00:00,Sun Aug 24 2025,Phy AP P4 SON10,Wednesday,14:00:00,,STN MR O5 SOF5,Wednesday,04:00:00,";
  const testDiv = document.getElementById('test');
  const batchSummary = document.getElementById('batchSummary');
  const batchDetails = document.getElementById('batchDetails');
  const scheduleSetting = document.getElementById('scheduleSetting');
  const dateList = document.getElementById('dateList');
  const loginUrl = "url"






async function loadTimezone() {
  await loadIn('test', "/templates/timzone.html");
}
loadTimezone();

['focus', 'input', 'change'].forEach(eventType => {
    document.getElementById('testTimezoneInput').addEventListener(eventType, async function () {
  const oldUtcValue = document.getElementById('utcValue').value;
  await waitForValueChange(oldUtcValue,'utcValue');
  const newUtcValue = document.getElementById('utcValue').value;
 await testBatches(newUtcValue);
});
});
testBatches();
async function waitForValueChange(oldValue,id) {
  while (document.getElementById(id).value === oldValue) {
    await new Promise(resolve => setTimeout(resolve, 5)); 
  }
}
  async function testBatches(timeZoneUTC){
    displayItem('loginSection',0);
    batchSummary.innerHTML = "<h3 class='text-success'>Success! Loading Batch Details..</h3>";
      const data = testData;
     await createWeekSchedule('scheduleBox', convertTo2D(data, 4, ","), timeZoneUTC);
  }
    async function getBatches() {
    batchSummary.textContent = "Checking credentials.."
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          function: 'getBatches'
        })
      });

      if (!response.ok) {
        batchSummary.innerHTML = "<h3 class='text-danger'>Failed! Error Getting Details</h3>";
      }

      batchSummary.innerHTML = "<h3 class='text-success'>Success! Loading Batch Details..</h3>";
      const data = await response.text();
      testDiv.textContent =  data;
      document.getElementById('loginSection').innerHTML = `<h1 class='text-primary'>${name?name:"Error Loading Student Name"}</h1>`;
      createWeekSchedule('scheduleBox', convertTo2D(data, 4, ","));

    } catch (error) {
      batchSummary.innerHTML = error + "<h3 class='text-danger'>Failed! Error Getting Details</h3>";
    }
  }

async function getDates(batchName, lastDate, batchTime, timeZoneUTC) {
    batchSummary.textContent = "Finding Details ..";
    document.getElementById('loginSection').style.display = 'none';
    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          function: 'getDates',
          batchName: batchName
        })
      });

      batchSummary.textContent = "Finding Details .......";
      const batchCreators = batchName.split(" ");
      const batchSize = batchCreators[3].substring(3);
      const batchStatus = batchCreators[2].slice(0,1);
      const batchLocation = batchCreators[0];
      const dates = await response.text();
      batchDetails.open = false;

      // ✅ Use toLocaleString with timezone
      batchSummary.innerHTML =  " <div> Batch Name: <span class='text-success'>"+ batchName + "</span> <span class='text-danger'>|</span> " +
        "Batch Size: <span class='text-success'>"+ batchSize + "</span> <span class='text-danger'>|</span> " +
        "Batch Time: <span class='text-success'>"+ batchTime + "</span> <span class='text-danger'>|</span> " +
        "Batch Ending on: <span class='text-danger'>"+ new Date(lastDate).toLocaleString('en-US', {timeZone: timeZoneUTC}) + "</span> <span class='text-danger'>|</span> " +
        "Batch Type: <span class='text-success'>"+ (batchStatus=="P"?"For You":"Open Batch") + "</span> <span class='text-danger'>|</span> " +
        "Batch Identifier: <span class='text-success'>"+ batchLocation + "</span> <span class='text-danger'>|</span> </div>";

      const datesData = dates.split(",");
      returnDateList(datesData, lastDate, timeZoneUTC);

    } catch (error) {
      dateList.innerHTML = error;
    }
  }

function getIndianDate(date = new Date()) {
  return new Intl.DateTimeFormat([], {
    timeZone: 'Asia/Kolkata', // IST
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date); // returns YYYY-MM-DD
}

function updateSubmitDateBtn(){
document.getElementById('dateSubmitBtn').style.display = nDates > 0 ? 'block' : 'none';
document.getElementById('dateSubmitBtn').textContent = `Submit ${nDates + (nDates>1?" Dates":" Date")} >>`
}
updateSubmitDateBtn();

function selectMe(item) {
        if(nDates>=10){
            return popshow("You can select a maximum of 10 dates at once","popId","overlayId");
        }
nDates++;
updateSubmitDateBtn();     
        const selectedId = item.textContent.trim();
document.getElementById('selectedDates').innerHTML += `<input class="pad3 shadow2 round2 left pw45 text-center btn bg-info text-primary border-solid border-primary" onclick="deselectMe('${selectedId}')" id="${selectedId}" name="${"scheduleDate"+nDates}" value="${item.textContent}">`;
item.style.display = 'none';
sortChildDivsByDate('selectedDates');
sortChildDivsByDate('dateList');
    }

function deselectMe(id){
    nDates--;
    updateSubmitDateBtn();
    const inputDate = document.getElementById(id);
    const item = document.createElement('div');
    item.textContent = inputDate.value;
    item.className = "pad2 round2 mar3 pw80 text-center btn bg-success text-primary";
    item.onclick = () => selectMe(item);
    dateList.appendChild(item);
    inputDate.remove();
    sortChildDivsByDate('selectedDates');
sortChildDivsByDate('dateList');
   }


  
function returnDateList(dateData, lastDate, timeZoneUTC) {
  const timezone = timeZoneUTC; // Make sure this is globally defined
  const mondayIST = getMondayIST(); // Helper to get Monday in IST
  const lastDateIST = lastDate ? new Date(lastDate) : null;

  for (let i = 0; i < dateData.length; i++) {
    const list = document.createElement('div');

    // Create current date in IST
    const istDate = new Date(mondayIST);
    istDate.setDate(mondayIST.getDate() + i);

    // Convert IST date to UTC
    istDate.setUTCMinutes(istDate.getUTCMinutes() - 330); // IST offset

    // Convert to local time using user's timezone
    const localDate = new Date(istDate.toLocaleString('en-US', { timeZone: timezone }));

    // Format for display
    const formatted = localDate.toLocaleDateString('en-US', {
    timeZone: timeZoneUTC, 
    weekday: 'long',  // 'long' to show the full name of the day (e.g., "Monday")
    year: 'numeric',
    month: 'long',    // Full month name (e.g., "September")
    day: 'numeric'    // Numeric day of the month (e.g., "25")
});


    // Check if available and within range
    const isActive = dateData[i] === "1" &&
      (!lastDateIST || isBeforeDateOnlyIST(istDate, lastDateIST));

    // Create UI
    list.textContent = formatted;
    list.className = `pad2 bold block round2 mar3 pw80 text-center mar2 lmar shadow2 ${isActive ? "btn bg-success text-secondary" : "bg-danger text-info"}`;
    list.onclick = () => {
      if (isActive) {
        selectMe(list);
      } else {
        popshow("Not available on this date - the batch is either full or closed, please select another day or another batch", 'popId', 'overlayId');
      }
    };

    document.getElementById('selectedDates').style.display = 'flex';
    dateList.style.display = 'flex';
    dateList.appendChild(list);
  }

}


 function getMondayIST() {
    const now = new Date();
    const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const day = istNow.getDay();
    const diff = (day + 6) % 7; // Convert Sunday (0) to end
    istNow.setDate(istNow.getDate() - diff);
    return istNow;
  }
  function isBeforeDateOnlyIST(d1, d2) {
    return (
      d1.getUTCFullYear() < d2.getUTCFullYear() ||
      (d1.getUTCFullYear() === d2.getUTCFullYear() && d1.getUTCMonth() < d2.getUTCMonth()) ||
      (d1.getUTCFullYear() === d2.getUTCFullYear() &&
        d1.getUTCMonth() === d2.getUTCMonth() &&
        d1.getUTCDate() <= d2.getUTCDate())
    );
  }

  
function createWeekSchedule(id, batchData, timeZoneUTC) {
  const timezone = timeZoneUTC;
  batchDetails.open = true;

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const scheduleTable = document.createElement("table");
  scheduleTable.id = "batchListTable";

  const scheduleHead = scheduleTable.createTHead().insertRow();
  const scheduleBody = scheduleTable.createTBody();
  const timeMap = new Map();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  // 3:00 AM IST today in UTC
  const istStart = new Date(Date.UTC(year, month, date, 3, 0));
  istStart.setUTCMinutes(istStart.getUTCMinutes() - 330); // IST offset

  // Build 48 half-hour slots from 3 AM IST
  for (let i = 0; i < 48; i++) {
    const slotUTC = new Date(istStart.getTime() + i * 30 * 60 * 1000);
    const localDate = new Date(slotUTC.toLocaleString("en-US", { timeZone: timezone }));

    const localDayIndex = localDate.getDay(); // 0 = Sunday
    const localDay = days[(localDayIndex + 6) % 7]; // Adjust Sunday (0) to end

    const hour = localDate.getHours();
    const minute = localDate.getMinutes();
    const timeKey = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

    if (!timeMap.has(timeKey)) timeMap.set(timeKey, {});
    if (!timeMap.get(timeKey)[localDay]) timeMap.get(timeKey)[localDay] = [];
  }
  batchData.forEach(row => {
    const batchName = row[0];
    const istDay = row[1];
    const timeStr = row[2];
    const lastDateStr = row[3];
 if (!batchName || !istDay || !timeStr) return;
    const match = timeStr.match(/\d{2}:\d{2}:\d{2}/);
    if (!match) return;

    const [h, m, s] = match[0].split(":").map(Number);
    const istDayIndex = days.indexOf(istDay); // 0-based Monday = 0

    // Create IST date for that weekday this week
    const now = new Date();
    const currentIST = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const todayIndex = currentIST.getDay(); // 0 = Sunday
    const offset = (istDayIndex + 1 - (todayIndex === 0 ? 7 : todayIndex) + 7) % 7;

    const batchISTDate = new Date(Date.UTC(year, month, date + offset, h, m, s));
    batchISTDate.setUTCMinutes(batchISTDate.getUTCMinutes() - 330);
    
    const localDate = new Date(batchISTDate.toLocaleString("en-US", { timeZone: timezone }));
    const localDayIndex = localDate.getDay();
    const localDay = days[(localDayIndex + 6) % 7];

    const hour = localDate.getHours();
    const minute = localDate.getMinutes();
    const timeKey = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;


    if (!timeMap.has(timeKey)) timeMap.set(timeKey, {});
    if (!timeMap.get(timeKey)[localDay]) timeMap.get(timeKey)[localDay] = [];

    const formattedTime = localDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    timeMap.get(timeKey)[localDay].push({
      batchName,
      timeLabel: formattedTime
    });
  });

  // Build table header
  scheduleHead.insertCell().innerText = "Time";
  days.forEach(day => scheduleHead.insertCell().innerText = day);

  // Build table rows
  for (const [timeKey, dayMap] of timeMap.entries()) {
    const row = scheduleBody.insertRow();
    const [hourStr, minuteStr] = timeKey.split(":");
const timeDate = new Date();
timeDate.setHours(+hourStr, +minuteStr);
const amPmTime = timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

row.insertCell().textContent = amPmTime;


    days.forEach(day => {
      const cell = row.insertCell();
      const batches = dayMap[day];

      if (batches && batches.length) {
        cell.innerHTML = batches.map(batch => `
          <div 
            class="btn bg-primary mar2 text-secondary text-center shadow2 pad3 round3"
            data-batch-time="${batch.timeLabel}" data-last-date = "${new Date(new Date().getTime()+ 365.25*24*60*60*1000) }"
            onclick="selectBatch(this, '${timeZoneUTC}')"
          >
            ${batch.batchName}
          </div>
        `).join('');
      }
    });
  }
document.getElementById(id).innerHTML ="";
  document.getElementById(id).appendChild(scheduleTable);
  batchSummary.innerHTML = "<h3 class='text-success'>Success! Select Your Batch</h3>";
}

  

async function selectBatch(item, timeZoneUTC) {
    await getDates(
      item.innerText,
      item.dataset.lastDate,
      item.dataset.batchTime,
      timeZoneUTC
    );
  }