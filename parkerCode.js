// Hash-based navigation preserves direct links and browser back/forward behavior.
// Without JavaScript, every section remains available as a normal document.
const pages = [...document.querySelectorAll('.page-panel')];
const projects = [...document.querySelectorAll('.project')];
const pageLinks = [...document.querySelectorAll('[data-page]')];
const projectLinks = [...document.querySelectorAll('[data-project]')];
const categories = [...document.querySelectorAll('.project-category')];
const categoryLinks = [...document.querySelectorAll('[data-category]')];
let currentCategory = 'software';
const currentProjects = Object.fromEntries(categories.map((category) => [category.id, category.querySelector('.project')?.id]));

function showPage() {
  const hash = location.hash.slice(1);
  const project = projects.find((item) => item.id === hash);
  const category = categories.find((item) => item.id === hash);
  if (project) {
    currentCategory = project.closest('.project-category').id;
    currentProjects[currentCategory] = project.id;
  } else if (category) currentCategory = category.id;
  const pageId = project || category ? 'work' : pages.some((item) => item.id === hash) ? hash : 'home';
  document.querySelectorAll('.project video').forEach((video) => {
    if (pageId !== 'work' || video.closest('.project').id !== currentProjects[currentCategory]) video.pause();
  });
  pages.forEach((page) => { page.hidden = page.id !== pageId; });
  categories.forEach((item) => { item.hidden = item.id !== currentCategory; });
  categoryLinks.forEach((link) => {
    if (link.dataset.category === currentCategory) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  projects.forEach((item) => { item.hidden = item.id !== currentProjects[currentCategory]; });
  pageLinks.forEach((link) => {
    if (link.dataset.page === pageId) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  projectLinks.forEach((link) => {
    if (link.dataset.project === currentProjects[currentCategory]) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  document.title = `Parker Harris — ${pageId === 'home' ? 'Software Developer' : pageId === 'work' ? 'Projects' : pageId.charAt(0).toUpperCase() + pageId.slice(1)}`;
}

document.documentElement.classList.add('js');
showPage();
window.addEventListener('hashchange', showPage);
// Handle internal links without the browser jumping past the persistent header.
document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || link.classList.contains('skip-link') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  history.pushState(null, '', link.getAttribute('href'));
  showPage();
  if (!link.dataset.project && !link.dataset.category) window.scrollTo({ top: 0, behavior: 'instant' });
});
window.addEventListener('popstate', showPage);

const motionToggle = document.querySelector('.motion-toggle');
const skylineScene = document.querySelector('.skyline-scene');
if (motionToggle && skylineScene) {
  motionToggle.hidden = false;
  motionToggle.addEventListener('click', () => {
    const paused = skylineScene.classList.toggle('sails-paused');
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.textContent = paused ? 'Resume sails' : 'Pause sails';
  });
}

// Galleries are manual: no automatic image changes while someone is reading.
document.querySelectorAll('.project-gallery').forEach((gallery) => {
  const slides = [...gallery.querySelectorAll('.gallery-slide')];
  const controls = gallery.querySelector('.gallery-controls');
  if (!controls) return;
  let index = 0;
  function showImage() {
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    gallery.querySelector('.gallery-count').textContent = `${index + 1} / ${slides.length}`;
  }
  controls.hidden = false;
  controls.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      index = (index + Number(button.dataset.galleryStep) + slides.length) % slides.length;
      showImage();
    });
  });
  showImage();
});
