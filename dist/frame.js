/* Entrance fallback and the home menu. Runs after each route. */
(() => {
  const desktop = () => matchMedia('(min-width: 901px)').matches;

  function closeMenu() {
    document.body.classList.remove('menu-open');
    const burger = document.querySelector('.frame .burger');
    if (!burger) return;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }

  function settle() {
    const nodes = [...document.querySelectorAll('.frame .appear, .frame .hero-photo')];
    nodes.forEach((el) => {
      const anims = typeof el.getAnimations === 'function' ? el.getAnimations() : [];
      const alive = anims.some((a) => a.playState === 'running' || a.playState === 'finished');
      if (!alive) el.classList.add('is-in');
    });
  }

  function bind() {
    closeMenu();
    if (document.body.dataset.page !== 'home') return;
    const root = document.querySelector('.frame');
    if (!root || root.dataset.bound) return;
    root.dataset.bound = '1';
    root.querySelectorAll('.appear').forEach((el) => {
      el.addEventListener('animationend', () => el.classList.add('is-in'), { once: true });
    });
    const photo = root.querySelector('.hero-photo');
    if (photo) photo.addEventListener('animationend', () => photo.classList.add('is-in'), { once: true });
    requestAnimationFrame(() => requestAnimationFrame(settle));

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
