/* Catálogo: tarjetas de producto, filtros por categoría, combos y modal de video. */

const Catalog = (() => {
  let currentFilter = "todos";

  function comboRegularPrice(combo) {
    return combo.items.reduce((sum, [id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id);
      return sum + (product ? product.price * qty : 0);
    }, 0);
  }

  function comboItemsText(combo) {
    return combo.items.map(([id, qty]) => {
      const product = PRODUCTS.find((p) => p.id === id);
      return `${qty} × ${product ? product.name : id}`;
    });
  }

  // Busca un producto o combo por id (lo usa también el carrito).
  function findItem(id) {
    const product = PRODUCTS.find((p) => p.id === id);
    if (product) return { ...product, kind: "product" };
    const combo = COMBOS.find((c) => c.id === id);
    if (combo) return { ...combo, unit: "Combo", kind: "combo" };
    return null;
  }

  // Selector de cantidad + botón Agregar; sin carrito, pedido directo por WhatsApp.
  function buildActions(item) {
    const wrap = document.createElement("div");
    wrap.className = "card-actions";

    if (typeof Cart === "undefined") {
      const link = document.createElement("a");
      link.className = "btn btn-fire";
      link.href = whatsappLink(`Hola ${CONFIG.brand}, quiero pedir: ${item.name} (${formatPrice(item.price)})`);
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Pedir por WhatsApp";
      wrap.appendChild(link);
      return wrap;
    }

    let qty = 1;
    wrap.innerHTML = `
      <div class="qty" role="group" aria-label="Cantidad de ${escapeHtml(item.name)}">
        <button type="button" class="qty-minus" aria-label="Quitar uno" disabled>−</button>
        <output aria-live="polite">1</output>
        <button type="button" class="qty-plus" aria-label="Agregar uno">+</button>
      </div>
      <button type="button" class="btn btn-fire add-btn">Agregar</button>`;

    const out = $("output", wrap);
    const minus = $(".qty-minus", wrap);
    const addBtn = $(".add-btn", wrap);
    const render = () => {
      out.textContent = qty;
      minus.disabled = qty <= 1;
    };

    minus.addEventListener("click", () => {
      qty = Math.max(1, qty - 1);
      render();
    });
    $(".qty-plus", wrap).addEventListener("click", () => {
      qty = Math.min(99, qty + 1);
      render();
    });
    addBtn.addEventListener("click", () => {
      Cart.add(item.id, qty);
      addBtn.textContent = "✓ Agregado";
      addBtn.classList.add("added");
      setTimeout(() => {
        addBtn.textContent = "Agregar";
        addBtn.classList.remove("added");
      }, 1300);
      qty = 1;
      render();
    });

    return wrap;
  }

  function imageTag(src, alt, eager) {
    return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" width="600" height="600"
      loading="${eager ? "eager" : "lazy"}" decoding="async" />`;
  }

  function productCard(product, index) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = product.id;

    const tags = (product.tags || [])
      .filter((t) => TAGS[t])
      .map((t) => `<span class="tag tag-${t}">${TAGS[t]}</span>`)
      .join("");
    const hasVideo = Boolean(youtubeId(product.video));

    card.innerHTML = `
      <div class="card-media">
        ${imageTag(product.image, `${product.name} - ${product.unit}`, index < 4)}
        ${tags ? `<div class="card-tags">${tags}</div>` : ""}
        ${
          hasVideo
            ? `<button type="button" class="play-btn" aria-label="Ver video de ${escapeHtml(product.name)}">${ICONS.play}</button>`
            : ""
        }
      </div>
      <div class="card-body">
        <h3 class="card-name">${escapeHtml(product.name)}${
          product.note ? ` <small>${escapeHtml(product.note)}</small>` : ""
        }</h3>
        <p class="card-unit">${escapeHtml(product.unit)}</p>
        <p class="card-price">${formatPrice(product.price)}</p>
      </div>`;

    $(".card-body", card).appendChild(buildActions(product));
    if (hasVideo) $(".play-btn", card).addEventListener("click", () => openVideo(product));
    return card;
  }

  // Tarjeta de combo. variant "feature" = sección destacada; "grid" = dentro del catálogo.
  function comboCard(combo, variant = "feature") {
    const regular = comboRegularPrice(combo);
    const saving = regular - combo.price;
    const card = document.createElement("article");
    card.className = variant === "feature" ? "combo-card" : "card combo-mini";
    card.dataset.id = combo.id;

    const items = comboItemsText(combo)
      .map((t) => `<li>${escapeHtml(t)}</li>`)
      .join("");
    const example = combo.placeholder ? `<span class="tag tag-example">Ejemplo</span>` : "";
    const savingHtml =
      saving > 0
        ? `<s class="combo-regular" aria-label="Precio por separado">${formatPrice(regular)}</s>
           <span class="combo-save">Ahorras ${formatPrice(saving)}</span>`
        : "";

    card.innerHTML = `
      <div class="${variant === "feature" ? "combo-media" : "card-media"}">
        ${imageTag(combo.image, combo.name, false)}
        <div class="card-tags">${example}</div>
      </div>
      <div class="${variant === "feature" ? "combo-body" : "card-body"}">
        <h3 class="${variant === "feature" ? "combo-name" : "card-name"}">${escapeHtml(combo.name)}</h3>
        ${variant === "feature" ? `<p class="combo-desc">${escapeHtml(combo.description || "")}</p>` : ""}
        <ul class="combo-items">${items}</ul>
        <div class="combo-price-row">
          <span class="${variant === "feature" ? "combo-price" : "card-price"}">${formatPrice(combo.price)}</span>
          ${savingHtml}
        </div>
      </div>`;

    $(variant === "feature" ? ".combo-body" : ".card-body", card).appendChild(buildActions(combo));
    return card;
  }

  function renderProducts() {
    const grid = $("#product-grid");
    if (!grid) return;
    grid.replaceChildren();

    if (currentFilter === "combos") {
      COMBOS.forEach((c) => grid.appendChild(comboCard(c, "grid")));
    } else {
      const list =
        currentFilter === "todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === currentFilter);
      list.forEach((p, i) => grid.appendChild(productCard(p, i)));
    }

    if (!grid.children.length) {
      grid.innerHTML = `<p class="empty-state">Pronto tendremos productos en esta categoría.</p>`;
    }
  }

  function renderFilters() {
    const bar = $("#filters");
    if (!bar) return;

    const counts = { todos: PRODUCTS.length, combos: COMBOS.length };
    PRODUCTS.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));

    const chips = [["todos", "Todos"], ...Object.entries(CATEGORIES)].filter(([key]) => counts[key]);
    bar.innerHTML = chips
      .map(
        ([key, label]) => `
        <button type="button" class="chip" data-filter="${key}" aria-pressed="${key === currentFilter}">
          ${escapeHtml(label)} <span class="chip-count">${counts[key]}</span>
        </button>`
      )
      .join("");

    bar.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      currentFilter = chip.dataset.filter;
      $$(".chip", bar).forEach((c) => c.setAttribute("aria-pressed", c === chip));
      chip.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      renderProducts();
    });
  }

  function renderCombos() {
    const grid = $("#combos-grid");
    if (!grid) return;
    grid.replaceChildren(...COMBOS.map((c) => comboCard(c, "feature")));
  }

  // ---------- Modal de video ----------
  function openVideo(product) {
    const modal = $("#video-modal");
    const id = youtubeId(product.video);
    if (!modal || !id) return;

    $("#video-title", modal).textContent = product.name;
    $(".video-frame", modal).innerHTML = `
      <iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1"
        title="Video de ${escapeHtml(product.name)}"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;

    const footer = $(".modal-footer", modal);
    footer.innerHTML = `<span class="card-price">${formatPrice(product.price)}</span>`;
    const actions = buildActions(product);
    actions.classList.add("modal-actions");
    footer.appendChild(actions);

    Overlay.open(modal, {
      initialFocus: ".modal-close",
      // Quitar el iframe detiene el video al cerrar.
      onClose: () => ($(".video-frame", modal).innerHTML = ""),
    });
  }

  function init() {
    renderFilters();
    renderProducts();
    renderCombos();
    const modal = $("#video-modal");
    if (modal) $(".modal-close", modal).addEventListener("click", () => Overlay.close(modal));
  }

  document.addEventListener("DOMContentLoaded", init);

  return { findItem, comboRegularPrice };
})();
