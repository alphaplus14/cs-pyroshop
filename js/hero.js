/* Hero: oferta de temporada (desde CONFIG.offer) y chispas animadas en canvas. */

(() => {
  function renderOffer() {
    const el = $("#offer");
    const offer = CONFIG.offer;
    if (!el || !offer || !offer.enabled) return;
    $(".offer-badge", el).textContent = offer.badge;
    $(".offer-text", el).textContent = offer.text;
    const link = $(".offer-link", el);
    link.textContent = `${offer.cta} →`;
    link.href = offer.href;
    el.hidden = false;
  }

  /*
   * Chispas ligeras: brasas que suben y pequeñas explosiones ocasionales.
   * Se pausa cuando el hero no está en pantalla o la pestaña está oculta,
   * y respeta "reducir movimiento" del sistema.
   */
  function sparks() {
    const canvas = $("#hero-canvas");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COLORS = ["#f2cf6d", "#d4a531", "#ff9a3c", "#ff7a00", "#fff1c9"];
    const MAX = 220;
    let w = 0;
    let h = 0;
    let particles = [];
    let running = false;
    let visible = true;
    let last = 0;
    let nextBurst = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) drawStatic();
    }

    const rand = (a, b) => a + Math.random() * (b - a);
    const color = () => COLORS[(Math.random() * COLORS.length) | 0];

    function ember() {
      particles.push({
        x: rand(0, w), y: h + 5, vx: rand(-8, 8), vy: rand(-45, -20),
        g: 0, life: rand(4, 8), age: 0, r: rand(0.6, 1.8), c: color(), ember: true,
      });
    }

    function burst() {
      const x = rand(w * 0.1, w * 0.9);
      const y = rand(h * 0.1, h * 0.5);
      const n = w < 600 ? 28 : 44;
      const c = color();
      for (let i = 0; i < n && particles.length < MAX; i++) {
        const angle = (i / n) * Math.PI * 2 + rand(-0.1, 0.1);
        const speed = rand(40, 110);
        particles.push({
          x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          g: 55, life: rand(1.1, 1.9), age: 0, r: rand(0.8, 1.8), c,
        });
      }
    }

    function drawStatic() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 70; i++) {
        ctx.globalAlpha = rand(0.2, 0.7);
        ctx.fillStyle = color();
        ctx.beginPath();
        ctx.arc(rand(0, w), rand(0, h), rand(0.5, 1.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function frame(t) {
      if (!running) return;
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;

      if (t > nextBurst) {
        burst();
        nextBurst = t + rand(1400, 2800);
      }
      if (particles.length < MAX && Math.random() < (w < 600 ? 0.25 : 0.45)) ember();

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      particles = particles.filter((p) => {
        p.age += dt;
        if (p.age > p.life) return false;
        p.vx *= p.ember ? 1 : 0.985;
        p.vy = p.vy * (p.ember ? 1 : 0.985) + p.g * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const alpha = 1 - p.age / p.life;
        ctx.globalAlpha = p.ember ? alpha * 0.7 : alpha;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(frame);
    }

    function update() {
      const shouldRun = visible && !document.hidden && !reduced;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        requestAnimationFrame(frame);
      } else if (!shouldRun) {
        running = false;
      }
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", update);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        update();
      }).observe(canvas);
    }
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderOffer();
    sparks();
  });
})();
