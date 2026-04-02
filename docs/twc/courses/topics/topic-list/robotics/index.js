async function loadRoboticsTopics() {
  await loadIn('loadedBody', 'page.html');
}
document.addEventListener('DOMContentLoaded', loadRoboticsTopics);
