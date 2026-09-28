/*
 * Carrito: se guarda en localStorage, se edita desde el panel lateral (escritorio)
 * o la hoja inferior (móvil) y se envía como pedido por WhatsApp.
 */

const Cart = (() => {
  const KEY = "cs_cart_v1";
  const saved = storage.get(KEY, {});
  const state = {
    items: {},
    customer: { name: "", address: "", payment: "", ...(saved.customer || {}) },
  };

  // Descarta productos que ya no existen en el catálogo.
  Object.entries(saved.items || {}).forEach(([id, qty]) => {
    if (Catalog.findItem(id) && qty > 0) state.items[id] = Math.min(99, qty | 0);
  });

  const listeners = [];
  function changed() {
    storage.set(KEY, state);
    listeners.forEach((fn) => fn());
  }

  function lines() {
    return Object.entries(state.items)
      .map(([id, qty]) => {
        const item = Catalog.findItem(id);
        return item ? { ...item, qty, subtotal: item.price * qty } : null;
      })
      .filter(Boolean);
  }

  const api = {
    add(id, qty = 1) {
      state.items[id] = Math.min(99, (state.items[id] || 0) + qty);
      changed();
      const item = Catalog.findItem(id);
      toast(`${qty} × ${item.name} agregado al pedido`);
    },
    set(id, qty) {
      if (qty <= 0) delete state.items[id];
      else state.items[id] = Math.min(99, qty);
      changed();
    },
    remove(id) {
      delete state.items[id];
      changed();
    },
    clear() {
      state.items = {};
      changed();
    },
    lines,
    count: () => Object.values(state.items).reduce((a, b) => a + b, 0),
    total: () => lines().reduce((sum, l) => sum + l.subtotal, 0),
    onChange: (fn) => listeners.push(fn),
    customer: state.customer,
    saveCustomer: () => storage.set(KEY, state),
  };

  return api;
})();

/* ---------- Interfaz del carrito ---------- */
(() => {
  const drawer = () => $("#cart-drawer");

  function orderMessage() {
    const c = Cart.customer;
    const items = Cart.lines()
      .map((l) => `• ${l.qty} x ${l.name} (${l.unit}) — ${formatPrice(l.subtotal)}`)
      .join("\n");
    return [
      `¡Hola ${CONFIG.brand}! 🎆 Quiero hacer este pedido:`,
      "",
      items,
      "",
      `*Total: ${formatPrice(Cart.total())}*`,
      "",
      "📋 *Mis datos*",
      `Nombre: ${c.name.trim()}`,
      `Barrio / dirección: ${c.address.trim()}`,
      `Método de pago: ${c.payment}`,
      "",
      "¡Gracias!",
    ].join("\n");
  }

  function renderBadge() {
    const count = Cart.count();
    $$(".cart-count").forEach((el) => {
      if (el.dataset.count !== String(count) && count > 0) {
        el.classList.remove("bump");
        void el.offsetWidth; // reinicia la animación
        el.classList.add("bump");
      }
      el.dataset.count = count;
      el.textContent = count;
    });
    const toggle = $(".cart-toggle");
    if (toggle) toggle.setAttribute("aria-label", `Ver pedido, ${count} ${count === 1 ? "producto" : "productos"}`);
  }

  function renderBar() {
    const bar = $("#cart-bar");
    if (!bar) return;
    const count = Cart.count();
    bar.hidden = count === 0;
    document.body.classList.toggle("has-cart-bar", count > 0);
    $(".cart-bar-count", bar).textContent = `${count} ${count === 1 ? "producto" : "productos"}`;
    $(".cart-bar-total", bar).textContent = formatPrice(Cart.total());
  }

  function renderDrawer() {
    const el = drawer();
    if (!el) return;
    const list = $(".cart-lines", el);
    const lines = Cart.lines();
    const empty = lines.length === 0;

    $(".cart-empty", el).hidden = !empty;
    $(".cart-footer", el).hidden = empty;
    $(".cart-fields", el).hidden = empty;
    $(".cart-total-value", el).textContent = formatPrice(Cart.total());

    // Conserva el foco en el mismo control tras volver a pintar la lista.
    const active = document.activeElement;
    const focusKey = list.contains(active) ? `${active.dataset.action}|${active.dataset.id}` : null;

    list.innerHTML = lines
      .map(
        (l) => `
        <li class="cart-line">
          <img src="${escapeHtml(l.image)}" alt="" width="64" height="64" loading="lazy" />
          <div class="cart-line-info">
            <p class="cart-line-name">${escapeHtml(l.name)}</p>
            <p class="cart-line-meta">${escapeHtml(l.unit)} · ${formatPrice(l.price)} c/u</p>
            <div class="cart-line-row">
              <div class="qty qty-sm" role="group" aria-label="Cantidad de ${escapeHtml(l.name)}">
                <button type="button" data-action="dec" data-id="${l.id}" aria-label="Quitar uno" ${l.qty <= 1 ? "disabled" : ""}>−</button>
                <output>${l.qty}</output>
                <button type="button" data-action="inc" data-id="${l.id}" aria-label="Agregar uno" ${l.qty >= 99 ? "disabled" : ""}>+</button>
              </div>
              <strong class="cart-line-subtotal">${formatPrice(l.subtotal)}</strong>
            </div>
          </div>
          <button type="button" class="icon-btn cart-remove" data-action="remove" data-id="${l.id}"
            aria-label="Eliminar ${escapeHtml(l.name)} del pedido">${ICONS.trash}</button>
        </li>`
      )
      .join("");

    if (focusKey) {
      const [action, id] = focusKey.split("|");
      const target =
        $(`[data-action="${action}"][data-id="${id}"]:not(:disabled)`, list) ||
        $(`[data-id="${id}"]:not(:disabled)`, list) ||
        $(".cart-close", el);
      target.focus();
    }
  }

  function renderAll() {
    renderBadge();
    renderBar();
    renderDrawer();
  }

  function openDrawer() {
    renderDrawer();
    Overlay.open(drawer());
  }

  function init() {
    const el = drawer();
    if (!el) return;

    // Métodos de pago desde la configuración.
    const select = $("#cart-payment", el);
    select.innerHTML =
      `<option value="">Elige una opción</option>` +
      CONFIG.paymentMethods.map((m) => `<option>${escapeHtml(m)}</option>`).join("");

    // Datos del cliente: se recuerdan para el próximo pedido.
    const fields = { name: $("#cart-name", el), address: $("#cart-address", el), payment: select };
    Object.entries(fields).forEach(([key, input]) => {
      input.value = Cart.customer[key] || "";
      input.addEventListener("input", () => {
        Cart.customer[key] = input.value;
        Cart.saveCustomer();
      });
    });

    $$(".cart-toggle, #cart-bar").forEach((btn) => btn.addEventListener("click", openDrawer));
    $(".cart-close", el).addEventListener("click", () => Overlay.close(el));
    $$(".cart-keep-shopping", el).forEach((btn) => btn.addEventListener("click", () => Overlay.close(el)));

    $(".cart-lines", el).addEventListener("click", (e) => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const { action, id } = btn.dataset;
      const qty = Cart.lines().find((l) => l.id === id)?.qty || 0;
      if (action === "inc") Cart.set(id, qty + 1);
      if (action === "dec") Cart.set(id, Math.max(1, qty - 1));
      if (action === "remove") Cart.remove(id);
    });

    $(".cart-clear", el).addEventListener("click", () => {
      if (confirm("¿Vaciar todo el pedido?")) Cart.clear();
    });

    $("#cart-form", el).addEventListener("submit", (e) => {
      e.preventDefault();
      if (!Cart.count()) return;
      window.open(whatsappLink(orderMessage()), "_blank", "noopener");
      toast("Abriendo WhatsApp con tu pedido…");
    });

    Cart.onChange(renderAll);
    renderAll();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
