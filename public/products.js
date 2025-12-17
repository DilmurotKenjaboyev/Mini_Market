// Vanilla JS: fetch products and render them into #products
const API = 'https://fakestoreapi.com/products';

function createCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';

  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" />
    <h3>${escapeHtml(product.title)}</h3>
    <div class="price">$${product.price.toFixed(2)}</div>
    <button class="add-btn">Add to cart</button>
  `;

  const btn = card.querySelector('.add-btn');
  btn.addEventListener('click', () => {
    // dispatch a custom event so React cart can pick it up
    const event = new CustomEvent('add-to-cart', { detail: product });
    window.dispatchEvent(event);
    btn.textContent = 'Added';
    setTimeout(() => (btn.textContent = 'Add to cart'), 800);
  });

  return card;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"
  }[c]));
}

async function loadProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '<div class="loading">Loading...</div>';
  try {
    const res = await fetch(API);
    const products = await res.json();
    container.innerHTML = '';
    products.forEach(p => container.appendChild(createCard(p)));
  } catch (e) {
    container.innerHTML = '<div class="error">Failed to load products</div>';
    console.error(e);
  }
}

document.addEventListener('DOMContentLoaded', loadProducts);
