document.addEventListener("contextmenu", event => event.preventDefault());
document.addEventListener("keydown", event => {
    if (event.keyCode === 123 || event.ctrlKey && event.shiftKey && event.keyCode === 73) {
        event.preventDefault()
    }
});
getBeauty("dtp");
getBeauty("mbp");
getBeauty("kpp");
// getBeauty("../dtp");
// getBeauty("../mbp");
// getBeauty("../kpp");
// getBeauty("../../dtp");
// getBeauty("../../mbp");
// getBeauty("../../kpp");
// getBeauty("tempresp");
// getBeauty('lib');
//document.getElementById("updates").innerHTML = '<object type="text/html" data="../../ady12ata14n9/updateindex.html" width="100%" height="400vh"></object>';
function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
    document.getElementById("mySidenav").style.backgroundColor = "rgba(0,0,0,0.7)"
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0"
}

function openOv() {
    document.getElementById("myOv").style.width = "20%";
    document.getElementById("myFeed").style.width = "80%";
    document.getElementById("openOv").style.display = "none"
}

function closeOv() {
    document.getElementById("myOv").style.width = "0";
    document.getElementById("myFeed").style.width = "100%";
    document.getElementById("openOv").style.display = "block"
}
var c = 0;
var a = 0;
var b = 0;

function openCpnotice() {
    if (c == 1) {
        c = 0;
        document.getElementById("cpnotice").style.display = "none"
    } else {
        c = 1;
        document.getElementById("cpnotice").style.display = "block"
    }
}
var sb = 0;

function showBlock(id) {
    document.getElementById(id).style.display = "block"
}

function hideBlock(id) {
    document.getElementById(id).style.display = "none"
}
var sbtwo = 0;

function showblockTwo(one, two) {
    document.getElementById(one).style.display = "block";
    document.getElementById(two).style.display = "block"
}

function hideblockTwo(one, two) {
    document.getElementById(one).style.display = "none";
    document.getElementById(two).style.display = "none"
}

function displayBlock(targetId,type, targetAttribute, modifierId, textOn, textOff) {
    const element = document.getElementById(targetId);
    const button = document.getElementById(modifierId); // Get the button that triggered the function

const currentDisplay = window.getComputedStyle(element).display;
if (currentDisplay !== 'none') {
    element.style.display = 'none';
    button[targetAttribute] = textOff;
} else {
    element.style.display = type;
    button[targetAttribute] = textOn;
}
}



function displayblockTwo(one, two) {
    if (sbtwo == 1) {
        sbtwo = 0;
        document.getElementById(one).style.display = "none";
        document.getElementById(two).style.display = "none"
    } else {
        sbtwo = 1;
        document.getElementById(one).style.display = "block";
        document.getElementById(two).style.display = "block"
    }
}

function fillsecondwidthTwo(w, u, one, two) {
    document.getElementById(one).style.width = w + u;
    document.getElementById(two).style.width = 100 - w + u;
}
var ssw = 0;

function switchsetfillWidth(w, u, one, two) {
    if (ssw == 1) {
        ssw = 0;
        fillsecondwidthTwo(0, u, one, two);
    } else {
        ssw = 1;
        fillsecondwidthTwo(w, u, one, two);
    }
}

function setWidth(w, u, id) {
    document.getElementById(id).style.width = w + u;
}

function setWidthHeight(w, wu, h, hu, id) {
    document.getElementById(id).style.width = w + wu;
    document.getElementById(id).style.height = h + hu;
}
var sw = 0;

function switchWidth(w, u, id) {
    if (sw == 1) {
        sw = 0;
        document.getElementById(id).style.width = 0;
    } else {
        sw = 1;
        document.getElementById(id).style.width = w + u;
    }
}

function fullOpen() {
    document.getElementById('header').style.display = "none";
    document.getElementById('fullOpener').style.display = "none";
    document.getElementById('fullCloser').style.display = "block";
    setWidthHeight(100, "%", 100, "%", "wbody");
}

function fullClose() {
    document.getElementById('header').style.display = "flex";
    document.getElementById('fullOpener').style.display = "block";
    document.getElementById('fullCloser').style.display = "none";
    document.getElementById('wbody').style.height = 'calc(100% - 12vmin)';
}

function pgtwc(id, name) {
    var oname = '<object type="text/html" data="' + name + 'twc.html" width="100%" height="100%"></object>';
    // document.getElementById(id).innerHTML = twcloader;
    document.getElementById(id).innerHTML = oname;
}

function loadObject(elementId, url) {
    var oname = '<object type="text/html" data="' + url + '" class="loadedobject" id="obin' + elementId + '"></object>';
    //var oname = url;
    if (url) {
        document.getElementById(elementId).innerHTML = oname;
    } else {
        document.getElementById(elementId).innerHTML = "Sorry, the content could not be loaded at this moment.";
    }
}

function loadIn(elementId, url) {
    const el = document.getElementById(elementId);

    if(el){
el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.style.opacity = '0';
    el.style.transform = 'scale(0.8)';

    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Page not found via loadIn');
            return response.text();
        })
        .then(html => {
            return new Promise(resolve => {
                setTimeout(() => {
                    el.innerHTML = html;
                    el.style.opacity = '1';
                    el.style.transform = 'scale(1)';

                    // Run <script> tags safely
                    const scripts = el.querySelectorAll("script");

                    scripts.forEach(oldScript => {
                        const newScript = document.createElement("script");

                        // Prevent re-adding scripts with src that already exist
                        if (oldScript.src && document.querySelector(`script[src="${oldScript.src}"]`)) {
                            return; // skip duplicate external scripts
                        }

                        if (oldScript.src) {
                            newScript.src = oldScript.src;
                            newScript.async = oldScript.async || false;
                        } else {
                            newScript.textContent = oldScript.textContent;
                        }

                        [...oldScript.attributes].forEach(attr =>
                            newScript.setAttribute(attr.name, attr.value)
                        );

                        document.body.appendChild(newScript);
                        // Do not remove newScript – let it stay in DOM for debugging or caching
                    });

                    resolve();
                }, 500);
            });
        })
        .catch(error => {
            console.error('Error loading page:', error);
            if (typeof loadObject === 'function') {
                loadObject(elementId, url);
            }
        });




    }
    
console.log(elementId + " Id does not exist");
}


function loadhPagesuff(id, name, suff, dir) {
    var page = dir + name + suff + '.html';
    loadIn(id, page);
    //loadObject(id, page);
}

function gslidetwc(id, gid) {
    // var twcloader = '<div id="twcloaderGif"></div>';
    var oname = '<div id="ttgsidBox'+id+'" class="ttgsidbox"><iframe id="ttgsidFrame'+id+'" class="ttgsidframe" src="https://docs.google.com/presentation/d/' + gid + '/embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true";></iframe><div class="abs gslidestrip"></div></div>';
    // document.getElementById(id).innerHTML = twcloader;
    document.getElementById(id).innerHTML = oname;
}

function gdoctwc(id, gid) {
    // var twcloader = '<div id="twcloaderGif"></div>';
    var oname = '<div id="ttgdidBox'+id+'" class="ttgdidbox"><iframe id="ttgdidFrame'+id+'" class="ttgdidframe" src="https://docs.google.com/document/d/' + gid + '/pub?embedded=true" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true";></iframe><div class="abs gdocstrip"></div></div>';
    // document.getElementById(id).innerHTML = twcloader;
    document.getElementById(id).innerHTML = oname;
}


function inptwcData(tid, rid) {
    var source = document.getElementById(tid);
    document.getElementById(rid).innerText = source.innerText;
}
var twctidLast = 'wbody';
var twctfLast = '/sa6ang2rha7lay9/t6w2c7pfs/home';
//var twcttStat = 0;
//var twctUndo = 0;
//function viewBackbtn() {console.log('twcttStat:', twcttStat); if (twcttStat === 1) {showBlock('twctBack');} else {hideBlock('twctBack');}}


//hideBlock('twctBack');
function omTwc(fName, aid) {
    pgtwc('wbody', '/sa6ang2rha7lay9/t6w2c7pfs/' + fName);
    openMenu('twcmenu', 'tmBtn', "/ecjigjd/ecabejdcddgiah.png", "/ecjigjd/updraw.png");
    inptwcData(aid, 'twcpHead');
    twctfLast = '/sa6ang2rha7lay9/t6w2c7pfs/' + fName;
    twctidLast = aid;
}


function twctgoBack() {
    pgtwc('wbody', twctfLast);
    inptwcData(twctidLast, 'twcpHead');
}

function twcttOpen(ttstt, gsid, gdid) {
    showBlock('twcHeadline');
    inptwcData(ttstt, 'ttHead');
    gslidetwc('ttFrame1', gsid);
    gdoctwc('ttFrame2',gdid);
    setDisplay('none', 'ttFrame4');
}

function openMenu(w, opener, imgOpener, imgCloser) {
    var snd = new Audio("/ecjigjd/ekdjgjchdjjacgfbElca.wav");
    var x = document.getElementById(w);
    var o = document.getElementById(opener);
    snd.play();
    if (x.style.display == "block") {
        x.style.display = "none";
        o.src = imgOpener; // "/ecjigjd/ecabejdcddgiah.png";
    } else {
        x.style.display = "block";
        o.src = imgCloser; // "/ecjigjd/updraw.png";
    }
}

function opentMenu(w, opener, tOpener, tCloser) {
    var snd = new Audio("/ecjigjd/ekdjgjchdjjacgfbElca.wav");
    var x = document.getElementById(w);
    var o = document.getElementById(opener);
    snd.play();
    if (x.style.display == "block") {
        x.style.display = "none";
        o.innerHTML = tOpener; // "/ecjigjd/ecabejdcddgiah.png";
    } else {
        x.style.display = "block";
        o.innerHTML = tCloser; // "/ecjigjd/updraw.png";
    }
}
function shortenTitle(title) {
    return title
        .split(' ') // Split the title into words based on spaces
        .map(word => word.substring(0, 2).toLowerCase()) // Get the first two letters of each word and convert to lowercase
        .join('') // Join the letters without any separator
        .replace('&', '') // Remove '&'
        .replace('(', '') // Remove '('
        .replace(')', ''); // Remove ')'
}

function loadttMenu(suff, tname) {
    //var pagename = document.getElementById('ttHead').innerText.toLowerCase().trim();
    var pagename = shortenTitle(document.getElementById('ttHead').innerText);
    loadhPagesuff("ttFrame2", pagename, suff, "topics/" + tname + "/");
    setDisplay("none", "ttmContainer");
}

function loadttFrame(num, suff, pre) {
    loadhPagesuff("ttFrame" + num, pre, suff, "topics/");
}

function setDisplay(option, id) {
    document.getElementById(id).style.display = option;
}

//var containerWidth = document.getElementById('two').offsetWidth; // Get the container width if needed.
//var adjustedWidth = containerWidth - awidth; // Calculate the adjusted width
// General Blocks

function toggleCon(id, con, vone, vtwo) {
    var el = document.getElementById(id);

    // If 'con' starts with '.style', toggle inline CSS styles
    if (con.startsWith('style.')) {
        // Remove '.style' from the string to access the actual style property
        var styleProperty = con.replace('style.', '').trim();

        // Toggle the inline CSS property
        if (el.style[styleProperty] === vtwo) {
            el.style[styleProperty] = vone;
        } else {
            el.style[styleProperty] = vtwo;
        }
    } else {
        // Otherwise, toggle the property (like class, attribute, etc.)
        if (el[con] === vtwo) {
            el[con] = vone;
        } else {
            el[con] = vtwo;
        }
    }
}

var hor = 0;

function move(dir, id, step) {
    hor = hor + 2 - dir;
    document.getElementById(id).style.right = step * hor + "vw";
}

function autoScroll(id, dist, dur1, dur2, stayTime) {
  const el = document.getElementById(id);
  let cancelled = false;

  function cancelScroll() {
    cancelled = true;
    el.removeEventListener('wheel', cancelScroll);
    el.removeEventListener('touchstart', cancelScroll);
    el.removeEventListener('keydown', cancelScroll);
  }

  // Add user-interaction listeners
  el.addEventListener('wheel', cancelScroll, { passive: true });
  el.addEventListener('touchstart', cancelScroll, { passive: true });
  el.addEventListener('keydown', cancelScroll);

  const start = el.scrollTop;
  const startTime = performance.now();

  function animate(time) {
    if (cancelled) return;
    const p = Math.min((time - startTime) / dur1, 1);
    el.scrollTop = start + dist * p;
    if (p < 1) requestAnimationFrame(animate);
    else setTimeout(scrollBack, stayTime);
  }

  function scrollBack() {
    const backStart = el.scrollTop;
    const backTime = performance.now();

    function back(t) {
      if (cancelled) return;
      const p = Math.min((t - backTime) / dur2, 1);
      el.scrollTop = backStart - dist * p;
      if (p < 1) requestAnimationFrame(back);
    }

    requestAnimationFrame(back);
  }

  requestAnimationFrame(animate);
}

function getIndianDateTime(date)  {
      var options = {
  timeZone: 'Asia/Kolkata'
};   
var date = new Date(date);
// toShow =  date;
return date.toLocaleString('en-US', options);
}

function displayItem(id, d) {
            switch (d) {
                case 1:
                    document.getElementById(id).style.display = "block";
                    break;
                case 0:
                    document.getElementById(id).style.display = "none";
                    break;
                default:
                    break;
            }
        }

function popshow(text, popId, overlayId) {
  displayItem(popId, 1);
  displayItem(overlayId, 1);
  const data = `<h3>${text}</h3><br/>
    <button onclick="displayItem('${overlayId}', 0); displayItem('${popId}', 0)" class="btn btn-primary pad2">OK</button>`;
  document.getElementById(popId).innerHTML = data;
}

function getMonday(d) {
  d = new Date(d);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

function isBeforeDateOnly(date1, date2) {
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return d1 < d2;
}

function convertTo2D(data,n,splitter){
const parts = data.split(splitter);

const table = [];
for (let i = 0; i < parts.length; i += n) {
  // push one batch as an array of 4 items
  table.push(parts.slice(i, i + n));
}
return table;
}
function sortChildDivs(containerId) {
  const container = document.getElementById(containerId);
  const children = Array.from(container.children);

  children.sort((a, b) => {
    const aText = a.textContent.trim().toLowerCase();
    const bText = b.textContent.trim().toLowerCase();
    return aText.localeCompare(bText);
  });
  children.forEach(child => container.appendChild(child));
}

function sortChildDivsByDate(containerId) {
  const container = document.getElementById(containerId);
  const children = Array.from(container.children);

  children.sort((a, b) => {
    const dateA = a.value? new Date(a.value): new Date(a.textContent);
    const dateB = b.value? new Date(b.value): new Date(b.textContent);
    return dateA - dateB;
  });

  children.forEach(child => container.appendChild(child));
}

function makeDraggable(element) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    element.style.position = 'absolute';
    element.style.cursor = 'move';

    element.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        document.body.style.userSelect = 'none'; // Prevents text selection while dragging
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            element.style.left = (e.clientX - offsetX) + 'px';
            element.style.top = (e.clientY - offsetY) + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        document.body.style.userSelect = 'auto';
    });
}

function convertTimezone(dateStr, fromUTCOffset, targetTimezone) {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const parts = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  };

  const offsetHours = Math.trunc(fromUTCOffset);
  const offsetMinutes = (fromUTCOffset - offsetHours) * 60;

  const utcDate = new Date(Date.UTC(
    parts.year,
    parts.month,
    parts.day,
    parts.hour - offsetHours,
    Math.floor(parts.minute - offsetMinutes),
    parts.second
  ));

  // Convert to target timezone by formatting
  const formatted = new Intl.DateTimeFormat('en-CA', {
    timeZone: targetTimezone,
    hour12: false
  }).formatToParts(utcDate);

  const values = {};
  formatted.forEach(({ type, value }) => {
    if (type !== 'literal') values[type] = value;
  });

  return new Date(
    `${values.year}-${values.month}-${values.day}T${values.hour}:${values.minute}:${values.second}`
  ).toLocaleString('en-US',);
}


  /**
   * Attaches timezone selection functionality to existing HTML elements.
   * It also dynamically injects the required CSS styles for the dropdown options.
   *
   * @param {string} timezoneInputId - The ID of the input field for typing/displaying the timezone.
   * @param {string} timezoneListId - The ID of the container for the timezone options dropdown.
   * @param {string} timestampDisplayId - The ID of the input field to display the formatted timestamp.
   * @param {string} utcValueId - The ID of the input field to store the raw UTC offset value.
   */
  function createTimezoneSelector(timezoneInputId, timezoneListId, timestampDisplayId, utcValueId) {
      // Inject required CSS for a clean, dependency-free solution.
      const styleId = 'timezone-selector-styles';
      if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.textContent = `
              .timezone-option {
                  padding: 10px;
                  cursor: pointer;
                  font-size: 14px;
              }
              .timezone-option:hover { 
                filter: opacity(1.0)
              }

          `;
          document.head.appendChild(style);
      }
      
      const timezoneInput = document.getElementById(timezoneInputId);
      const timezoneList = document.getElementById(timezoneListId);

      if (!timezoneInput || !timezoneList) {
          console.error('Timezone input or list container not found.');
          return;
      }

      // Array of timezone data
      const timezones = [
'(UTC−12:00) Baker Island Time', '(UTC−11:00) Niue Time', '(UTC−10:00) Hawaii-Aleutian Standard Time',
          '(UTC−09:30) Marquesas Islands Time', '(UTC−09:00) Alaska Standard Time', '(UTC−08:00) Pacific Standard Time (PST), PDT (Daylight)',
          '(UTC−07:00) Mountain Standard Time (MST), MDT (Daylight)', '(UTC−06:00) Central Standard Time (CST), CDT (Daylight)',
          '(UTC−05:00) Eastern Standard Time (EST), EDT (Daylight)', '(UTC−04:00) Atlantic Standard Time (AST), ADT (Daylight)',
          '(UTC−03:30) Newfoundland Standard Time', '(UTC−03:00) Argentina Time (ART), Brazil Time (BRT)',
          '(UTC−02:00) South Georgia and the South Sandwich Islands Time', '(UTC−01:00) Cape Verde Time (CVT), Azores Time (AZOT)',
          '(UTC+00:00) Greenwich Mean Time (GMT), Western European Time (WET)',
          '(UTC+01:00) Central European Time (CET), West Africa Time (WAT)', '(UTC+02:00) Eastern European Time (EET), Central Africa Time (CAT)',
          '(UTC+03:00) Moscow Standard Time (MSK), Arabian Standard Time (AST)', '(UTC+03:30) Iran Standard Time',
          '(UTC+04:00) Gulf Standard Time (GST), Azerbaijan Time (AZT)', '(UTC+04:30) Afghanistan Time (AFT)',
          '(UTC+05:00) Pakistan Standard Time (PKT), Uzbekistan Time (UZT)', '(UTC+05:30) Indian Standard Time (IST), Sri Lanka Standard Time (SLST)',
          '(UTC+05:45) Nepal Time (NPT)', '(UTC+06:00) Bangladesh Standard Time (BST), Bhutan Time (BTT)',
          '(UTC+06:30) Cocos Islands Time (CCT), Myanmar Time (MMT)', '(UTC+07:00) Indochina Time (ICT), Krasnoyarsk Time (KRAT)',
          '(UTC+08:00) China Standard Time (CST), Singapore Standard Time (SGT)', '(UTC+08:45) Australian Central Western Standard Time',
          '(UTC+09:00) Japan Standard Time (JST), Korea Standard Time (KST)', '(UTC+09:30) Australian Central Standard Time (ACST)',
          '(UTC+10:00) Australian Eastern Standard Time (AEST), Papua New Guinea Time (PGT)', '(UTC+10:30) Lord Howe Island Time (LHT)',
          '(UTC+11:00) Solomon Islands Time (SBT), Vanuatu Time (VUT)', '(UTC+11:30) Norfolk Island Time',
          '(UTC+12:00) Fiji Time (FJT), New Zealand Standard Time (NZST)', '(UTC+12:45) Chatham Islands Time (CHAST)',
          '(UTC+13:00) Tonga Time (TOT), Phoenix Islands Time (PHOT)', '(UTC+14:00) Line Islands Time (LINT)',
          '(UTC-01:00) Cape Verde Time', '(UTC-02:00) Brazil Time Zone 1', '(UTC-03:00) Brazil Time Zone 2',
          '(UTC-04:00) Atlantic Standard Time', '(UTC-05:00) Eastern Standard Time', '(UTC-06:00) Central Standard Time',
          '(UTC-07:00) Mountain Standard Time', '(UTC-08:00) Pacific Standard Time', '(UTC-09:00) Alaska Standard Time',
          '(UTC-10:00) Hawaii-Aleutian Standard Time', '(UTC-11:00) Samoa Standard Time', '(UTC-12:00) Baker Island Time',
          '(UTC+01:00) Central European Time', '(UTC+02:00) Eastern European Time', '(UTC+03:00) Moscow Standard Time',
          '(UTC+03:30) Iran Standard Time', '(UTC+04:00) Gulf Standard Time', '(UTC+04:30) Afghanistan Time',
          '(UTC+05:00) Pakistan Standard Time', '(UTC+05:30) Indian Standard Time', '(UTC+05:45) Nepal Time',
          '(UTC+06:00) Bangladesh Standard Time', '(UTC+06:30) Myanmar Standard Time', '(UTC+07:00) Indochina Time',
          '(UTC+08:00) China Standard Time', '(UTC+08:45) Australian Central Western Standard Time',
          '(UTC+09:00) Japan Standard Time', '(UTC+09:30) Australian Central Standard Time',
          '(UTC+10:00) Australian Eastern Standard Time', '(UTC+10:30) Lord Howe Island Time',
          '(UTC+11:00) Solomon Islands Time', '(UTC+11:30) Norfolk Island Time',
          '(UTC+12:00) New Zealand Standard Time', '(UTC+12:45) Chatham Islands Time',
          '(UTC+13:00) Tonga Time', '(UTC+14:00) Line Islands Time'
      ];

      // Populate the dropdown with timezone options
      timezoneList.innerHTML = '';
      timezones.forEach(tz => {
          const option = document.createElement('option');
          option.className = 'timezone-option';
          option.textContent = tz;
          timezoneList.appendChild(option);
      });

      // Function to get the current UTC offset string
      function getUTCOffsetString() {
          const offsetMinutes = new Date().getTimezoneOffset();
          const totalMinutes = -offsetMinutes;
          const sign = totalMinutes >= 0 ? '+' : '−';
          const hours = String(Math.floor(Math.abs(totalMinutes) / 60)).padStart(2, '0');
          const minutes = String(Math.abs(totalMinutes) % 60).padStart(2, '0');
          return `UTC${sign}${hours}:${minutes}`;
      }

      const updateInputs = () => {
          const timestampEl = document.getElementById(timestampDisplayId);
          const utcEl = document.getElementById(utcValueId);
          const timezoneText = timezoneInput.value;
          const utcOffset = timezoneText.includes('UTC') ? timezoneText.split("UTC")[1].split(")")[0].trim() : '';

          if (timestampEl) {
              timestampEl.value = getDateInTimezone(utcOffset);
          }
          if (utcEl) {
              utcEl.value = utcOffset;
          }
      };

      function getDateInTimezone(utcOffset) {
          if (!utcOffset) return '';
          const options = {
              timeZone: utcOffset,
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true
          };
          const date = new Date();
          return date.toLocaleString('en-US', options);
      }

      // Set initial value based on the user's local timezone
      const userUTC = getUTCOffsetString();
      let matched = false;
      timezones.forEach(tz => {
          if (tz.includes(userUTC)) {
              timezoneInput.value = tz;
              matched = true;
          }
      });
      if (!matched) {
          timezoneInput.value = userUTC;
      }
      
      updateInputs();

      // Event listeners
      timezoneInput.addEventListener('click', () => {
        timezoneInput.value = "";
          timezoneList.style.display = 'block';
          
        });
      timezoneInput.addEventListener('input', () => {
          const searchValue = timezoneInput.value.toLowerCase();
          const options = timezoneList.querySelectorAll('.timezone-option');
          options.forEach(option => {
              const optionText = option.textContent.toLowerCase();
              option.style.display = optionText.includes(searchValue) ? 'block' : 'none';
          });
      });
      document.addEventListener('click', (event) => {
          if (!timezoneInput.contains(event.target) && !timezoneList.contains(event.target)) {
              timezoneList.style.display = 'none';
          }
      });
      timezoneList.querySelectorAll('.timezone-option').forEach(option => {
          option.addEventListener('click', () => {
              timezoneInput.value = option.textContent;
              timezoneList.style.display = 'none';
              updateInputs();
          });
      });
  }
  
async function HASH_SHA256(input) {
  const encoder = new TextEncoder(); // UTF-8 encoder
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data); // returns a Promise
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('0' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}


  async function handleSubmitFormTWC(form, func, extra, responseContainerId) {
const respBox = document.getElementById(responseContainerId);
const formData = new FormData(form);

    const payload = {
      function: func,
formData: Object.fromEntries(formData.entries()),
userDetails: {
        ua: navigator.userAgent,
        time: new Date().toISOString()},
extra: extra
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
      return result;
    } catch (err) {
      respBox.textContent = "Error submitting form.";
      return "Error submitting form.";
    }

    submitBtn.disabled = false;
  };

/**
 * Toggles the display of a specified HTML element using a CSS selector.
 * @param {string} selector - The CSS selector for the element to toggle (e.g., '#myId', '.myClass', 'div.container').
 * @param {string} displayType - The CSS display property to show the element as (e.g., 'flex', 'block', 'grid').
 */
function toggleElement(selector, displayType) {
  const element = document.querySelector(selector);
  if (element) {
    const currentDisplay = window.getComputedStyle(element).display;
    
    if (currentDisplay !== 'none') {
      element.style.display = 'none';
    } else {
      element.style.display = displayType;
    }
  }
}
