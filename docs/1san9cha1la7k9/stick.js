const path = window.location.pathname;

async function handleRouting() {
  if (path.startsWith('/twc')) {
    // Step 1: Load twc.html into #main with animation
    await loadIn('spa-root', '/twc.html');

    // Step 2: After twc.html is loaded, handle deeper route (e.g., /twc/course)
    if (path === '/twc/course') {
      // Give a small delay to ensure twc.html is fully rendered
      setTimeout(() => {
        loadIn('wbody', '/sa6ang2rha7lay9/t6w2c7pfs/courses.html');
      }, 550); // Delay slightly longer than transition time
    }
  } else {
    // Default: Load home content into #main
    loadIn('myFeed', '/file-error.html'); // or replace with inline HTML if needed
  }
}

handleRouting();
