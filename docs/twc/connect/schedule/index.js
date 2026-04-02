if (localStorage.getItem('physertwcloginstatus') == 'true') { loadSchedule(); }



async function loadSchedule() {
  await loadScript('/1san9cha1la7k9/cardcat.js');
  console.log('cardcat loaded');

  async function renderDate1(datesJson, ContainerId, selectionBoxId) {
    const selectionBox = document.getElementById(selectionBoxId);
    function updateDateActions() {
      const actionBox = document.getElementById('datesAction');

      if (selectionBox.children.length > 0) {

        if (!actionBox.querySelector('.dates-btns')) {

          const wrapper = document.createElement('div');
          wrapper.className = 'dates-btns';

          const btn1 = document.createElement('button');
          btn1.textContent = 'Apply';
          btn1.className = 'btn pad2 ml1 round2';
          btn1.onclick = async () => {
const datesToSubmit = [...selectionBox.children].map(el => el.textContent);
        const resp =   await connectMe('POST','submitSchedule',datesToSubmit);
        selectionBox.innerHTML = datesToSubmit;
          }

          const btn2 = document.createElement('button');
          btn2.textContent = 'Clear';
          btn2.className = 'btn pad2 ml1 round2';

          btn2.onclick = () => {
            selectionBox.innerHTML = '';
            updateDateActions();
            loadSchedule();
          };

          wrapper.append(btn1, btn2);
          actionBox.appendChild(wrapper);
        }

      } else {
        const btns = actionBox.querySelector('.dates-btns');
        if (btns) btns.remove();
      }
    }
    const datesHtmlJson = datesJson.map(item => ({
      date: `
        <div class="date">
          <div class="calendar-icon">${new Date(item.Date).getDate()}</div>
          <h3>${new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric"
      }).format(new Date(item.Date)).replace(" ", ", ")}</h3>
        </div>
      `,
      time: `<h2>${item.Time}</h2>`,
      batchname: `<h4>${item.batchname}</h4>`,
      info1: `<p>${item.Info1}</p>`,
      onclick: (article) => {
        const selectedDate = document.createElement('div');
        selectedDate.className = 'btn pad2 bg-gradient grad-sl grad-ang-135 ml1 round2 inline-block';
        selectedDate.title = 'Click to Remove';
        selectedDate.textContent =
          article.querySelector('.date').textContent;

        selectedDate.addEventListener('click', () => {
          article.style.display = '';
          selectedDate.remove();
          updateDateActions();
        });

        selectionBox.appendChild(selectedDate);
        sortDateBox(selectionBox);
        article.style.display = 'none';
        updateDateActions();
      }
    }));

    renderGenericCards(datesHtmlJson, ContainerId);
  }

  function renderGenericCards(items, cardContainerId) {
    const container = document.getElementById(cardContainerId);
    container.innerHTML = "";

    items.forEach(item => {
      const article = document.createElement("article");
      article.title = 'Click to Select';
      article.innerHTML = Object.entries(item)
        .filter(([key]) => key !== "onclick")
        .map(([, value]) => `<div>${value}</div>`)
        .join("");

      if (typeof item.onclick === "function") {
        article.addEventListener("click", () => item.onclick(article));
        article.style.cursor = "pointer";
      }

      container.appendChild(article);
    });
  }

  async function loadDates() {
    const datesData = await connectMe('POST', 'dates');
    const datesJson = datesData.data.dates || null;
    if (datesJson) { await renderDate1(datesJson, 'testContainer', 'selectionBox'); } else {
      document.getElementById('testContainer').innerHTML = `
    <h1>${datesJson.callResult}</h1>
    `
    }
  }
  loadDates();
}

