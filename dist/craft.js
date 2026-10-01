/* Header thickens when content passes under it. The menu locks the page while it is open. */
(() => {
  const header = document.querySelector('.site-header');
  const nav = document.getElementById('navigation');
  const toggle = document.querySelector('.menu-toggle');
  if (!header || !nav) return;

  const sentinel = document.createElement('div');
  sentinel.id = 'craft-sentinel';
  sentinel.setAttribute('aria-hidden', 'true');
  sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none';
  document.body.prepend(sentinel);

  const watcher = new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-compact', !entry.isIntersecting);
  });
  watcher.observe(sentinel);

  const syncNav = () => {
    const open = nav.classList.contains('open');
    document.body.classList.toggle('nav-open', open);
    if (open) nav.querySelector('a')?.focus();
    else if (nav.contains(document.activeElement)) toggle?.focus();
  };
  new MutationObserver(syncNav).observe(nav, { attributes: true, attributeFilter: ['class'] });
})();
