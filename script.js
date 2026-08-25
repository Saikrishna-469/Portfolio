/* ============================================================
   Saikrishna Vennam — portfolio
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- scroll animations ---------- */
  if (window.AOS) {
    AOS.init({
      duration: reduceMotion ? 0 : 600,
      easing: 'ease-out',
      once: true,
      offset: 60,
      disable: reduceMotion
    });
  }

  /* ---------- theme toggle ---------- */
  var body   = document.body;
  var toggle = document.getElementById('theme-toggle');
  var icon   = toggle ? toggle.querySelector('i') : null;

  function readStored() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function store(value) {
    try { localStorage.setItem('theme', value); } catch (e) { /* private mode */ }
  }

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    if (icon) {
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  var stored = readStored();
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(stored || (prefersDark ? 'dark' : 'light'));

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      store(next);
    });
  }

  /* ---------- active section in nav ---------- */
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.nav-links a[href^="#"]')
  );

  if (links.length && 'IntersectionObserver' in window) {
    var targets = links
      .map(function (a) { return document.querySelector(a.getAttribute('href')); })
      .filter(Boolean);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          var match = a.getAttribute('href') === '#' + entry.target.id;
          a.style.color = match ? 'var(--ink)' : '';
          a.style.borderBottomColor = match ? 'var(--signal)' : '';
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    targets.forEach(function (t) { observer.observe(t); });
  }

  /* ---------- current year in colophon (if present) ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
