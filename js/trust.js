/* Confianza y cumplimiento: franja de confianza, reseñas, redes, WhatsApp y verificación de edad. */

(() => {
  const AGE_KEY = "cs_age_ok";

  const fill = (text) => text.replace("{zone}", CONFIG.zone);

  function renderTrust() {
    const list = $("#trust-list");
    if (!list) return;
    list.innerHTML = CONFIG.trust
      .map(
        (t) => `
        <li class="trust-item">
          <span class="trust-icon">${ICONS[t.icon] || ICONS.shield}</span>
          <span><strong>${escapeHtml(t.title)}</strong><span>${escapeHtml(fill(t.text))}</span></span>
        </li>`
      )
      .join("");
  }

  function renderReviews() {
    const grid = $("#reviews-grid");
    if (!grid) return;
    grid.innerHTML = CONFIG.reviews
      .map(
        (r) => `
        <figure class="review">
          ${r.placeholder ? '<span class="tag tag-example">Reseña de ejemplo</span>' : ""}
          <div class="stars" aria-label="${r.rating} de 5 estrellas">${ICONS.star.repeat(r.rating)}</div>
          <blockquote>“${escapeHtml(r.text)}”</blockquote>
          <figcaption><strong>${escapeHtml(r.name)}</strong>${r.place ? ` · ${escapeHtml(r.place)}` : ""}</figcaption>
        </figure>`
      )
      .join("");
  }

  function renderSocial() {
    const box = $("#social-links");
    if (!box) return;
    const names = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };
    box.innerHTML = Object.entries(CONFIG.social)
      .filter(([, url]) => url)
      .map(
        ([key, url]) =>
          `<a href="${escapeHtml(url)}" target="_blank" rel="noopener" aria-label="${names[key] || key}">${ICONS[key] || ""}</a>`
      )
      .join("");
  }

  // Todos los enlaces con data-wa usan el número de CONFIG (un solo lugar para cambiarlo).
  function wireWhatsapp() {
    $$("[data-wa]").forEach((a) => {
      a.href = whatsappLink(a.dataset.wa || `¡Hola ${CONFIG.brand}! Quiero consultar sobre sus productos.`);
    });
    $$("[data-wa-display]").forEach((el) => (el.textContent = CONFIG.whatsappDisplay));
    $$("[data-zone]").forEach((el) => (el.textContent = CONFIG.zone));
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  function ageGate() {
    const modal = $("#age-modal");
    if (!modal || storage.get(AGE_KEY) === true) return;

    Overlay.open(modal, { dismissable: false, initialFocus: ".age-yes" });
    $(".age-yes", modal).addEventListener("click", () => {
      storage.set(AGE_KEY, true);
      Overlay.close(modal);
    });
    $(".age-no", modal).addEventListener("click", () => {
      $(".age-actions", modal).hidden = true;
      const msg = $(".age-denied", modal);
      msg.hidden = false;
      msg.focus();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderTrust();
    renderReviews();
    renderSocial();
    wireWhatsapp();
    ageGate();
  });
})();
