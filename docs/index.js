loadScript('OO0O00O010O0OO0O00');

function toggleMblock() {
  const mblock = document.querySelector('.mblock');
  if (mblock.style.display === 'flex') {
    mblock.style.display = 'none';
  } else {
    mblock.style.display = 'flex';
  }
}