const studies = document.querySelector('.studies');
const options = [...document.querySelectorAll('.study')];
const controls = [...document.querySelectorAll('button[data-view]')];

function setView(view) {
  if (!['all', 'a', 'b', 'c'].includes(view)) view = 'all';
  studies.dataset.view = view;
  options.forEach((option) => { option.hidden = view !== 'all' && option.id !== view; });
  controls.forEach((control) => {
    control.setAttribute('aria-pressed', String(control.dataset.view === view));
  });
}
controls.forEach((control) => {
  control.addEventListener('click', () => {
    history.replaceState(null, '', `#${control.dataset.view}`);
    setView(control.dataset.view);
  });
});
window.addEventListener('hashchange', () => setView(location.hash.slice(1)));
setView(location.hash.slice(1));
