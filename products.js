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
  precioStandard: 16800,
  precioPremium: 17800,

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
  stock:     unidades reales. No se muestra el número, solo:
             más de 1 → DISPONIBLE · 1 → ÚLTIMA UNIDAD · 0 → AGOTADO.
  tamano:    (opcional) si algún modelo mide distinto, agregalo acá.
*/

const PRODUCTOS = [
  // ---------- ESTAMPADOS ----------
  // Aire es de la cápsula Argentina (única de esa cápsula) → va en Estampados. NO es Premium.
  { nombre: "Aire",      imagen: "images/aire.jpg",      coleccion: "Argentina", categoria: "estampados", tipo: "standard", stock: 1 },

  { nombre: "Camelia",   imagen: "images/camelia.jpg",   coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Orquídea",  imagen: "images/orquidea.jpg",  coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 1 },
  { nombre: "Magnolia",  imagen: "images/magnolia.jpg",  coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 1 },
  { nombre: "Marimonia", imagen: "images/marimonia.jpg", coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 1 },
  { nombre: "Hibisco",   imagen: "images/hibisco.jpg",   coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 1 },
  { nombre: "Azalea",    imagen: "images/azalea.jpg",    coleccion: "Floré",     categoria: "estampados", tipo: "standard", stock: 1 },

  { nombre: "Nairobi",   imagen: "images/nairobi.jpg",   coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 7 },
  { nombre: "Tokio",     imagen: "images/tokio.jpg",     coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Florencia", imagen: "images/florencia.jpg", coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 0 },
  { nombre: "Moscú",     imagen: "images/moscu.jpg",     coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 2 },
  { nombre: "Turquía",   imagen: "images/turquia.jpg",   coleccion: "Rave",      categoria: "estampados", tipo: "standard", stock: 1 },

  // ---------- COLORES (lisos) ----------
  { nombre: "Esmeralda", imagen: "images/esmeralda.jpg", coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 1 },
  { nombre: "Rubí",      imagen: "images/rubi.jpg",      coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 0 },
  { nombre: "Arena",     imagen: "images/arena.jpg",     coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 0 },
  { nombre: "Tinto",     imagen: "images/tinto.jpg",     coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 1 },
  { nombre: "Ónix",      imagen: "images/onix.jpg",      coleccion: "Colores",   categoria: "colores",    tipo: "standard", stock: 3 },

  // ---------- PREMIUM ----------
  // Nimbo es el ÚNICO Dual.
  { nombre: "Nimbo",     imagen: "images/nimbo.jpg",     coleccion: "Dual",      categoria: "premium",    tipo: "dual",     stock: 2 },

  // Velvet
  { nombre: "Ébano",     imagen: "images/ebano.jpg",     coleccion: "Velvet",    categoria: "premium",    tipo: "velvet",   stock: 11 },
  { nombre: "Carmesí",   imagen: "images/carmesi.jpg",   coleccion: "Velvet",    categoria: "premium",    tipo: "velvet",   stock: 5 },
  { nombre: "Champagne", imagen: "images/champagne.jpg", coleccion: "Velvet",    categoria: "premium",    tipo: "velvet",   stock: 6 },
  { nombre: "Perla",     imagen: "images/perla.jpg",     coleccion: "Velvet",    categoria: "premium",    tipo: "velvet",   stock: 5 }
];
