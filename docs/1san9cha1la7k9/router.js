    loadScript("OO0O00O010O0OO0O00");
  localStorage.setItem('physertwcpathInput', window.location.pathname);
    function load404() {
      const path = window.location.pathname;
      const firstSegment = path.split('/')[1];
      
      if (firstSegment === 'twc') {
        document.title = "TWC Classrooms";
        document.getElementById('spa-root').innerHTML = `
        <object type="text/html" data="/twc.html" style="width:100%; height:100vh;"></object>
      `;
      } else {
        loadObject('myFeed', '/file-error.html');
      }
    }
