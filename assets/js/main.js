/* =========================================
   aayushagrawal.codes — main.js
   ========================================= */

// ── Theme: saved choice wins, otherwise follow the OS
(function () {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function apply(theme) { root.dataset.theme = theme; }

  apply(saved() || (media.matches ? 'dark' : 'light'));

  media.addEventListener('change', (e) => {
    if (!saved()) apply(e.matches ? 'dark' : 'light');
  });

  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  });
})();

// ── Nav: border on scroll + mobile menu
(function () {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.getElementById('nav-links');

  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }
})();

// ── Active section in nav
(function () {
  const items = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!items.length || !('IntersectionObserver' in window)) return;

  const byId = {};
  items.forEach((a) => { byId[a.getAttribute('href').slice(1)] = a; });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      items.forEach((a) => a.classList.remove('active'));
      const hit = byId[e.target.id];
      if (hit) hit.classList.add('active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  Object.keys(byId).forEach((id) => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
})();

// ── Reveal on scroll
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    });
  }, { threshold: 0.1 });
  els.forEach((el, i) => {
    if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + 'ms';
    io.observe(el);
  });
})();

// ── Footer year
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
