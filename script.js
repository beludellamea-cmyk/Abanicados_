/* ABANICADOS · Catálogo interactivo. La portada nunca bloquea el acceso. */
(() => {
  "use strict";
  const $ = (selector, base = document) => base.querySelector(selector);
  const $$ = (selector, base = document) => Array.from(base.querySelectorAll(selector));
  const grid = $("#grid");
  const modal = $("#product-modal");
  const modalContent = $("#modal-content");
  const filterPhrase = $("#filter-phrase");
  const catalogCount = $("#catalog-count");
  let filtro = "todos";

  const frases = {
    todos: "Un abanico para cada mood.",
    estampados: "Diseños que no pasan desapercibidos.",
    colores: "Una paleta para cada look.",
    premium: "El toque especial que transforma todo."
  };

  const limpiar = (value = "") => String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
  const catalogo = (typeof PRODUCTOS !== "undefined" && Array.isArray(PRODUCTOS)) ? PRODUCTOS : [];
  const config = (typeof CONFIG !== "undefined") ? CONFIG : {};
  const whatsapp = config.whatsapp || "5493704548426";
  const enPesos = (n) => new Intl.NumberFormat("es-AR", {style: "currency", currency: "ARS", maximumFractionDigits: 0}).format(n);
  const precio = (p) => (p.tipo === "velvet" || p.tipo === "dual") ? config.precioPremium : config.precioStandard;
  const libres = (p) => Math.max(0, (Number(p.stock) || 0) - (Number(p.reservado) || 0));

  function disponibilidad(p) {
    if (p.proximo) return { texto: "Próximo ingreso", clase: "soon", agotado: false };
    const n = libres(p);
    if (n === 0) return { texto: "Agotado", clase: "out", agotado: true };
    if (n === 1) return { texto: "Última unidad", clase: "last", agotado: false };
    return { texto: p.reservado ? `${n} disponibles` : "Disponible", clase: "ok", agotado: false };
  }
  function coleccionDe(p) {
    if (p.tipo === "dual") return "Dual · Premium";
    if (p.tipo === "velvet") return "Velvet · Premium";
    return p.coleccion || "Abanicados";
  }
  function caracteristica(p) {
    if (p.tipo === "dual") return "Doble sublimado";
    if (p.tipo === "velvet") return "Acabado de terciopelo";
    return "";
  }
  function material(p) {
    return p.tipo === "velvet" ? "Varillas de MDF de 3 mm y acabado de terciopelo" : "Varillas de MDF de 3 mm y tejido 100% poliéster";
  }
  function linkWhatsApp(p) {
    const texto = p.proximo
      ? `Hola, vi el modelo ${p.nombre} de Abanicados como próximo ingreso. ¿Se puede reservar?`
      : `Hola, quiero consultar por el abanico ${p.nombre} de Abanicados.`;
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(texto)}`;
  }

  catalogo.forEach((p, index) => { p._id = index; });

  function tarjeta(p) {
    const d = disponibilidad(p);
    const caracter = caracteristica(p);
    return `<article class="card${d.agotado ? " is-out" : ""}${p.proximo ? " is-soon" : ""}">
      <button class="card-photo" type="button" data-detalle="${p._id}" aria-label="Ver detalles del abanico ${limpiar(p.nombre)}">
        <img src="${limpiar(p.imagen)}" alt="Abanico ${limpiar(p.nombre)}" loading="lazy" decoding="async">
        <span class="card-photo-label">${p.proximo ? "PRÓXIMO INGRESO" : limpiar(coleccionDe(p))}</span>
      </button>
      <button class="card-body" type="button" data-detalle="${p._id}" aria-label="Más información sobre ${limpiar(p.nombre)}">
        <p class="card-collection">${limpiar(p.coleccion || "Abanicados")}</p>
        <h3 class="card-name">${limpiar(p.nombre)}</h3>
        ${caracter ? `<p class="card-feature">${limpiar(caracter)}</p>` : ""}
        <div class="card-row"><p class="card-price">${enPesos(precio(p))}</p><span class="status status-${d.clase}">${d.texto}</span></div>
      </button>
    </article>`;
  }

  function render() {
    if (!grid) return;
    if (!catalogo.length) {
      grid.innerHTML = '<p class="catalog-loading">No se pudo cargar el catálogo. Actualizá la página para volver a intentarlo.</p>';
      return;
    }
    const lista = catalogo.filter(p => filtro === "todos" || p.categoria === filtro).slice().sort((a,b) => {
      const orden = p => p.proximo ? 1 : libres(p) > 0 ? 0 : 2;
      return orden(a) - orden(b);
    });
    grid.innerHTML = lista.map(tarjeta).join("");
    if (filterPhrase) filterPhrase.textContent = frases[filtro] || frases.todos;
    if (catalogCount) catalogCount.textContent = `${lista.length} ${lista.length === 1 ? "modelo" : "modelos"}`;
  }

  $$(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      filtro = btn.dataset.filter;
      $$(".filters button").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
      render();
    });
  });

  function abrirDetalle(id) {
    const p = catalogo[id];
    if (!p || !modal || !modalContent) return;
    const d = disponibilidad(p);
    const caracter = caracteristica(p);
    modalContent.innerHTML = `<img class="detail-photo" src="${limpiar(p.imagen)}" alt="Abanico ${limpiar(p.nombre)}">
      <div class="detail">
        <p class="detail-kicker">${limpiar(coleccionDe(p))}</p>
        <h2 id="modal-title" class="detail-name">${limpiar(p.nombre)}</h2>
        ${caracter ? `<p class="detail-feature">${limpiar(caracter)}</p>` : ""}
        <p class="detail-price">${enPesos(precio(p))}</p>
        <dl class="detail-list">
          <div><dt>Disponibilidad</dt><dd>${limpiar(d.texto)}</dd></div>
          <div><dt>Incluye</dt><dd>Abanico + funda</dd></div>
          <div><dt>Material</dt><dd>${limpiar(material(p))}</dd></div>
          <div><dt>Tamaño</dt><dd>${limpiar(p.tamano || config.tamano || "Abierto: 45 cm × 24 cm")}</dd></div>
          <div><dt>Pago</dt><dd>Transferencia o efectivo</dd></div>
          <div><dt>Entrega</dt><dd>A coordinar por WhatsApp</dd></div>
        </dl>
        ${p.proximo ? '<p class="detail-preorder">Este modelo está en camino. Consultá su llegada o posibilidad de reserva.</p>' : ""}
        ${p.reservado ? `<p class="detail-reserved">Unidades reservadas: ${Number(p.reservado)}. Disponibles para comprar: ${libres(p)}.</p>` : ""}
        <div class="detail-actions">
          ${d.agotado ? '<span class="action-primary disabled">AGOTADO</span>' : `<a href="${linkWhatsApp(p)}" target="_blank" rel="noopener noreferrer" class="action-primary">${p.proximo ? "CONSULTAR / RESERVAR" : "LO QUIERO"} ↗</a>`}
          <button type="button" class="action-secondary" data-share>COMPARTIR MODELO</button>
        </div>
      </div>`;
    const share = $("[data-share]", modalContent);
    if (share) share.addEventListener("click", () => compartir(p));
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    document.body.classList.add("modal-open");
  }

  function cerrarDetalle() {
    if (!modal) return;
    if (modal.open && typeof modal.close === "function") modal.close();
    else modal.removeAttribute("open");
    document.body.classList.remove("modal-open");
  }

  async function compartir(p) {
    const text = `Mirá el abanico ${p.nombre} de Abanicados: ${enPesos(precio(p))}`;
    const url = location.href.split("#")[0] + `#modelo=${encodeURIComponent(p.nombre)}`;
    if (navigator.share) {
      try { await navigator.share({ title: `Abanicados · ${p.nombre}`, text, url }); } catch (_) {}
      return;
    }
    try { await navigator.clipboard.writeText(`${text} ${url}`); alert("Enlace copiado."); }
    catch (_) { window.prompt("Copiá este enlace:", url); }
  }

  if (grid) grid.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-detalle]");
    if (trigger) abrirDetalle(Number(trigger.dataset.detalle));
  });
  if (modal) {
    modal.addEventListener("click", event => {
      if (event.target === modal || event.target.closest("[data-close]")) cerrarDetalle();
    });
    modal.addEventListener("close", () => document.body.classList.remove("modal-open"));
  }
  render();

  // Enlaces directos a modelos, sin depender de la animación de portada.
  try {
    const hash = decodeURIComponent(location.hash || "");
    if (hash.startsWith("#modelo=")) {
      const nombre = hash.slice(8);
      const p = catalogo.find(x => x.nombre.toLowerCase() === nombre.toLowerCase());
      if (p) abrirDetalle(p._id);
    }
  } catch (_) { /* Un enlace mal formado no debe interrumpir el catálogo. */ }
})();
