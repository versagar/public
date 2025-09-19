function handleRouting() {
  const path = localStorage.getItem('physertwcpathInput');
  let secondSegment = "";
  let thirdSegment = "";

  if (path && path.length > 3) {
    const segments = path.split('/');
    secondSegment = segments[2] || "";
    thirdSegment = segments[3] || "";
  }

  localStorage.removeItem('physertwcpathInput');
  localStorage.setItem('thirdSegmentafterconnect', thirdSegment);

  if (secondSegment) {
    switch (secondSegment) {
      case 'courses':
        loadIn('wbody', '/sa6ang2rha7lay9/t6w2c7pfs/courses.html');
        break;
      case 'connect':
        loadIn('wbody', '/sa6ang2rha7lay9/t6w2c7pfs/join.html');
        break;
      default:
        loadObject('wbody', '/file-error.html');
        break;
    }
  } else {
    loadIn('wbody', '/sa6ang2rha7lay9/t6w2c7pfs/hometwc.html');
  }
}



