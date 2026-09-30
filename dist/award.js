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

/* A second, visible layer: opening veil, scroll bar, and section rises. */
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bar = document.createElement("div");
  bar.id = "award-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.append(bar);

  function paintBar() {
    const height = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${height > 0 ? Math.min(1, scrollY / height) : 0})`;
  }
  addEventListener("scroll", paintBar, { passive: true });
  paintBar();

  if (reduced) return;
  document.documentElement.classList.add("award-motion");
  const seen = new WeakSet();
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    }
  }, { threshold: 0.18 });

  function watch() {
    const nodes = document.querySelectorAll(".page-body > *, .roadmap-column, .filmstrip, .journey-summary, .lesson-card, .resource-instrument, .workshop, .pathway-tile, .workspace-grid > *, .lesson-layout, .research-shell > *");
    nodes.forEach((node) => {
      if (seen.has(node)) return;
      seen.add(node);
      node.classList.add("award-reveal");
      if (node.getBoundingClientRect().top < innerHeight * 0.92) node.classList.add("is-in");
      else io.observe(node);
    });
  }
  addEventListener("rrh:route", () => setTimeout(watch, 80));
  setTimeout(watch, 80);
  setTimeout(() => {
    document.querySelectorAll(".award-reveal:not(.is-in)").forEach((node) => node.classList.add("is-in"));
  }, 1600);
})();

/* Grouped glass navigation and a page entrance that wakes the 3D field. */
(() => {
  const nav = document.getElementById("navigation");
  if (!nav || nav.dataset.drops) return;
  nav.dataset.drops = "1";
  const groups = [
    ["Learn", "drop-learn", [
      ["#academy", "Academy", "Nine lessons, from a question to a proposal."],
      ["#journey", "Research journey", "Your milestones, and the one that is next."],
      ["#seminars", "Workshops", "A focused hour for one part of the work."]
    ]],
    ["Workspace", "drop-workspace", [
      ["#notebook", "Idea notebook", "Capture observations and questions."],
      ["#notebook/draft", "Proposal draft", "The outline built from your exercises."],
      ["#notebook/readiness", "Readiness check", "A 27-point review before you submit."]
    ]],
    ["Studio", "drop-studio", [
      ["#research", "Research studio", "Papers, evidence, claims, and the proposal."],
      ["#toolkit", "Toolkit", "Templates and checklists for the next step."]
    ]]
  ];
  nav.innerHTML = groups.map(([label, id, items]) => `<div class="nav-drop"><button type="button" aria-expanded="false" aria-controls="${id}">${label}<i aria-hidden="true"></i></button><div id="${id}" class="nav-panel" hidden>${items.map(([href, title, text]) => `<a href="${href}"><strong>${title}</strong><small>${text}</small></a>`).join("")}</div></div>`).join("");

  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  function closeAll(except) {
    nav.querySelectorAll(".nav-drop").forEach((drop) => {
      if (drop === except) return;
      drop.querySelector("button").setAttribute("aria-expanded", "false");
      drop.querySelector(".nav-panel").hidden = true;
    });
  }
  function mark() {
    const page = location.hash.slice(1).split("/")[0] || "home";
    const step = location.hash.slice(1);
    nav.querySelectorAll(".nav-panel a").forEach((link) => {
      const href = link.getAttribute("href").slice(1);
      const on = href === step || (href === "academy" && page === "lesson") || (href === "seminars" && page === "workshop") || (href === "toolkit" && page === "resource") || (href === "research" && page === "research") || (href === "notebook" && step === "notebook") || (href === "journey" && page === "journey");
      if (on) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    nav.querySelectorAll(".nav-drop > button").forEach((button) => {
      button.classList.toggle("is-current", !!button.parentElement.querySelector('a[aria-current="page"]'));
    });
  }
  nav.addEventListener("click", (event) => {
    const button = event.target.closest(".nav-drop > button");
    if (!button) return;
    const drop = button.parentElement;
    const open = button.getAttribute("aria-expanded") === "true";
    closeAll(open ? null : drop);
    button.setAttribute("aria-expanded", String(!open));
    drop.querySelector(".nav-panel").hidden = open;
  });
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) closeAll();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAll();
  });
  nav.querySelectorAll(".nav-drop").forEach((drop) => {
    drop.addEventListener("pointerenter", () => {
      if (!fine.matches || nav.classList.contains("open")) return;
      closeAll(drop);
      drop.querySelector("button").setAttribute("aria-expanded", "true");
      drop.querySelector(".nav-panel").hidden = false;
    });
    drop.addEventListener("pointerleave", () => {
      if (!fine.matches || nav.classList.contains("open")) return;
      drop.querySelector("button").setAttribute("aria-expanded", "false");
      drop.querySelector(".nav-panel").hidden = true;
    });
  });

  function entrance() {
    document.body.classList.remove("award-enter");
    void document.body.offsetWidth;
    document.body.classList.add("award-enter");
    window.dispatchEvent(new Event("award:field"));
    mark();
  }
  addEventListener("rrh:route", () => {
    closeAll();
    setTimeout(entrance, 30);
  });
  document.addEventListener("pointerenter", (event) => {
    if (event.target.closest?.(".button, .nav-drop > button, .header-notebook, .nav-panel a, .explore-trigger, .motion-toggle")) {
      window.dispatchEvent(new Event("award:field"));
    }
  }, true);
  entrance();
})();
