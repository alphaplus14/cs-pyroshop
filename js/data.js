/*
 * Catálogo de productos y combos.
 *
 * Para agregar un producto, copia un objeto de PRODUCTS y cambia sus campos:
 *   id        identificador único, sin espacios (se usa en el carrito)
 *   name      nombre visible
 *   note      (opcional) texto pequeño junto al nombre, p. ej. "Calibre grande"
 *   unit      presentación: "Unidad", "Caja X 6"...
 *   price     precio en pesos, solo números (2500, no "$2.500")
 *   image     ruta de la imagen dentro de assets/
 *   category  una de las claves de CATEGORIES (luces, voladores, bengalas, petardos, tortas)
 *   video     (opcional) link de YouTube o solo su ID; si no hay, deja ""
 *   tags      (opcional) lista de claves de TAGS: ["masVendido", "nuevo", "ninos"]
 */

const CATEGORIES = {
  luces: "Luces",
  voladores: "Voladores",
  bengalas: "Bengalas",
  petardos: "Petardos",
  tortas: "Tortas",
  combos: "Combos",
};

const TAGS = {
  masVendido: "Más vendido",
  nuevo: "Nuevo",
  ninos: "Ideal para niños",
};

const IMG = "assets/fotosPolvora/";

const PRODUCTS = [
  {
    id: "chispitas",
    name: "Chispitas",
    unit: "Caja X 6",
    price: 2500,
    image: IMG + "PYRO-SPARKLER-2025-Photoroom-1000x1000.jpg",
    category: "luces",
    video: "",
    tags: ["ninos"], // EJEMPLO: revisa las etiquetas
  },
  {
    id: "volador5",
    name: "Volador 5 Golpes",
    unit: "Unidad",
    price: 9000,
    image: IMG + "VOLADOR-5G-2025-Photoroom-1000x743.jpg",
    category: "voladores",
    video: "https://www.youtube.com/watch?v=CF5btVhdaVM",
    tags: [],
  },
  {
    id: "bengalas15",
    name: "Bengalas 15 T",
    unit: "Unidad",
    price: 8000,
    image: IMG + "Bengala15T2.jpg",
    category: "bengalas",
    video: "https://www.youtube.com/watch?v=oqNYTUxkSxU",
    tags: [],
  },
  {
    id: "bengalas30",
    name: "Bengalas 30 T",
    unit: "Unidad",
    price: 13000,
    image: IMG + "Bengala30T2.jpg",
    category: "bengalas",
    video: "https://www.youtube.com/watch?v=6_wo0XkOlUM",
    tags: [],
  },
  {
    id: "krazy",
    name: "Fuente Krazy",
    unit: "Unidad",
    price: 8000,
    image: IMG + "MINI-FUENTE-2025-Photoroom-1000x743.jpg",
    category: "luces",
    video: "https://www.youtube.com/watch?v=jJLgM5ReM_M",
    tags: [],
  },
  {
    id: "rosita",
    name: "Rosita",
    unit: "Unidad",
    price: 2500,
    image: IMG + "Rosita.jpeg",
    category: "luces",
    video: "https://www.youtube.com/watch?v=1WggsHwc77A",
    tags: [],
  },
  {
    id: "silver",
    name: "Volcán Silver",
    unit: "Unidad",
    price: 7000,
    image: IMG + "SILVER-2025-Photoroom-1000x743.jpg",
    category: "luces",
    video: "https://www.youtube.com/watch?v=EZ4UUxb5baY",
    tags: [],
  },
  {
    id: "voladores",
    name: "Voladores",
    unit: "Unidad",
    price: 4000,
    image: IMG + "apolo-1000x1333.jpg",
    category: "voladores",
    video: "https://www.youtube.com/watch?v=sOvV8oSzePg",
    tags: [],
  },
  {
    id: "minivolcan",
    name: "Mini Volcán",
    unit: "Unidad",
    price: 2000,
    image: IMG + "Mini-Volcan-scaled-1000x750.jpg",
    category: "luces",
    video: "",
    tags: [],
  },
  {
    id: "superblitz",
    name: "Super Blitz",
    unit: "Unidad",
    price: 8000,
    image: IMG + "SUPER-BLITZ-2025-Photoroom-1000x1000.jpg",
    category: "luces",
    video: "https://www.youtube.com/watch?v=CVUDGf4KmmE",
    tags: [],
  },
  {
    id: "totes",
    name: "Totes",
    unit: "Caja X 20",
    price: 16000,
    image: IMG + "totes.jpg",
    category: "petardos",
    video: "",
    tags: [],
  },
  {
    id: "gatlingG",
    name: "Gatling Grande",
    unit: "Unidad",
    price: 200000,
    image: IMG + "GATLING-WEB-Photoroom-1000x1000.jpg",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=KZ4B215lUBI",
    tags: ["nuevo"], // EJEMPLO: revisa las etiquetas
  },
  {
    id: "gatlingP",
    name: "Gatling pequeña",
    unit: "Unidad",
    price: 90000,
    image: IMG + "GATLING-SMALL-WEB-Photoroom-1000x1000.jpg",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=YvBmWiXr15A",
    tags: [],
  },
  {
    id: "torta16",
    name: "Torta 16 T",
    unit: "Unidad",
    price: 55000,
    image: IMG + "Aquiles-16T-1000x1040.jpg",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=naM3-DJ5oSA",
    tags: [],
  },
  {
    id: "torta25",
    name: "Torta 25 T",
    unit: "Unidad",
    price: 90000,
    image: IMG + "optimizadas/angry.webp",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=8c8Tw8sblWs",
    tags: [],
  },
  {
    id: "torta36",
    name: "Torta 36 T",
    unit: "Unidad",
    price: 135000,
    image: IMG + "optimizadas/panzer.webp",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=UDXweuJJN5E",
    tags: [],
  },
  {
    id: "torta50",
    name: "Torta 50 T",
    unit: "Unidad",
    price: 175000,
    image: IMG + "optimizadas/apocalypto.webp",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=dpNZZ4J6epg",
    tags: [],
  },
  {
    id: "torta64",
    name: "Torta 64 T",
    note: "Calibre grande",
    unit: "Unidad",
    price: 650000,
    image: IMG + "Jurassic-Park-64T-scaled-1000x1081.jpg",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=-IvuM5fVUxQ",
    tags: [],
  },
  {
    id: "torta100",
    name: "Torta 100 T",
    unit: "Unidad",
    price: 420000,
    image: IMG + "COSA-2025-Photoroom-1000x1333.jpg",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=wzlzNwOl7X8",
    tags: ["masVendido"], // EJEMPLO: revisa las etiquetas
  },
  {
    id: "torta200",
    name: "Torta 200 T",
    unit: "Unidad",
    price: 770000,
    image: IMG + "ZOMBI-2025-Photoroom-1000x1333.jpg",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=9UuhOjl7hjo",
    tags: [],
  },
  {
    id: "torta600",
    name: "Torta 600 T",
    unit: "Unidad",
    price: 2300000,
    image: IMG + "torta-rain-forest.png",
    category: "tortas",
    video: "https://www.youtube.com/watch?v=rqAfdvJczdw",
    tags: [],
  },
];

/*
 * Combos. ⚠️ TODOS LOS COMBOS DE ABAJO SON DE EJEMPLO: cambia nombres, productos y precios.
 *   items   lista de [id del producto, cantidad]; el ahorro se calcula solo
 *           comparando "price" con la suma de los productos por separado.
 *   image   imagen de portada (puede ser la de uno de sus productos)
 */
const COMBOS = [
  {
    id: "combo-velitas",
    name: "Combo Noche de Velitas",
    description: "Luces suaves para compartir en familia.",
    items: [
      ["chispitas", 2],
      ["rosita", 2],
      ["minivolcan", 2],
      ["bengalas15", 1],
    ],
    price: 19000, // EJEMPLO
    image: IMG + "PYRO-SPARKLER-2025-Photoroom-1000x1000.jpg",
    placeholder: true,
  },
  {
    id: "combo-familiar",
    name: "Combo Fiesta Familiar",
    description: "Una torta, voladores y volcanes para una noche completa.",
    items: [
      ["torta16", 1],
      ["voladores", 3],
      ["silver", 2],
    ],
    price: 72000, // EJEMPLO
    image: IMG + "Aquiles-16T-1000x1040.jpg",
    placeholder: true,
  },
  {
    id: "combo-anio-nuevo",
    name: "Combo Año Nuevo",
    description: "Para recibir el año con todo el cielo encendido.",
    items: [
      ["torta36", 1],
      ["bengalas30", 2],
      ["volador5", 2],
    ],
    price: 159000, // EJEMPLO
    image: IMG + "optimizadas/panzer.webp",
    placeholder: true,
  },
];
