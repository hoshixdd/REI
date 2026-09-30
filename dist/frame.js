/* Home interaction, the shared picture, and the menu. */
(() => {
  const desktop = () => matchMedia('(min-width: 901px)').matches;
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4';

  if (!document.querySelector('.atmosphere')) {
    const air = document.createElement('div');
    air.className = 'atmosphere';
    air.setAttribute('aria-hidden', 'true');
    air.innerHTML = `<video autoplay muted loop playsinline preload="auto" src="${VIDEO}"></video>`;
    document.body.prepend(air);
    const video = air.querySelector('video');
    video.play?.().catch(() => {});
  }

  const light = { x: innerWidth * 0.5, y: innerHeight * 0.42, tx: innerWidth * 0.5, ty: innerHeight * 0.42 };
  let raf = 0;
  function paintLight() {
    raf = 0;
    const node = document.querySelector('.glass-light');
    const copy = document.querySelector('.frame .hero-copy');
    if (!node) return;
    node.style.transform = `translate3d(${light.x - 210}px, ${light.y - 210}px, 0)`;
    if (copy && !reduce()) {
      const dx = (light.x / innerWidth - 0.5) * 10;
      const dy = (light.y / innerHeight - 0.5) * 8;
      copy.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    }
  }
  addEventListener('pointermove', (e) => {
    if (document.body.dataset.page !== 'home' || reduce()) return;
    light.tx = e.clientX;
    light.ty = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      light.x += (light.tx - light.x) * 0.18;
      light.y += (light.ty - light.y) * 0.18;
      paintLight();
      if (Math.abs(light.tx - light.x) > 0.6 || Math.abs(light.ty - light.y) > 0.6) raf = requestAnimationFrame(function step() {
        light.x += (light.tx - light.x) * 0.18;
        light.y += (light.ty - light.y) * 0.18;
        paintLight();
        if (Math.abs(light.tx - light.x) > 0.6 || Math.abs(light.ty - light.y) > 0.6) raf = requestAnimationFrame(step);
        else raf = 0;
      });
      else raf = 0;
    });
  }, { passive: true });

  function closeMenu() {
    document.body.classList.remove('menu-open');
    const burger = document.querySelector('.frame .burger');
    if (!burger) return;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  function settle() {
    document.querySelectorAll('.frame .appear, .atmosphere').forEach((el) => {
      const anims = typeof el.getAnimations === 'function' ? el.getAnimations() : [];
      const alive = anims.some((a) => a.playState === 'running' || a.playState === 'finished');
      if (!alive) el.classList.add('is-in');
    });
  }

  function bindPhases(root) {
    const note = root.querySelector('#phase-note');
    const chips = [...root.querySelectorAll('.phase-chip')];
    if (!note || !chips.length) return;
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => {
          const on = c === chip;
          c.classList.toggle('is-on', on);
          c.setAttribute('aria-selected', String(on));
        });
        note.textContent = chip.dataset.name + '. ' + chip.dataset.desc;
        root.dataset.light = chip.dataset.phase || '0';
      });
    });
  }

  function bind() {
    closeMenu();
    document.body.classList.remove('is-settling');
    requestAnimationFrame(() => document.body.classList.add('is-settling'));
    if (document.body.dataset.page !== 'home') return;
    const root = document.querySelector('.frame');
    if (!root || root.dataset.bound) return;
    root.dataset.bound = '1';
    root.querySelectorAll('.appear').forEach((el) => {
      el.addEventListener('animationend', () => el.classList.add('is-in'), { once: true });
    });
    requestAnimationFrame(() => requestAnimationFrame(settle));
    bindPhases(root);
    paintLight();

    const burger = root.querySelector('.burger');
    const nav = root.querySelector('#frame-nav');
    burger?.addEventListener('click', () => {
      const on = !document.body.classList.contains('menu-open');
      document.body.classList.toggle('menu-open', on);
      burger.setAttribute('aria-expanded', String(on));
      burger.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
    });
    nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
    root.querySelector('.menu-backdrop')?.addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
  window.addEventListener('resize', () => { if (desktop()) closeMenu(); });
  window.addEventListener('rrh:route', bind);
  bind();
})();
