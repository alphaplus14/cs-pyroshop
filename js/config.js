/*
 * Textos y datos editables de la tienda.
 * Todo lo marcado con ⚠️ es un placeholder que debes completar.
 */
const CONFIG = {
  brand: "C&S Pyroshop",

  // Número de WhatsApp con indicativo 57, sin "+" ni espacios.
  whatsapp: "573133557883",
  whatsappDisplay: "+57 313 355 7883",

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
    { icon: "card", title: "Paga como quieras", text: "Nequi, Nu, Bancolombia, efectivo o contra entrega" },
    { icon: "shield", title: "Compra segura", text: "Confirmas tu pedido por WhatsApp" },
  ],

  // Opciones del método de pago en el carrito.
  paymentMethods: ["Nequi", "Nu", "Bancolombia", "Efectivo", "Pago contra entrega"],

  // Reseñas de clientes reales. La sección "Lo que dicen de nosotros" solo aparece
  // cuando hay al menos una. place (barrio) es opcional.
  reviews: [
    {
      name: "Juan M.",
      text: "Excelente atención y muy buena presentación de los productos. El proceso de compra fue rápido y todo llegó en perfecto estado.",
      rating: 5,
    },
    {
      name: "Laura P.",
      text: "Muy buena experiencia. Me explicaron las opciones disponibles y fueron muy atentos durante todo el proceso. Volvería a comprar.",
      rating: 5,
    },
    {
      name: "Andrés R.",
      text: "Me gustó mucho la atención y la variedad. Todo fue claro desde el principio y recibí exactamente lo que había solicitado.",
      rating: 5,
    },
  ],
};
