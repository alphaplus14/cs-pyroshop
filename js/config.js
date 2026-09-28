/*
 * Textos y datos editables de la tienda.
 * Todo lo marcado con ⚠️ es un placeholder que debes completar.
 */
const CONFIG = {
  brand: "C&S Pyroshop",

  // Número de WhatsApp con indicativo 57, sin "+" ni espacios.
  whatsapp: "573165728348",
  whatsappDisplay: "+57 316 572 8348",

  // ⚠️ Zona de entrega y tiempo (se usan en la franja de confianza y el footer).
  zone: "[TU ZONA DE ENTREGA]",
  deliveryTime: "[TIEMPO DE ENTREGA, p. ej. 24 horas]",

  // Oferta de temporada que aparece en el hero. Pon enabled: false para ocultarla.
  offer: {
    enabled: true,
    badge: "Temporada 2026",
    text: "Pide antes del 20 de diciembre y asegura tu pólvora para Velitas y Año Nuevo.",
    cta: "Ver combos",
    href: "#combos",
  },

  // Franja de confianza debajo del hero. icon: truck | card | clock | shield
  // {zone} y {deliveryTime} se reemplazan por los valores de arriba.
  trust: [
    { icon: "truck", title: "Entrega a domicilio", text: "{zone}" },
    { icon: "card", title: "Paga como quieras", text: "Nequi, Daviplata o efectivo contra entrega" },
    { icon: "clock", title: "Entrega rápida", text: "{deliveryTime}" },
    { icon: "shield", title: "Compra segura", text: "Confirmas tu pedido por WhatsApp" },
  ],

  // Opciones del método de pago en el carrito.
  paymentMethods: ["Nequi", "Daviplata", "Efectivo contra entrega"],

  // ⚠️ Reseñas de ejemplo. Mientras placeholder sea true se muestran con la etiqueta
  // "Ejemplo" para no publicar reseñas falsas. Cámbialas por reales y pon placeholder: false.
  reviews: [
    {
      name: "Laura M.",
      place: "[Barrio]",
      text: "Pedí el combo para Velitas y llegó a tiempo. Los niños felices con las chispitas.",
      rating: 5,
      placeholder: true,
    },
    {
      name: "Andrés R.",
      place: "[Barrio]",
      text: "La torta de 100 tiros fue el show del Año Nuevo. Muy buena atención por WhatsApp.",
      rating: 5,
      placeholder: true,
    },
    {
      name: "Camila P.",
      place: "[Barrio]",
      text: "Precios justos y me explicaron cómo usar todo con seguridad. Repito este año.",
      rating: 5,
      placeholder: true,
    },
  ],

  // ⚠️ Redes sociales. Deja la URL vacía ("") para ocultar una red.
  social: {
    instagram: "https://instagram.com/TU_USUARIO",
    facebook: "https://facebook.com/TU_PAGINA",
    tiktok: "https://tiktok.com/@TU_USUARIO",
  },
};
