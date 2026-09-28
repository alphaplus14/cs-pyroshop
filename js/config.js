/*
 * Textos y datos editables de la tienda.
 * Todo lo marcado con ⚠️ es un placeholder que debes completar.
 */
const CONFIG = {
  brand: "C&S Pyroshop",

  // Número de WhatsApp con indicativo 57, sin "+" ni espacios.
  whatsapp: "573165728348",
  whatsappDisplay: "+57 316 572 8348",

  // Zona de entrega (se usa en la franja de confianza y el footer).
  zone: "Cartago (Valle del Cauca)",

  // Oferta de temporada que aparece en el hero. Pon enabled: false para ocultarla.
  offer: {
    enabled: true,
    badge: "Temporada 2026",
    text: "Pide antes del 20 de diciembre y asegura tu pólvora para Velitas y Año Nuevo.",
    cta: "Ver combos",
    href: "#combos",
  },

  // Franja de confianza debajo del hero. icon: truck | card | clock | shield
  // {zone} se reemplaza por el valor de arriba.
  trust: [
    { icon: "truck", title: "Entrega a domicilio", text: "{zone}" },
    { icon: "card", title: "Paga como quieras", text: "Nequi, Nu, Bancolombia o efectivo" },
    { icon: "shield", title: "Compra segura", text: "Confirmas tu pedido por WhatsApp" },
  ],

  // Opciones del método de pago en el carrito.
  paymentMethods: ["Nequi", "Nu", "Bancolombia", "Efectivo"],

  // ⚠️ Reseñas de ejemplo. Mientras placeholder sea true se muestran con la etiqueta
  // "Ejemplo" para no publicar reseñas falsas. Cámbialas por reales y pon placeholder: false.
  // Opcional: agrega place: "Barrio" para mostrarlo junto al nombre.
  reviews: [
    {
      name: "Laura M.",
      text: "Pedí el combo para Velitas y llegó a tiempo. Los niños felices con las chispitas.",
      rating: 5,
      placeholder: true,
    },
    {
      name: "Andrés R.",
      text: "La torta de 100 tiros fue el show del Año Nuevo. Muy buena atención por WhatsApp.",
      rating: 5,
      placeholder: true,
    },
    {
      name: "Camila P.",
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
