/* Scroll is the connection. Frames crossfade with the page, not on a timer. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let raf = 0;
  let bound = null;

  function smooth(a, b, t) {
    const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
    return x * x * (3 - 2 * x);
  }

  function draw(canvas, t, idle) {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const stage = canvas.parentElement;
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(214,255,74,.34)';
    ctx.shadowColor = 'rgba(190,255,70,.55)';
    ctx.shadowBlur = 28;
    ctx.lineWidth = Math.max(64, w * 0.07);
    ctx.beginPath();
    const y = h * (0.18 + t * 0.42) + Math.sin(idle) * 18;
    ctx.moveTo(w * 0.28, -30);
    ctx.bezierCurveTo(w * 0.62, y * 0.4, w * 0.4, h * 0.55 + t * 40, w * 0.78, y);
    ctx.bezierCurveTo(w * 1.02, y + 80, w * 0.7, h * 0.9, w * 0.42, h + 40);
    ctx.stroke();
  }

  function tick(pin) {
    const off = document.documentElement.dataset.motion === 'off' || reduce.matches || innerWidth < 901;
    const reel = pin.closest('.reel');
    if (reel) {
      const total = Math.max(1, reel.offsetHeight - innerHeight);
      const passed = Math.min(1, Math.max(0, -reel.getBoundingClientRect().top / total));
      reel.style.setProperty('--rail', (passed * 100) + '%');
    }
    if (off) return;
    const total = Math.max(1, pin.offsetHeight - innerHeight);
    const t = Math.min(1, Math.max(0, -pin.getBoundingClientRect().top / total));
    const o = [
      1 - smooth(0.26, 0.34, t),
      smooth(0.28, 0.36, t) * (1 - smooth(0.60, 0.68, t)),
      smooth(0.62, 0.70, t)
    ];
    pin.querySelectorAll('.frame').forEach((el, i) => {
      el.style.opacity = o[i].toFixed(3);
      el.style.transform = 'translateY(' + ((1 - o[i]) * 28).toFixed(1) + 'px)';
      const live = o[i] > 0.55;
      el.classList.toggle('is-live', live);
      el.toggleAttribute('inert', !live);
    });
    const path = pin.querySelector('.flow-path');
    if (path) path.style.strokeDashoffset = '0';
    pin.querySelectorAll('.record i').forEach((bar, i) => {
      const done = bar.dataset.done === '1';
      const base = 0.42 + ((i * 5) % 7) * 0.06;
      const scale = done ? Math.min(1, base + 0.28) : base;
      bar.style.transform = 'scaleY(' + scale.toFixed(3) + ')';
    });
    const lime = document.querySelector('.lime-break');
    if (lime) {
      const r = lime.getBoundingClientRect();
      document.body.classList.toggle('on-lime', r.top < 72 && r.bottom > 72);
    }
    const canvas = pin.querySelector('canvas');
    if (canvas) draw(canvas, t, performance.now() / 1400);
  }

  function bind(pin) {
    if (bound === pin) return;
    bound = pin;
    cancelAnimationFrame(raf);
    const loop = () => { tick(pin); raf = requestAnimationFrame(loop); };
    loop();
  }

  function boot() {
    const pin = document.querySelector('.reel-pin');
    if (!pin) { bound = null; cancelAnimationFrame(raf); return; }
    bind(pin);
  }

  new MutationObserver(boot).observe(document.getElementById('main'), { childList: true });
  addEventListener('rrh:motion', boot);
  if (document.querySelector('.reel-pin')) boot();
})();
