(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const whatsapp = CONFIG.whatsapp;

  const FRASES = {
    todos: "Una colección pensada para brillar en cada ocasión.",
    estampados: "Estampados para destacar en cualquier celebración.",
    colores: "Colores lisos que combinan con todo tu look.",
    premium: "Modelos premium para una noche especial."
  };

  const escapar = (valor = "") => String(valor).replace(/[&<>'"]/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  }[c]));

  const precioDe = (p) => (p.tipo === "dual" || p.tipo === "velvet") ? CONFIG.precioPremium : CONFIG.precioStandard;
  const formatearPrecio = (n) => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

  function disponiblesDe(p) {
    return Math.max(0, (Number(p.stock) || 0) - (Number(p.reservado) || 0));
  }
  function disponibilidad(p) {
    if (p.proximo) return { texto: "Próximo ingreso", clase: "soon", agotado: false, proximo: true };
    const libres = disponiblesDe(p);
    if (libres <= 0) return { texto: "Agotado", clase: "out", agotado: true };
    if (libres === 1) return { texto: "Última unidad", clase: "last", agotado: false };
    return { texto: p.reservado ? libres + " disponibles" : "Disponible", clase: "ok", agotado: false };
  }

  function tipoVisible(p) {
    if (p.tipo === "dual") return "Dual · Premium";
    if (p.tipo === "velvet") return "Velvet · Premium";
    return p.coleccion || "Standard";
  }

  function caracteristica(p) {
    if (p.tipo === "dual") return "Doble sublimado";
    if (p.tipo === "velvet") return "Acabado de terciopelo";
    return "";
  }

  function materialDe(p) {
    if (p.tipo === "velvet") return "Varillas de MDF de 3 mm + acabado de terciopelo";
    return "Varillas de MDF de 3 mm + tejido 100% poliéster";
  }

  function linkWhatsApp(p) {
    const texto = p.proximo
      ? `Hola 👋 Vi el modelo ${p.nombre} en PRÓXIMO INGRESO de Abanicados y quiero consultar o reservar uno.`
      : `Hola 👋 Vi el catálogo de Abanicados y quiero consultar por el abanico ${p.nombre}.`;
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(texto)}`;
  }

  PRODUCTOS.forEach((p, i) => { p._id = i; });

  const grid = $("#grid");
  const phrase = $("#filter-phrase");
  let filtroActual = "todos";

  function tarjetaHTML(p) {
    const d = disponibilidad(p);
    const extra = caracteristica(p);
    return `
      <article class="card${d.agotado ? " is-out" : ""}${d.proximo ? " is-soon" : ""}">
        <button type="button" class="card-photo" data-detalle="${p._id}" aria-label="Ver ${escapar(p.nombre)}">
          <img src="${escapar(p.imagen)}" alt="Abanico ${escapar(p.nombre)}" loading="lazy" decoding="async" onerror="this.style.display='none'">
          <span class="photo-glow" aria-hidden="true"></span>
          ${d.proximo ? '<span class="soon-ribbon">PRÓXIMO INGRESO</span>' : ""}
        </button>
        <button type="button" class="card-body" data-detalle="${p._id}" aria-label="Ver detalles de ${escapar(p.nombre)}">
          <p class="card-collection">${escapar(tipoVisible(p))}</p>
          <h3 class="card-name">${escapar(p.nombre)}</h3>
          ${extra ? `<p class="card-feature">${escapar(extra)}</p>` : ""}
          <div class="card-row">
            <p class="card-price">${formatearPrecio(precioDe(p))}</p>
            <span class="status status-${d.clase}">${d.texto}</span>
          </div>
        </button>
      </article>`;
  }

  function render() {
    const lista = (filtroActual === "todos" ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === filtroActual))
      .slice()
      .sort((a, b) => {
        const rango = (p) => p.proximo ? 1 : (disponiblesDe(p) > 0 ? 0 : 2);
        return rango(a) - rango(b);
      });
    grid.innerHTML = lista.map(tarjetaHTML).join("");
    phrase.textContent = FRASES[filtroActual];
    activarReveladoTarjetas();
  }

  $$(".filters button").forEach((btn) => {
    btn.addEventListener("click", () => {
      filtroActual = btn.dataset.filter;
      $$(".filters button").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      render();
    });
  });

  const modal = $("#product-modal");
  const modalContent = $("#modal-content");

  async function compartirProducto(p) {
    const texto = `Mirá este abanico ${p.nombre} de Abanicados 🪭 ${formatearPrecio(precioDe(p))}`;
    const url = location.href.split("#")[0] + `#modelo=${encodeURIComponent(p.nombre)}`;
    if (navigator.share) {
      try { await navigator.share({ title: `Abanicados · ${p.nombre}`, text: texto, url }); } catch (_) {}
    } else {
      try {
        await navigator.clipboard.writeText(`${texto} ${url}`);
        alert("Enlace copiado para compartir.");
      } catch (_) {
        prompt("Copiá este enlace para compartir:", `${texto} ${url}`);
      }
    }
  }

  function abrirDetalle(id) {
    const p = PRODUCTOS[id];
    if (!p) return;
    const d = disponibilidad(p);
    const extra = caracteristica(p);

    modalContent.innerHTML = `
      <img class="detail-photo" src="${escapar(p.imagen)}" alt="Abanico ${escapar(p.nombre)}">
      <div class="detail">
        <p class="detail-kicker">${escapar(tipoVisible(p))}</p>
        <h2 id="modal-title" class="detail-name">${escapar(p.nombre)}</h2>
        ${extra ? `<p class="detail-feature">${escapar(extra)}</p>` : ""}
        <p class="detail-price">${formatearPrecio(precioDe(p))}</p>
        ${p.proximo ? '<p class="detail-preorder">Este modelo está en camino. Consultá por la fecha de llegada o pedí una reserva por WhatsApp.</p>' : ""}
        <dl class="detail-list">
          <div><dt>Disponibilidad</dt><dd>${escapar(d.texto)}</dd></div>
          <div><dt>Incluye</dt><dd>Abanico + funda</dd></div>
          <div><dt>Material</dt><dd>${escapar(materialDe(p))}</dd></div>
          <div><dt>Tamaño</dt><dd>${escapar(p.tamano || CONFIG.tamano)}</dd></div>
          <div><dt>Pago</dt><dd>Transferencia o efectivo</dd></div>
          <div><dt>Entrega</dt><dd>Coordinamos por WhatsApp</dd></div>
        </dl>
        ${p.reservado ? `<p class="detail-reserved">Unidades reservadas: ${p.reservado}. Disponibles para comprar: ${disponiblesDe(p)}.</p>` : ""}
        <div class="detail-actions">
          ${d.agotado
            ? `<span class="action-primary disabled">AGOTADO</span>`
            : `<a class="action-primary" href="${linkWhatsApp(p)}" target="_blank" rel="noopener">${d.proximo ? "CONSULTAR / RESERVAR 🪭" : "LO QUIERO 🪭"}</a>`}
          <button type="button" class="action-secondary" data-share>COMPARTIR ESTE MODELO</button>
        </div>
      </div>`;

    modalContent.querySelector("[data-share]").addEventListener("click", () => compartirProducto(p));
    document.documentElement.classList.add("no-scroll");
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  }

  function cerrarDetalle() {
    if (typeof modal.close === "function" && modal.open) modal.close();
    else modal.removeAttribute("open");
  }

  grid.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-detalle]");
    if (trigger) abrirDetalle(Number(trigger.dataset.detalle));
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest("[data-close]")) cerrarDetalle();
  });
  modal.addEventListener("close", () => document.documentElement.classList.remove("no-scroll"));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.open) cerrarDetalle(); });

  function runIntro() {
    const intro = $("#intro");
    const introFan = $("#intro-fan");
    const headerFan = $("#header-fan");
    if (!intro || !introFan || !headerFan) return;

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      headerFan.classList.remove("is-hidden");
      intro.classList.add("is-done");
      return;
    }

    setTimeout(() => {
      const from = introFan.getBoundingClientRect();
      const to = headerFan.getBoundingClientRect();
      const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      const scale = Math.max(.2, Math.min(1, to.width / from.width));

      const animation = introFan.animate([
        { transform: "translate(0,0) scale(1)", offset: 0 },
        { transform: "translate(0,-6px) scale(1.02)", offset: .18 },
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, offset: 1 }
      ], { duration: 780, easing: "cubic-bezier(.2,.75,.22,1)", fill: "forwards" });

      animation.onfinish = () => {
        headerFan.classList.remove("is-hidden");
        intro.classList.add("is-done");
      };
    }, 1900);
  }

  function activarReveladoTarjetas() {
    $(".card").forEach((card, i) => {
      card.style.setProperty("--delay", Math.min(i * 45, 280) + "ms");
      requestAnimationFrame(() => card.classList.add("is-visible"));
    });
  }
  function activarReveal() {
    const items = $(".reveal");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: .1});
    items.forEach(el => observer.observe(el));
  }
  render();
  activarReveal();
  runIntro();

  const hash = decodeURIComponent(location.hash || "");
  if (hash.startsWith("#modelo=")) {
    const nombre = hash.replace("#modelo=", "");
    const p = PRODUCTOS.find((x) => x.nombre.toLowerCase() === nombre.toLowerCase());
    if (p) setTimeout(() => abrirDetalle(p._id), 2800);
  }
})();
