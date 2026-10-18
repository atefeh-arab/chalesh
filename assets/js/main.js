/* Nestly landing page — interactions
   - Icon sprite (paths exported from the Figma icon set)
   - Sticky nav: transparent over hero → white background variant
   - Mobile drawer menu (Figma "Open Menu" frame)
   - Scroll-spy active menu item (Figma "Item menu / Type=Active")
   - Dark mode toggle (persisted)
   - Gallery lightbox with keyboard navigation
   - Exclusive FAQ accordion
   - Reveal-on-scroll + count-up + loader
*/
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;

  /* ---------- Icon sprite ---------- */
  var icons = window.NESTLY_ICONS || {};
  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">';
  Object.keys(icons).forEach(function (k) { sprite += '<symbol id="' + k + '" viewBox="0 0 20 20">' + icons[k] + '</symbol>'; });
  doc.body.insertAdjacentHTML('afterbegin', sprite + '</svg>');
  doc.querySelectorAll('svg.i').forEach(function (s) { s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false'); });

  /* ---------- Loader ---------- */
  var loader = doc.getElementById('loader');
  function hideLoader() { if (loader) loader.classList.add('is-done'); }
  if (doc.readyState === 'complete') setTimeout(hideLoader, 150);
  else window.addEventListener('load', function () { setTimeout(hideLoader, 150); });
  setTimeout(hideLoader, 2500); // safety

  /* ---------- Sticky nav ---------- */
  var nav = doc.getElementById('nav');
  var hero = doc.querySelector('.hero');
  function onScroll() {
    var limit = hero ? hero.offsetHeight - nav.offsetHeight : 40;
    nav.classList.toggle('is-solid', window.scrollY > limit);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Theme ---------- */
  doc.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('nestly-theme', next); } catch (e) {}
      btn.setAttribute('aria-pressed', String(next === 'dark'));
    });
    btn.setAttribute('aria-pressed', String(root.getAttribute('data-theme') === 'dark'));
  });

  /* ---------- Mobile drawer ---------- */
  var drawer = doc.getElementById('drawer');
  var burger = doc.getElementById('burger');
  function setDrawer(open) {
    drawer.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    if (open) { drawer.removeAttribute('inert'); doc.body.style.overflow = 'hidden'; setTimeout(function () { drawer.querySelector('.drawer__close').focus(); }, 50); }
    else { drawer.setAttribute('inert', ''); doc.body.style.overflow = ''; }
  }
  burger.addEventListener('click', function () { setDrawer(true); });
  drawer.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) { setDrawer(false); if (!e.target.closest('a')) burger.focus(); }
  });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && drawer.classList.contains('is-open')) { setDrawer(false); burger.focus(); } });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', function (m) { if (m.matches) setDrawer(false); });

  /* ---------- Scroll-spy ---------- */
  var ids = ['about', 'gallery', 'features', 'reviews', 'pricing'];
  var links = doc.querySelectorAll('.menu a');
  if ('IntersectionObserver' in window) {
    var current = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) current = en.target.id; });
      links.forEach(function (a) {
        var on = a.getAttribute('href') === '#' + current;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(function (id) { var el = doc.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- Reveal + count-up ---------- */
  var reveals = doc.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, sibs = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.transitionDelay = Math.min(sibs, 5) * 70 + 'ms';
        el.classList.add('is-in');
        el.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else { reveals.forEach(function (el) { el.classList.add('is-in'); }); }

  function countUp(el) {
    var end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = null, dur = 1200;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- FAQ: one open at a time (fallback for browsers w/o details[name]) ---------- */
  var qas = doc.querySelectorAll('.qa');
  qas.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) qas.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var lb = doc.getElementById('lightbox');
  var shots = Array.prototype.slice.call(doc.querySelectorAll('#galleryGrid .shot'));
  var lbImg = doc.getElementById('lbImg'), lbCap = doc.getElementById('lbCap'), lbCount = doc.getElementById('lbCount');
  var idx = 0, opener = null;
  function show(i) {
    idx = (i + shots.length) % shots.length;
    var img = shots[idx].querySelector('img');
    lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
    lbCap.textContent = shots[idx].querySelector('figcaption').textContent;
    lbCount.textContent = (idx + 1) + ' / ' + shots.length;
  }
  shots.forEach(function (s, i) {
    s.querySelector('button').addEventListener('click', function (e) {
      opener = e.currentTarget; show(i);
      if (lb.showModal) lb.showModal(); else lb.setAttribute('open', '');
      doc.body.style.overflow = 'hidden';
    });
  });
  lb.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lb]');
    if (b) { var a = b.dataset.lb; if (a === 'close') lb.close(); else show(idx + (a === 'next' ? 1 : -1)); return; }
    if (e.target === lb) lb.close();
  });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
  lb.addEventListener('close', function () { doc.body.style.overflow = ''; if (opener) opener.focus(); });

  /* ---------- Customer story video (the play button is not decorative) ---------- */
  var vb = doc.getElementById('videoBox');
  var vid = doc.getElementById('storyVideo');
  var vPlay = doc.getElementById('storyPlay');
  var vOpener = null;
  if (vb && vid && vPlay) {
    vPlay.addEventListener('click', function () {
      vOpener = vPlay;
      if (vb.showModal) vb.showModal(); else vb.setAttribute('open', '');
      doc.body.style.overflow = 'hidden';
      var p = vid.play();
      if (p && p.catch) p.catch(function () { /* autoplay refused: controls stay available */ });
    });
    vb.addEventListener('click', function (e) {
      if (e.target === vb || e.target.closest('[data-vb]')) vb.close();
    });
    vb.addEventListener('close', function () {
      vid.pause();
      try { vid.currentTime = 0; } catch (err) {}
      doc.body.style.overflow = '';
      if (vOpener) vOpener.focus();
    });
  }
})();
