/* Shared motion for every REI room. Graphics stay in the existing
   particle fields. This layer adds the night atmosphere, arrivals,
   and the pointer ring. */
(() => {
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const quiet = () => reduced.matches || document.documentElement.dataset.motion === "off" || document.body.classList.contains("reading-focus");

  const field = document.createElement("canvas");
  field.id = "award-field";
  field.setAttribute("aria-hidden", "true");
  const grain = document.createElement("div");
  grain.id = "award-grain";
  grain.setAttribute("aria-hidden", "true");
  const vignette = document.createElement("div");
  vignette.id = "award-vignette";
  vignette.setAttribute("aria-hidden", "true");
  const cursor = document.createElement("div");
  cursor.id = "award-cursor";
  cursor.setAttribute("aria-hidden", "true");
  const trail = document.createElement("div");
  trail.id = "award-cursor-trail";
  trail.setAttribute("aria-hidden", "true");
  document.body.prepend(vignette, grain, field, cursor, trail);

  const ctx = field.getContext("2d");
  const stars = Array.from({ length: 48 }, (_, i) => ({
    x: (i * 97) % 1000 / 1000,
    y: (i * 53) % 1000 / 1000,
    r: i % 5 === 0 ? 1.4 : 0.7,
    p: i
  }));
  let w = 0;
  let h = 0;
  let tx = 0.5;
  let ty = 0.5;
  let px = 0.5;
  let py = 0.5;
  let cx = -100;
  let cy = -100;
  let rx = -100;
  let ry = -100;
  let frame = 0;

  function resize() {
    w = field.width = Math.floor(innerWidth);
    h = field.height = Math.floor(innerHeight);
  }
  resize();
  addEventListener("resize", resize);

  function draw(now) {
    frame = requestAnimationFrame(draw);
    if (document.hidden || quiet()) {
      ctx.clearRect(0, 0, w, h);
      cursor.classList.remove("is-on");
      trail.classList.remove("is-on");
      return;
    }
    px += (tx - px) * 0.04;
    py += (ty - py) * 0.04;
    ctx.clearRect(0, 0, w, h);
    for (const star of stars) {
      const drift = now * 0.000012 * (star.p % 3 + 1);
      const x = ((star.x + drift + (px - 0.5) * 0.03) % 1) * w;
      const y = ((star.y + Math.sin(now * 0.0002 + star.p) * 0.008 + (py - 0.5) * 0.02) % 1) * h;
      ctx.fillStyle = star.r > 1 ? "rgba(232,238,246,0.55)" : "rgba(201,227,255,0.28)";
      ctx.fillRect(x, y, star.r, star.r);
    }
    if (!fine.matches || document.body.classList.contains("reading-focus")) return;
    rx += (cx - rx) * 0.18;
    ry += (cy - ry) * 0.18;
    const tx2 = rx + (cx - rx) * 0.35;
    const ty2 = ry + (cy - ry) * 0.35;
    cursor.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    trail.style.transform = `translate3d(${tx2}px, ${ty2}px, 0)`;
  }
  frame = requestAnimationFrame(draw);

  addEventListener("pointermove", (event) => {
    tx = event.clientX / innerWidth;
    ty = event.clientY / innerHeight;
    cx = event.clientX;
    cy = event.clientY;
    const hot = event.target.closest("a, button, summary, label, .lesson-card, .roadmap-step, .note, .project-row, .paper-record");
    cursor.classList.toggle("is-hot", !!hot);
    const typing = event.target.closest("input, textarea, select, [contenteditable='true']");
    const show = fine.matches && !quiet() && !typing;
    cursor.classList.toggle("is-on", show);
    trail.classList.toggle("is-on", show);
    document.body.classList.toggle("award-cursor", show);
  }, { passive: true });

  addEventListener("scroll", () => {
    document.querySelector(".site-header")?.classList.toggle("is-scrolled", scrollY > 24);
  }, { passive: true });

  let last = "";
  function arrive() {
    if (quiet()) return;
    const main = document.getElementById("main");
    if (!main) return;
    const sig = `${document.body.dataset.page || ""}|${location.hash}|${main.innerText.length}`;
    if (sig === last) return;
    last = sig;
    const nodes = [...main.querySelectorAll(":scope > *, :scope .page-body > *, :scope .research-shell > *, :scope .lesson-layout > *, :scope .roadmap > *, :scope .lesson-grid > *, :scope .resource-grid > *, :scope .workshop-grid > *, :scope .workspace-grid > *")].slice(0, 14);
    nodes.forEach((el, index) => {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = `award-rise .85s cubic-bezier(.16,1,.3,1) ${Math.min(index, 8) * 45}ms both`;
    });
  }

  let token = 0;
  function schedule() {
    const current = ++token;
    const run = () => { if (current === token) arrive(); };
    requestAnimationFrame(run);
    setTimeout(run, 60);
    setTimeout(run, 420);
  }
  addEventListener("rrh:route", schedule);
  addEventListener("rrh:motion", () => document.body.classList.toggle("award-cursor", !quiet() && fine.matches));
  if (document.body.dataset.page) schedule();
  document.querySelector(".site-header")?.classList.toggle("is-scrolled", scrollY > 24);

  addEventListener("pagehide", () => cancelAnimationFrame(frame));
})();
