/* =========================================================
   ABANICADOS · DATOS DEL CATÁLOGO
   Este es el único archivo que necesitás tocar para
   actualizar stock, precios, fotos, nombres o categorías.
   ========================================================= */

const CONFIG = {
  // WhatsApp en formato internacional, sin "+", sin espacios ni guiones.
  // 54 (Argentina) + 9 (celulares) + 3704548426
  whatsapp: "5493704548426",
  whatsappVisible: "370 454-8426",

  instagram: "abanicados_",
  ubicacion: "El Colorado, Formosa",

  // Solo existen dos precios. Cambialos acá y se actualiza todo el sitio.
  precioStandard: 17000,
  precioPremium: 18000,

  // Tamaño que se muestra en la ficha si el producto no define otro.
  tamano: "Abierto: 45 cm × 24 cm"
};

/*
  CÓMO CARGAR UN PRODUCTO
  -----------------------
  nombre:    nombre que se ve en la página.
  imagen:    ruta de la foto dentro de /images (sin barra inicial).
  coleccion: colección original (Floré, Rave, Argentina, Colores, Dual, Velvet).
  categoria: filtro donde aparece → "estampados" | "colores" | "premium".
  tipo:      "standard" | "dual" | "velvet".
             dual y velvet cobran precioPremium; standard cobra precioStandard.
  stock:     unidades reales en mano. 'Próximo ingreso' siempre usa stock 0.
             más de 1 → DISPONIBLE · 1 → ÚLTIMA UNIDAD · 0 → AGOTADO.
  reservado: unidades en existencia apartadas para clientes; no se ofrecen a la venta.
  proximo:   true cuando el modelo está en camino. No suma al stock disponible.
  tamano:    (opcional) si algún modelo mide distinto, agregalo acá.
*/

const PRODUCTOS = [
  // ---------- ESTAMPADOS ----------
  // Aire es de la cápsula Argentina (única de esa cápsula) → va en Estampados. NO es Premium.
  { nombre: "Aire",      imagen: "images/aire.jpg",      coleccion: "Argentina", categoria: "estampados", tipo: "standard", stock: 0 },

  { nombre: "Camelia",   imagen: "images/camelia.jpg",   coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Orquídea",  imagen: "images/orquidea.jpg",  coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Magnolia",  imagen: "images/magnolia.jpg",  coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 0, proximo: true },
  { nombre: "Marimonia", imagen: "images/marimonia.jpg", coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 0, proximo: true },
  { nombre: "Hibisco",   imagen: "images/hibisco.jpg",   coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 0, proximo: true },
  { nombre: "Azalea",    imagen: "images/azalea.jpg",    coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Azucena",   imagen: "images/azucena.webp",   coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 0, proximo: true },

  { nombre: "Nairobi",   imagen: "images/nairobi.jpg",   coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Tokio",     imagen: "images/tokio.jpg",     coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 0, proximo: true },
  { nombre: "Florencia", imagen: "images/florencia.jpg", coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Moscú",     imagen: "images/moscu.jpg",     coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Turquía",   imagen: "images/turquia.jpg",   coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Amsterdam", imagen: "images/amsterdam.webp", coleccion: "Rave", categoria: "estampados", tipo: "standard", stock: 0, proximo: true },
  { nombre: "Kyoto",     imagen: "images/kyoto.webp",     coleccion: "Rave", categoria: "estampados", tipo: "standard", stock: 0, proximo: true },
  { nombre: "Tromso",    imagen: "images/tromso.webp",    coleccion: "Rave", categoria: "estampados", tipo: "standard", stock: 0, proximo: true },

  // ---------- COLORES (lisos) ----------
  { nombre: "Esmeralda", imagen: "images/esmeralda.jpg", coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 0, proximo: true },
  { nombre: "Rubí",      imagen: "images/rubi.jpg",      coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 0, proximo: true },
  { nombre: "Arena",     imagen: "images/arena.jpg",     coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 0, proximo: true },
  { nombre: "Tinto",     imagen: "images/tinto.jpg",     coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 0, proximo: true },
  { nombre: "Ónix",      imagen: "images/onix.jpg",      coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 0, proximo: true },

  // ---------- PREMIUM ----------
  // Nimbo es el ÚNICO Dual.
  { nombre: "Nimbo",     imagen: "images/nimbo.jpg",     coleccion: "Dual",      categoria: "premium",    tipo: "dual",     stock: 1 },
  { nombre: "Brasa",     imagen: "images/brasa.webp",     coleccion: "Dual", categoria: "premium", tipo: "dual", stock: 0, proximo: true },
  { nombre: "Índigo",    imagen: "images/indigo.webp",    coleccion: "Dual", categoria: "premium", tipo: "dual", stock: 0, proximo: true },
  { nombre: "Onda",      imagen: "images/onda.webp",      coleccion: "Dual", categoria: "premium", tipo: "dual", stock: 0, proximo: true },
  { nombre: "Cobre",     imagen: "images/cobre.webp",     coleccion: "Dual", categoria: "premium", tipo: "dual", stock: 0, proximo: true },
  { nombre: "Oreo",      imagen: "images/oreo.webp",      coleccion: "Dual", categoria: "premium", tipo: "dual", stock: 0, proximo: true },
  { nombre: "Nero",      imagen: "images/nero.webp",      coleccion: "Dual", categoria: "premium", tipo: "dual", stock: 0, proximo: true },

  // Velvet
  { nombre: "Ébano",     imagen: "images/ebano.jpg",     coleccion: "Velvet",    categoria: "premium",    tipo: "velvet",   stock: 5, reservado: 1 },
  { nombre: "Carmesí",   imagen: "images/carmesi.jpg",   coleccion: "Velvet",    categoria: "premium",    tipo: "velvet",   stock: 1 },
  { nombre: "Champagne", imagen: "images/champagne.jpg", coleccion: "Velvet",    categoria: "premium",    tipo: "velvet",   stock: 5 },
  { nombre: "Perla",     imagen: "images/perla.jpg",     coleccion: "Velvet",    categoria: "premium",    tipo: "velvet",   stock: 5 }
];
