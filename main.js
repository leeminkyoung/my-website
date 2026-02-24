// ─── PAGE NAVIGATION ───
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-links a, .nav-mobile-links a').forEach(a => a.classList.remove('active'));

  const page = document.getElementById(name + '-page');
  if (page) {
    page.classList.add('active');
    window.scrollTo(0, 0);
  }

  const navMap = { projects: 'nav-projects', explorations: 'nav-explorations', about: 'nav-about' };
  if (navMap[name]) {
    const el = document.getElementById(navMap[name]);
    if (el) el.classList.add('active');
  }
}

// ─── NAV SCROLL EFFECT ───
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
});
