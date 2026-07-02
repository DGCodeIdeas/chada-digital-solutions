/* ========================================
   NOIR — Main JavaScript
   Built by Chada Digital
   ======================================== */

(function() {
  'use strict';

  /* ---------- Product Data ---------- */
  const products = [
    { id: 1, name: 'The Iconic Trench Coat', price: 485, originalPrice: 620, category: 'outerwear', tag: 'sale', sizes: ['XS', 'S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=530&fit=crop&q=80' },
    { id: 2, name: 'Silk Evening Blouse', price: 295, category: 'evening', tag: 'new', sizes: ['XS', 'S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=530&fit=crop&q=80' },
    { id: 3, name: 'Wool Overcoat — Camel', price: 675, category: 'outerwear', sizes: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=530&fit=crop&q=80' },
    { id: 4, name: 'Pleated Midi Skirt', price: 245, category: 'essentials', sizes: ['XS', 'S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0ed7d?w=400&h=530&fit=crop&q=80' },
    { id: 5, name: 'Tailored Blazer — Midnight', price: 520, category: 'evening', tag: 'new', sizes: ['XS', 'S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=530&fit=crop&q=80' },
    { id: 6, name: 'Cashmere Turtleneck', price: 380, category: 'essentials', sizes: ['XS', 'S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=530&fit=crop&q=80' },
    { id: 7, name: 'Leather Crossbody Bag', price: 420, category: 'accessories', tag: 'new', sizes: ['One Size'], image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=530&fit=crop&q=80' },
    { id: 8, name: 'Velvet Evening Dress', price: 890, originalPrice: 1100, category: 'evening', tag: 'sale', sizes: ['XS', 'S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=530&fit=crop&q=80' },
    { id: 9, name: 'Wide-Leg Trousers', price: 275, category: 'essentials', sizes: ['XS', 'S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=530&fit=crop&q=80' },
    { id: 10, name: 'Statement Earrings', price: 165, category: 'accessories', sizes: ['One Size'], image: 'https://images.unsplash.com/photo-1635767798638-3e2523c0188b?w=400&h=530&fit=crop&q=80' },
    { id: 11, name: 'Quilted Leather Jacket', price: 750, category: 'outerwear', tag: 'new', sizes: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=530&fit=crop&q=80' },
    { id: 12, name: 'Satin Slip Dress', price: 340, category: 'evening', sizes: ['XS', 'S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=530&fit=crop&q=80' }
  ];

  /* ---------- Cart State ---------- */
  const Cart = {
    get() {
      try { return JSON.parse(localStorage.getItem('noir_cart')) || []; }
      catch { return []; }
    },
    save(items) {
      localStorage.setItem('noir_cart', JSON.stringify(items));
      Cart.updateBadge();
    },
    add(product, size, qty) {
      const items = Cart.get();
      const existing = items.find(i => i.id === product.id && i.size === size);
      if (existing) { existing.qty += qty; }
      else { items.push({ id: product.id, name: product.name, price: product.price, size, qty, image: product.image }); }
      Cart.save(items);
      showToast(`${product.name} added to cart`, 'success');
    },
    remove(id, size) {
      let items = Cart.get();
      items = items.filter(i => !(i.id === id && i.size === size));
      Cart.save(items);
      Cart.renderPage();
    },
    updateQty(id, size, qty) {
      const items = Cart.get();
      const item = items.find(i => i.id === id && i.size === size);
      if (item) {
        if (qty <= 0) { Cart.remove(id, size); return; }
        item.qty = qty;
        Cart.save(items);
        Cart.renderPage();
      }
    },
    count() {
      return Cart.get().reduce((sum, i) => sum + i.qty, 0);
    },
    total() {
      return Cart.get().reduce((sum, i) => sum + (i.price * i.qty), 0);
    },
    updateBadge() {
      const badge = document.getElementById('cart-badge');
      if (badge) { badge.textContent = Cart.count(); badge.style.display = Cart.count() > 0 ? 'flex' : 'none'; }
    },
    renderPage() {
      const tbody = document.getElementById('cart-body');
      if (!tbody) return;
      const items = Cart.get();
      if (items.length === 0) {
        tbody.innerHTML = `
          <tr><td colspan="5">
            <div class="cart-empty">
              <div class="cart-empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div>
              <h3>Your cart is empty</h3>
              <p>Explore our collection and find something extraordinary.</p>
              <a href="./shop/" class="btn btn-primary">Continue Shopping</a>
            </div>
          </td></tr>`;
        document.querySelector('.cart-summary').style.display = 'none';
        return;
      }
      document.querySelector('.cart-summary').style.display = 'block';
      tbody.innerHTML = items.map(item => `
        <tr>
          <td data-label="Product">
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
              <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Size: ${item.size}</p>
              </div>
            </div>
          </td>
          <td data-label="Price">$${item.price}</td>
          <td data-label="Quantity">
            <div class="quantity-selector">
              <button class="qty-btn" onclick="Cart.updateQty(${item.id}, '${item.size}', ${item.qty - 1})">−</button>
              <input class="qty-input" type="number" value="${item.qty}" readonly />
              <button class="qty-btn" onclick="Cart.updateQty(${item.id}, '${item.size}', ${item.qty + 1})">+</button>
            </div>
          </td>
          <td data-label="Total">$${item.price * item.qty}</td>
          <td><button class="cart-item-remove" onclick="Cart.remove(${item.id}, '${item.size}')">Remove</button></td>
        </tr>
      `).join('');
      Cart.updateSummary();
    },
    updateSummary() {
      const subtotal = document.getElementById('summary-subtotal');
      const total = document.getElementById('summary-total');
      const t = Cart.total();
      if (subtotal) subtotal.textContent = '$' + t;
      if (total) total.textContent = '$' + (t + 15);
    }
  };

  window.Cart = Cart;

  /* ---------- Product Rendering ---------- */
  function renderProductCard(product) {
    const badge = product.tag ? `<span class="product-badge ${product.tag === 'sale' ? 'badge-sale' : 'badge-new'}">${product.tag}</span>` : '';
    const priceOriginal = product.originalPrice ? `<span class="price-original">$${product.originalPrice}</span>` : '';
    return `
      <div class="product-card" data-id="${product.id}" data-category="${product.category}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          ${badge}
          <div class="product-actions">
            <button class="btn btn-primary" onclick="quickAdd(${product.id})">Add to Cart</button>
            <a href="./product/?id=${product.id}" class="btn btn-ghost">View</a>
          </div>
        </div>
        <a href="./product/?id=${product.id}" class="product-name">${product.name}</a>
        <div class="product-price">
          <span class="price-current">$${product.price}</span>
          ${priceOriginal}
        </div>
      </div>
    `;
  }

  window.quickAdd = function(id) {
    const product = products.find(p => p.id === id);
    if (product) Cart.add(product, product.sizes[1] || product.sizes[0], 1);
  };

  /* ---------- Featured Products on Home ---------- */
  const featuredGrid = document.getElementById('featured-products');
  if (featuredGrid) {
    featuredGrid.innerHTML = products.slice(0, 8).map(renderProductCard).join('');
  }

  /* ---------- Shop Page ---------- */
  const shopGrid = document.getElementById('shop-products');
  if (shopGrid) {
    shopGrid.innerHTML = products.map(renderProductCard).join('');

    // Filter checkboxes
    document.querySelectorAll('.filter-option input').forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = [...document.querySelectorAll('.filter-option input:checked')].map(c => c.value);
        const cards = shopGrid.querySelectorAll('.product-card');
        let visible = 0;
        cards.forEach(card => {
          const cat = card.dataset.category;
          const show = checked.length === 0 || checked.includes(cat);
          card.style.display = show ? 'block' : 'none';
          if (show) visible++;
        });
        const count = document.getElementById('shop-count');
        if (count) count.textContent = `Showing ${visible} products`;
      });
    });

    // Sort
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const val = sortSelect.value;
        let sorted = [...products];
        if (val === 'price-asc') sorted.sort((a, b) => a.price - b.price);
        else if (val === 'price-desc') sorted.sort((a, b) => b.price - a.price);
        else if (val === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
        shopGrid.innerHTML = sorted.map(renderProductCard).join('');
      });
    }
  }

  /* ---------- Product Detail Page ---------- */
  const productDetail = document.getElementById('product-detail');
  if (productDetail) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id')) || 1;
    const product = products.find(p => p.id === id) || products[0];

    document.getElementById('pd-name').textContent = product.name;
    document.getElementById('pd-price').textContent = '$' + product.price;
    document.getElementById('pd-image').src = product.image;
    document.getElementById('pd-image').alt = product.name;
    document.getElementById('pd-thumb').src = product.image;
    document.getElementById('pd-category').textContent = product.category;

    const sizeContainer = document.getElementById('pd-sizes');
    sizeContainer.innerHTML = product.sizes.map((s, i) =>
      `<button class="size-option ${i === 1 ? 'active' : ''}" data-size="${s}" onclick="selectSize(this)">${s}</button>`
    ).join('');

    window.selectSize = function(btn) {
      sizeContainer.querySelectorAll('.size-option').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };

    document.getElementById('pd-add').addEventListener('click', () => {
      const active = sizeContainer.querySelector('.size-option.active');
      const size = active ? active.dataset.size : product.sizes[0];
      const qty = parseInt(document.getElementById('pd-qty').value) || 1;
      Cart.add(product, size, qty);
    });

    document.getElementById('qty-minus').addEventListener('click', () => {
      const inp = document.getElementById('pd-qty');
      if (inp.value > 1) inp.value--;
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
      const inp = document.getElementById('pd-qty');
      inp.value++;
    });
  }

  /* ---------- Cart Page ---------- */
  Cart.updateBadge();
  Cart.renderPage();

  /* ---------- Checkout Page ---------- */
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    const items = Cart.get();
    const subtotal = items.reduce((s, i) => s + (i.price * i.qty), 0);
    document.getElementById('checkout-subtotal').textContent = '$' + subtotal;
    document.getElementById('checkout-total').textContent = '$' + (subtotal + 15);

    document.querySelectorAll('.payment-method').forEach(pm => {
      pm.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach(p => p.classList.remove('selected'));
        pm.classList.add('selected');
        pm.querySelector('input').checked = true;
      });
    });

    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = checkoutForm.querySelector('button[type="submit"]');
      btn.textContent = 'Processing...';
      btn.disabled = true;
      setTimeout(() => {
        localStorage.removeItem('noir_cart');
        Cart.updateBadge();
        showToast('Order placed successfully! Thank you for shopping with NOIR.', 'success');
        setTimeout(() => { window.location.href = '../'; }, 2000);
      }, 2000);
    });
  }

  /* ---------- Navigation ---------- */
  const navHeader = document.getElementById('nav-header');
  if (navHeader) {
    window.addEventListener('scroll', () => {
      navHeader.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navMenu.style.display = navMenu.classList.contains('active') ? 'flex' : '';
    });
  }

  /* ---------- Newsletter ---------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input.value) {
        showToast('Welcome to the Inner Circle.', 'success');
        input.value = '';
      }
    });
  }

  /* ---------- Toast ---------- */
  window.showToast = function(message) {
    let t = document.querySelector('.toast');
    if (t) t.remove();
    t = document.createElement('div');
    t.className = 'toast';
    t.textContent = message;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
  };

  /* ---------- Scroll Animations ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.collection-card, .product-card, .section-header').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  console.log('NOIR loaded — Built by Chada Digital');
})();
