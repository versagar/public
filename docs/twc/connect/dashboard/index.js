
showDashboard();
async function showDashboard(){
  if(localStorage.getItem('physertwcloginstatus') === 'true') {
  const data = await connectMe('POST','dashboard');
  const dashboardData = data?.data || {};
    //renderNode2(dashboardData, document.getElementById('studentDashboard'));
  await loadStudentDashboard(data, 'studentDashboard');
} else {
  console.log('Dashboard Else');
   openFrontLoginForm();
}
}

async function loadStudentDashboard(data = {}, containerId){
  const container = document.getElementById(containerId);

  if (!Object.keys(data).length && container){
    console.log('No Data');
    return;
  }

  const dashboardData = data?.data || data;

  container.innerHTML = `
    <div class="flex flex-space-around round2 dashboard-tabs pad1 bg-gradient grad-wl grad-ang-0 text-primary bold ov-scroll"></div>
    <div class="dashboard-disc mt1 mb1"></div>
  `;

  const tabsContainer = container.querySelector('.dashboard-tabs');
  const dashboardDisc = container.querySelector('.dashboard-disc');

  Object.keys(dashboardData).forEach(tabItem => {

    const tabNode = document.createElement('div');
    tabNode.className = 'inline-block btn pad2 round2 shadow2 bg-light ml1';
    tabNode.innerHTML = tabItem;

    tabNode.onclick = () => {
tabsContainer.querySelectorAll('.dashboard-tabs > div')
  .forEach(tab => {
    tab.classList.remove('bg-secondary');
    tab.classList.add('bg-light');
  });

tabNode.classList.remove('bg-light');
tabNode.classList.add('bg-secondary');
  dashboardDisc.innerHTML = '';
  const tabData = dashboardData[tabItem];

  // Pass the full data to renderNode2
  renderNode2(tabData, dashboardDisc, {
    arrayRow: 'flex ov-scroll mb2 pad2',
    arrayCell: 'inline-block pad0-5 ml2 bg-secondary round2',
    objectBlock: 'pad0-5 mb2 bg-gradient round3 grad-ls grad-ang-135',
    objectTitle: 'bold',
    primitiveValue: ''
  });
};
    tabsContainer.appendChild(tabNode);   
  });
  const firstTab = tabsContainer.firstChild;
if(firstTab){
  firstTab.classList.remove('bg-light');
  firstTab.classList.add('bg-secondary');
    renderNode2(dashboardData[firstTab.textContent], dashboardDisc, {
    arrayRow: 'flex ov-scroll mb2 pad2',
    arrayCell: 'inline-block pad0-5 ml2 bg-secondary round2',
    objectBlock: 'pad0-5 mb2 bg-gradient round3 grad-ls grad-ang-135',
    objectTitle: 'bold',
    primitiveValue: ''
  });
}
}

function renderNode2(data, container, styleMap = {}) {

  // Default classes if not provided
  const {
    arrayRow = 'flex ov-scroll mb2',
    arrayCell = 'inline-block ml1',
    objectBlock = 'mb2',
    objectTitle = 'bold',
    primitiveValue = ''
  } = styleMap;

  // Recursively parse JSON strings
  if (typeof data === 'string') {
    try { data = JSON.parse(data); } catch {}
  }

  // ARRAY → table-like row
  if (Array.isArray(data)) {
    const row = document.createElement('div');
    row.className = arrayRow;

    data.forEach(item => {
      const cell = document.createElement('div');
      cell.className = arrayCell;
      renderNode2(item, cell, styleMap);
      row.appendChild(cell);
    });

    container.appendChild(row);
  }

  // OBJECT → key: value in one line
  else if (typeof data === 'object' && data !== null) {
    Object.entries(data).forEach(([key, value]) => {
      const block = document.createElement('div');
      block.className = objectBlock;

      if (typeof value !== 'object' || value === null) {
        const line = document.createElement('div');
        line.className = primitiveValue;
        line.innerHTML = `<span class="${objectTitle}">${key}:</span> ${value}`;
        block.appendChild(line);
      } else {
        const title = document.createElement('div');
        title.className = objectTitle;
        title.textContent = key + ':';
        block.appendChild(title);
        renderNode2(value, block, styleMap);
      }

      container.appendChild(block);
    });
  }

  // PRIMITIVE
  else {
    const node = document.createElement('div');
    node.className = primitiveValue;
    node.textContent = data;
    container.appendChild(node);
  }
}

function renderNode(data, container){

  // ARRAY → render tabs
  if (Array.isArray(data)) {

    const tabs = document.createElement('div');
    tabs.className = 'flex ov-scroll mb2';

    const content = document.createElement('div');

    data.forEach((item, index) => {

      const tab = document.createElement('div');
      tab.className = 'pad1 bg-secondary round2 ml1 pointer';
      tab.textContent = `Item ${index+1}`;

      tab.onclick = () => {
        content.innerHTML = '';
        renderNode(item, content);
      };

      tabs.appendChild(tab);
    });

    container.appendChild(tabs);
    container.appendChild(content);

    tabs.firstChild?.click();
  }

  // OBJECT → key value blocks
  else if (typeof data === "object" && data !== null) {

    Object.entries(data).forEach(([key, value]) => {

      const block = document.createElement('div');
      block.className = 'pad1 mb2 bg-gradient grad-ls grad-ang-135';

      const title = document.createElement('div');
      title.className = 'bold';
      title.textContent = key;

      block.appendChild(title);

      if (typeof value === "object") {
        renderNode(value, block);
      } else {
        const val = document.createElement('div');
        val.textContent = value;
        block.appendChild(val);
      }

      container.appendChild(block);

    });

  }

  // PRIMITIVE
  else {

    const node = document.createElement('div');
    node.textContent = data;
    container.appendChild(node);

  }
}