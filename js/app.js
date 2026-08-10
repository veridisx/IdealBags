const state = { products: [], category: "Todos", search: "" };
const grid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// CAMBIA ESTE NÚMERO POR EL WHATSAPP REAL DEL CLIENTE.
// Formato internacional sin +, espacios ni guiones. Ejemplo México: 525512345678
const WHATSAPP = "525500000000";

function createWhatsAppLink(product) {
  const text = `Hola Ideal Bags, quiero información sobre: ${product.nombre}. Medida: ${product.medida}. Precio publicado: ${product.precio}. Presentación: ${product.unidad}.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function renderProducts() {
  const filtered = state.products.filter(p => {
    const categoryOK = state.category === "Todos" || p.categoria === state.category;
    const search = state.search.toLowerCase();
    const searchOK = !search || `${p.nombre} ${p.categoria} ${p.medida}`.toLowerCase().includes(search);
    return categoryOK && searchOK;
  });

  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.hidden=false;">
        <div class="placeholder-image" hidden>Imagen de producto<br>${p.nombre}</div>
      </div>
      <div class="product-info">
        <span class="product-category">${p.categoria}</span>
        <h3 class="product-name">${p.nombre}</h3>
        <p class="product-meta">Medida: ${p.medida}</p>
        <p class="product-price">${p.precio}</p>
        <p class="product-meta">${p.unidad}</p>
        <a class="product-button" href="${createWhatsAppLink(p)}" target="_blank" rel="noopener">🟢 Pedir por WhatsApp</a>
      </div>
    </article>
  `).join("");

  emptyState.hidden = filtered.length !== 0;
}

async function loadProducts() {
  try {
    const response = await fetch("data/productos.json");
    if (!response.ok) throw new Error("No se pudo cargar productos.json");
    state.products = await response.json();
    renderProducts();
  } catch (error) {
    console.error(error);
    grid.innerHTML = "<p>No se pudo cargar el catálogo. Abre el proyecto mediante un servidor local (por ejemplo, Live Server).</p>";
  }
}

searchInput.addEventListener("input", e => {
  state.search = e.target.value;
  renderProducts();
});

categoryFilter.addEventListener("change", e => {
  state.category = e.target.value;
  renderProducts();
});

document.querySelectorAll(".category-card").forEach(button => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;
    categoryFilter.value = state.category;
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    renderProducts();
  });
});

menuToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mainNav.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();

loadProducts();
