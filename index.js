
    // Data
    const CATEGORIES = [
        { id: 'fabrics', name: 'Fabrics', image: 'img7.jpeg' },
        { id: 'ready', name: 'Ready to Wear', image: 'img6.jpeg' },
        { id: 'sewing', name: 'Senator Material', image: 'img16.jpeg' },
        { id: 'sewig', name: 'Two Piece', image: 'img15.jpeg' }
      ];
      const SIZES = ['XS','S','M','L','XL','2XL'];
      const PRODUCTS = [
        { id: 'fab-001', name: 'Small Grade Ankara', category: 'fabrics', price: 6000, sizes: [], rating: 4.8, image: 'img7.jpeg', description: 'Small Ankara.6 YARD.' },
        { id: 'fab-002', name: 'Medium Grade Ankarar', category: 'fabrics', price: 8000, sizes: [], rating: 4.6, image: 'img13.jpeg', description: 'Classic retro-style shirt with unique patterns and timeless charm.' },
        { id: 'fab-003', name: 'Material', category: 'fabrics', price: 7000, sizes: [], rating: 4.7, image: 'img12.jpeg', description: 'Premium, smooth-textured fabric with a rich, elegant finish.' },
  
        { id: 'rdy-101', name: 'Two Piece', category: 'ready', price: 30000, sizes: ['S','M','L','XL'], rating: 4.5, image: 'img10.jpeg', video: 'vid1.mp4', description: 'Elegant shift dress for effortless day-to-night styling.' },
        { id: 'rdy-102', name: 'Vintage Shirt', category: 'ready', price: 12500, sizes: ['S','M','L','XL'], rating: 4.7, image: 'img3.jpeg', description: 'Breathable linen two-piece with a relaxed yet refined silhouette.' },
        { id: 'rdy-103', name: 'Vintage Shirt', category: 'ready', price: 12500, sizes: ['M','L','XL'], rating: 4.9, image: 'img2.jpeg', video: 'bg.mp4', description: 'Statement satin gown with fluid drape and flattering lines.' },
        { id: 'rdy-104', name: 'Ready to Wear', category: 'ready', price: 12500, sizes: ['S','M','L','XL','2XL'], rating: 4.4, image: 'img8.jpeg', description: 'Timeless oxford shirt with crisp finish and tailored fit.' },
        { id: 'rdy-105', name: 'Vintage Shirt', category: 'ready', price: 21000, sizes: ['S','M','L'], rating: 4.2, image: 'img9.jpeg', description: 'Premium, smooth-textured fabric with a rich, elegant finish.' },
  
        { id: 'srv-201', name: 'Cubana Fabrics', category: 'sewing', price: 70000, sizes: ['Custom'], rating: 5.0, image: 'img17.jpeg', video: 'vid5.mp4', description: 'Made-to-measure suit with canvas construction and premium fabric options.' },
        { id: 'srv-202', name: 'Cubana Fabrics', category: 'sewing', price: 70000, sizes: ['Custom'], rating: 4.8, image: 'img16.jpeg', description: 'Custom-fit dress tailored to your silhouette and style.' }
      ];
      const TESTIMONIALS = [
        { quote: 'The fit was impeccable. I felt like royalty!', author: 'Aisha O.' },
        { quote: 'Best fabric quality I have bought locally. Fast delivery too.', author: 'Kunle A.' },
        { quote: 'Their custom tailoring nailed my measurements perfectly.', author: 'Daniel S.' },
        { quote: 'Teefah Clothiers = Quality, Style, Confidence.', author: 'Abdulsalam T.' }
      ];
  
      // Utils
      const qs = (sel, el=document) => el.querySelector(sel);
      const qsa = (sel, el=document) => Array.from(el.querySelectorAll(sel));
      const money = n => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(n);
      const toast = (msg) => {
        const el = qs('#toast');
        el.textContent = msg;
        el.style.display = 'block';
        setTimeout(() => { el.style.display = 'none'; }, 2200);
      };
      const setYear = () => { qs('#year').textContent = String(new Date().getFullYear()); };
  
      // Cart
      const CART_KEY = 'velora_cart_v1';
      const getCart = () => {
        try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; }
      };
      const saveCart = (cart) => { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); };
      const findCartIndex = (cart, productId, size) => cart.findIndex(i => i.productId === productId && i.size === size);
      const addToCart = (productId, size='One Size', quantity=1) => {
        const cart = getCart();
        const idx = findCartIndex(cart, productId, size);
        if (idx >= 0) cart[idx].quantity += quantity; else cart.push({ productId, size, quantity });
        saveCart(cart); toast('Added to cart');
      };
      const updateCartQty = (productId, size, delta) => {
        const cart = getCart();
        const idx = findCartIndex(cart, productId, size);
        if (idx >= 0) {
          cart[idx].quantity += delta;
          if (cart[idx].quantity <= 0) cart.splice(idx, 1);
          saveCart(cart);
        }
      };
      const removeCartItem = (productId, size) => { const cart = getCart().filter(i => !(i.productId === productId && i.size === size)); saveCart(cart); };
      const cartTotals = () => {
        const cart = getCart();
        let subtotal = 0;
        for (const item of cart) {
          const product = PRODUCTS.find(p => p.id === item.productId);
          if (product) subtotal += product.price * item.quantity;
        }
        return { subtotal };
      };
      const updateCartBadge = () => { qs('#cart-count').textContent = String(getCart().reduce((a,b)=>a+b.quantity,0)); };
  
      // Router
      function parseHash() {
        const raw = location.hash.replace(/^#/, '') || 'home';
        const [path, queryString] = raw.split('?');
        const params = Object.fromEntries(new URLSearchParams(queryString || ''));
        return { path, params };
      }
      function navigateTo(pathWithQuery) { location.hash = pathWithQuery; }
  
      // Render helpers
      function renderStars(rating) {
        const full = Math.round(rating);
        return '★'.repeat(full) + '☆'.repeat(5-full);
      }
  
      function renderHome() {
        return `
          <section class="hero reveal">
            <div class="hero-inner">
              <div class="hero-content">
                <div class="hero-kicker">TEEFAH CLOTHIERS</div>
                <h1 class="hero-title">Luxury Fabrics. Bespoke Tailoring. Effortless Ready-to-Wear.</h1>
                <p class="hero-subtitle">Discover curated textiles and contemporary pieces crafted with precision. From custom fits to everyday elegance, dress your story with TEEFAH CLOTHIERS.</p>
                <div class="hero-cta">
                  <a class="btn btn-primary" href="#shop">Shop Now</a>
                  <a class="btn btn-ghost" href="#services">Custom Sewing</a>
                </div>
              </div>
                           <div class="hero-media">
                 <video class="hero-video" autoplay muted loop playsinline>
                   <source src="bg.mp4" type="video/mp4">
                 </video>
                 <div class="hero-video-overlay"></div>
               </div>
            </div>
          </section>
          <section class="section reveal">
            <h3 class="section-title">Shop by Category</h3>
            <p class="section-subtitle">Find premium fabrics, statement outfits, or book our custom tailoring.</p>
            <div class="card-grid">
              ${CATEGORIES.map(c => `
                <article class="card">
                  <img src="${c.image}" alt="${c.name}">
                  <div class="card-body">
                    <div class="card-kicker">Explore</div>
                    <div class="card-title">${c.name}</div>
                    <div style="margin-top:10px"><a class="btn" href="#shop?category=${c.id}">Shop ${c.name}</a></div>
                  </div>
                </article>
              `).join('')}
            </div>
          </section>
          <section class="section reveal">
            <h3 class="section-title">Featured Products</h3>
            <p class="section-subtitle">Handpicked favorites, updated weekly.</p>
            <div class="product-grid">
              ${PRODUCTS.slice(0,8).map(p => productCard(p)).join('')}
            </div>
          </section>
          <section class="section reveal">
            <h3 class="section-title">What Clients Say</h3>
            <div class="testimonials">
              ${TESTIMONIALS.map(t => `
                <blockquote class="testimonial">
                  <p>“${t.quote}”</p>
                  <div class="author">— ${t.author}</div>
                </blockquote>
              `).join('')}
            </div>
          </section>
              </form>
            </div>
          </section>
        `;
      }
  
           function productCard(p) {
         return `
           <article class="product">
             <a class="product-media" href="#product/${p.id}" aria-label="View ${p.name}">
               ${p.video ? `
                 <div class="video-container">
                   <video class="product-video" muted loop playsinline>
                     <source src="${p.video}" type="video/mp4">
                   </video>
                   <div class="play-button" onclick="toggleVideo(this)"></div>
                 </div>
               ` : `<img src="${p.image}" alt="${p.name}">`}
             </a>
            <div class="product-body">
              <div class="product-name">${p.name}</div>
              <div class="product-meta">
                <span>${renderStars(p.rating)}</span>
                <span class="price">${money(p.price)}</span>
              </div>
              <div style="margin-top:10px; display:flex; gap:8px;">
                <a class="btn" href="#product/${p.id}">Details</a>
                <button class="btn btn-primary" data-add="${p.id}">Add to Cart</button>
              </div>
            </div>
          </article>
        `;
      }
  
      function renderShop(params) {
        const selectedCategory = params.category || 'all';
        const q = (params.q || '').toLowerCase();
        const sort = params.sort || 'featured';
        const size = params.size || 'any';
        const maxPrice = Number(params.maxPrice || 9999999);
  
        let items = PRODUCTS.slice();
        if (selectedCategory !== 'all') items = items.filter(p => p.category === selectedCategory);
        if (q) items = items.filter(p => p.name.toLowerCase().includes(q));
        if (size !== 'any') items = items.filter(p => p.sizes.length === 0 || p.sizes.includes(size));
        items = items.filter(p => p.price <= maxPrice);
        if (sort === 'price-asc') items.sort((a,b)=>a.price-b.price);
        if (sort === 'price-desc') items.sort((a,b)=>b.price-a.price);
        if (sort === 'rating') items.sort((a,b)=>b.rating-a.rating);
  
        return `
          <section class="section">
            <h3 class="section-title">Shop</h3>
            <div class="section-subtitle">Browse fabrics, ready-to-wear, and custom services.</div>
            <div class="filters">
              <select class="select" id="f-category">
                <option value="all" ${selectedCategory==='all'?'selected':''}>All</option>
                ${CATEGORIES.map(c=>`<option value="${c.id}" ${selectedCategory===c.id?'selected':''}>${c.name}</option>`).join('')}
              </select>
              <input class="input" style="max-width:240px" id="f-search" placeholder="Search products" value="${q}">
              <select class="select" id="f-size">
                <option value="any" ${size==='any'?'selected':''}>Any size</option>
                ${SIZES.map(s=>`<option value="${s}" ${size===s?'selected':''}>${s}</option>`).join('')}
              </select>
              <label>Max price <input type="range" min="10000" max="200000" step="1000" id="f-price" class="range" value="${isFinite(maxPrice)?maxPrice:200000}"></label>
              <span id="f-price-val">${money(isFinite(maxPrice)?maxPrice:200000)}</span>
              <select class="select" id="f-sort">
                <option value="featured" ${sort==='featured'?'selected':''}>Featured</option>
                <option value="price-asc" ${sort==='price-asc'?'selected':''}>Price: Low to High</option>
                <option value="price-desc" ${sort==='price-desc'?'selected':''}>Price: High to Low</option>
                <option value="rating" ${sort==='rating'?'selected':''}>Top Rated</option>
              </select>
            </div>
            <div class="product-grid">
              ${items.map(p=>productCard(p)).join('')}
            </div>
          </section>
        `;
      }
  
           function renderProduct(id) {
         const p = PRODUCTS.find(x=>x.id===id);
         if (!p) return `<section class="section"><p>Product not found.</p></section>`;
         const sizes = p.sizes.length ? p.sizes : ['One Size'];
         return `
           <section class="section product-page">
             <div class="product-zoom">
               ${p.video ? `
                 <video class="hero-video" autoplay muted loop playsinline>
                   <source src="${p.video}" type="video/mp4">
                 </video>
               ` : `<img src="${p.image}" alt="${p.name}">`}
             </div>
            <div>
              <h2 class="section-title" style="margin-top:0">${p.name}</h2>
              <div class="product-meta"><span>${renderStars(p.rating)}</span><span class="price">${money(p.price)}</span></div>
              <p class="section-subtitle">${p.description || ''}</p>
              <div>
                <div class="card-kicker">Select size</div>
                <div class="size-list" id="size-list">${sizes.map(s=>`<div class="size-chip" data-size="${s}">${s}</div>`).join('')}</div>
              </div>
              <div style="display:flex; gap:10px; margin-top:10px;">
                <button class="btn btn-primary" id="add-to-cart" data-id="${p.id}">Add to Cart</button>
                <a class="btn" href="#shop">Continue Shopping</a>
              </div>
              <div style="margin-top:24px">
                <div class="card-kicker">Related products</div>
                <div class="product-grid">${PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4).map(x=>productCard(x)).join('')}</div>
              </div>
            </div>
          </section>
        `;
      }
  
      function renderAbout() {
        return `
          <section class="section">
            <h3 class="section-title">About Us</h3>
            <p class="section-subtitle">Our story is stitched with passion for craft and an eye for timeless style.</p>
            <div class="card-grid">
              <article class="card"><img src="img1.jpeg" alt="Studio"><div class="card-body"><div class="card-title">Our Studio</div><div class="card-kicker">Where ideas become garments.</div></div></article>
              <article class="card"><img src="tm.jpg" alt="Tailor"><div class="card-body"><div class="card-title">Team</div><div class="card-kicker">Tailors and designers with years of experience.</div></div></article>
              <article class="card"><img src="img14.jpeg" alt="Fabric"><div class="card-body"><div class="card-title">Materials</div><div class="card-kicker">Only high quality textiles make the cut.</div></div></article>
            </div>
          </section>
        `;
      }
  
      function renderServices() {
        return `
          <section class="section">
            <h3 class="section-title">Custom Sewing & Tailoring</h3>
            <p class="section-subtitle">Made-to-measure services for suits, dresses, and traditional attire.</p>
            <div class="grid-2">
              <div class="card">
                <div class="card-body">
                  <div class="card-title">Senator Material</div>
                  <div class="card-kicker">From ${money(6500)}</div>
                  <p>Premium, smooth textured fabric with a rich, elegant finish perfect for classic Senator wear that speaks class and authority.</p>
                  <a class="btn btn-primary" href="#contact?subject=Bespoke%20Suit%20Booking">Book Consultation</a>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="card-title">Vintage Shirt</div>
                  <div class="card-kicker">From ${money(10000)}</div>
                  <p>Classic retro-style shirt with unique patterns and timeless charm effortless style that never fades.</p>
                  <a class="btn btn-primary" href="#contact?subject=Custom%20Dress%20Booking">Book Consultation</a>
                </div>
              </div>
            </div>
          </section>
        `;
      }
  
      
      function renderContact(params) {
    const subject = params.subject ? decodeURIComponent(params.subject) : '';
    return `
      <section class="section">
        <h3 class="section-title">Contact Us</h3>
        <p class="section-subtitle">Reach us directly on WhatsApp for orders, fittings, or collaborations.</p>
        <div class="grid-2">
          <div>
            <div class="card" style="padding:16px">
              <h4>WhatsApp</h4>
              <p>Chat with us now:</p>
             <a href="https://wa.me/08186816121" target="_blank" rel="noreferrer" class="whatsapp-btn">
    <!-- SVG ICON HERE -->
    WhatsApp Us
  </a>
               
                  <circle cx="16" cy="16" r="16" fill="#25D366"/>
                  <path d="M22.4 18.2c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.2-.8.9-.9 1-.2.2-.3.2-.6.1-.3-.2-1.1-.4-2-1.2-.7-.6-1.3-1.4-1.5-1.7-.2-.3 0-.5.1-.6.2-.2.3-.3.4-.4.1-.2.1-.3.2-.5 0-.2 0-.4 0-.5 0-.2-.7-1.8-1-2.4-.3-.7-.6-.6-.7-.6-.2 0-.4 0-.5.1-.2.1-.6.6-.6 1.4 0 .8.6 1.6.7 1.7.1.2 1.2 2.2 3.1 3.1 1.9.8 2.2.6 2.6.6.4 0 .9-.3 1-.6.1-.3.2-.6.1-.8z" fill="#fff"/>
              </a>
              <p style="margin-top:8px">WhatsApp: <strong>+2348186816121</strong></p>
            </div>
          </div>
        </div>
      </section>
    `;
  }
  
      function renderCart() {
        const cart = getCart();
        if (cart.length === 0) return `<section class="section"><p>Your cart is empty.</p><a href="#shop" class="btn">Go to Shop</a></section>`;
        const rows = cart.map(item => {
          const p = PRODUCTS.find(x=>x.id===item.productId);
          if (!p) return '';
          return `
            <tr>
              <td style="display:flex; align-items:center; gap:10px">
                <img src="${p.image}" alt="${p.name}" style="width:60px; height:60px; object-fit:cover; border-radius:8px">
                <div>
                  <div>${p.name}</div>
                  <div class="card-kicker">${item.size}</div>
                </div>
              </td>
              <td>${money(p.price)}</td>
              <td>
                <button class="btn" data-qty="-1" data-id="${p.id}" data-size="${item.size}">−</button>
                <span style="margin:0 8px">${item.quantity}</span>
                <button class="btn" data-qty="1" data-id="${p.id}" data-size="${item.size}">+</button>
              </td>
              <td>${money(p.price * item.quantity)}</td>
              <td><button class="btn" data-remove="${p.id}" data-size="${item.size}">Remove</button></td>
            </tr>
          `;
        }).join('');
        const { subtotal } = cartTotals();
        return `
          <section class="section">
            <h3 class="section-title">Your Cart</h3>
            <table class="table">
              <thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
            <div style="display:flex; justify-content:flex-end; margin-top:16px; gap:14px; align-items:center">
              <div><strong>Subtotal:</strong> ${money(subtotal)}</div>
              <a class="btn" href="#shop">Continue Shopping</a>
              <a class="btn btn-primary" href="#checkout">Proceed to Checkout</a>
            </div>
          </section>
        `;
      }
  
      function renderCheckout() {
    // Replace with your real bank/account info
    const bankName = 'Monie point';
    const accountNumber = '8053534083';
    const accountHolder = 'Adeyemo Lateefah';
  
    // Cart/order summary
    const cart = getCart();
    let orderItems = '';
    let subtotal = 0;
    cart.forEach(item => {
      const p = PRODUCTS.find(x=>x.id===item.productId);
      if (p) {
        const total = p.price * item.quantity;
        subtotal += total;
        orderItems += `
          <tr>
            <td>${p.name} (${item.size})</td>
            <td>${item.quantity}</td>
            <td>${money(p.price)}</td>
            <td>${money(total)}</td>
          </tr>
        `;
      }
    });
  
    return `
      <section class="section">
        <h3 class="section-title">Checkout</h3>
        <div class="checkout-bank-card">
          <h4>Bank Transfer Details</h4>
          <p><strong>Bank Name:</strong> ${bankName}</p>
          <p><strong>Account Number:</strong> ${accountNumber}</p>
          <p><strong>Account Name:</strong> ${accountHolder}</p>
          <hr style="border-color: rgba(255,255,255,0.12)">
          <h4 style="margin-top:24px;">Order Summary</h4>
          <table class="table" style="margin-bottom:18px;">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderItems || `<tr><td colspan="4">No items in cart.</td></tr>`}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="text-align:right;"><strong>Subtotal:</strong></td>
                <td><strong>${money(subtotal)}</strong></td>
              </tr>
            </tfoot>
          </table>
          <p>After making payment, kindly share your transfer receipt and delivery location with us on WhatsApp for order processing:</p>
          <a href="https://wa.me/08186816121?text=Hi%2C%20I%20just%20paid%20for%20my%20order.%20Here%20is%20my%20receipt%20and%20delivery%20location%3A" 
             target="_blank" rel="noreferrer" class="whatsapp-btn">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" style="display:block;">
              <circle cx="16" cy="16" r="16" fill="#25D366"/>
              <path d="M22.4 18.2c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.2-.8.9-.9 1-.2.2-.3.2-.6.1-.3-.2-1.1-.4-2-1.2-.7-.6-1.3-1.4-1.5-1.7-.2-.3 0-.5.1-.6.2-.2.3-.3.4-.4.1-.2.1-.3.2-.5 0-.2 0-.4 0-.5 0-.2-.7-1.8-1-2.4-.3-.7-.6-.6-.7-.6-.2 0-.4 0-.5.1-.2.1-.6.6-.6 1.4 0 .8.6 1.6.7 1.7.1.2 1.2 2.2 3.1 3.1 1.9.8 2.2.6 2.6.6.4 0 .9-.3 1-.6.1-.3.2-.6.1-.8z" fill="#fff"/>
            </svg>
            Share Receipt & Location on WhatsApp
          </a>
        </div>
      </section>
    `;
  }
  
      function renderBlog() {
        return `
          <section class="section">
            <h3 class="section-title">Fashion Tips & Guides</h3>
            <div class="section-subtitle">Style advice, fabric care, and trend insights.</div>
            <div class="card-grid">
              <article class="card"><div class="card-body"><div class="card-title">Choosing Fabrics for the Tropics</div><div class="card-kicker">Breathability, weave, and care</div></div></article>
              <article class="card"><div class="card-body"><div class="card-title">How to Build a Capsule Wardrobe</div><div class="card-kicker">Timeless essentials</div></div></article>
              <article class="card"><div class="card-body"><div class="card-title">Tailoring Terms Explained</div><div class="card-kicker">From canvas to hem</div></div></article>
            </div>
          </section>
        `;
      }
  
      // Mount and events
      function mount(html) { qs('#app').innerHTML = html; requestAnimationFrame(reveal); bindDynamicEvents(); }
      function reveal() { qsa('.reveal').forEach((el,i)=> setTimeout(()=> el.classList.add('is-visible'), 60*i)); }
  
      function bindDynamicEvents() {
        // Newsletter
        const nf = qs('#newsletter-form');
        if (nf) nf.addEventListener('submit', (e)=>{ e.preventDefault(); toast('Subscribed!'); nf.reset(); });
  
               // Product grid add buttons
         qsa('[data-add]').forEach(btn=>btn.addEventListener('click', ()=>{
           const id = btn.getAttribute('data-add');
           const p = PRODUCTS.find(x=>x.id===id);
           const size = (p && p.sizes && p.sizes[0]) || 'One Size';
           addToCart(id, size, 1);
         }));
  
         // Video hover effects
         qsa('.video-container').forEach(container => {
           const video = container.querySelector('video');
           const playButton = container.querySelector('.play-button');
           
           container.addEventListener('mouseenter', () => {
             if (video && !video.paused) {
               playButton.style.display = 'flex';
             }
           });
           
           container.addEventListener('mouseleave', () => {
             if (video && !video.paused) {
               playButton.style.display = 'none';
             }
           });
         });
  
        // Product page size and add
        const sizeList = qs('#size-list');
        if (sizeList) {
          sizeList.addEventListener('click', (e)=>{
            const item = e.target.closest('.size-chip');
            if (!item) return;
            qsa('.size-chip', sizeList).forEach(x=>x.classList.remove('active'));
            item.classList.add('active');
          });
        }
        const addBtn = qs('#add-to-cart');
        if (addBtn) addBtn.addEventListener('click', ()=>{
          const id = addBtn.getAttribute('data-id');
          let size = 'One Size';
          const active = qs('.size-chip.active');
          if (active) size = active.getAttribute('data-size');
          addToCart(id, size, 1);
        });
  
        // Shop filters
        const fcat = qs('#f-category'), fsearch = qs('#f-search'), fsize = qs('#f-size'), fprice = qs('#f-price'), fsort = qs('#f-sort');
        const applyFilters = ()=>{
          const params = new URLSearchParams();
          if (fcat && fcat.value !== 'all') params.set('category', fcat.value);
          if (fsearch && fsearch.value) params.set('q', fsearch.value);
          if (fsize && fsize.value !== 'any') params.set('size', fsize.value);
          if (fprice) params.set('maxPrice', fprice.value);
          if (fsort && fsort.value !== 'featured') params.set('sort', fsort.value);
          navigateTo('shop' + (params.toString() ? '?' + params.toString() : ''));
        };
        if (fcat) fcat.addEventListener('change', applyFilters);
        if (fsearch) fsearch.addEventListener('input', ()=>{ clearTimeout(fsearch._t); fsearch._t = setTimeout(applyFilters, 250); });
        if (fsize) fsize.addEventListener('change', applyFilters);
        if (fprice) {
          const pval = qs('#f-price-val');
          fprice.addEventListener('input', ()=>{ if (pval) pval.textContent = money(Number(fprice.value)); });
          fprice.addEventListener('change', applyFilters);
        }
        if (fsort) fsort.addEventListener('change', applyFilters);
  
        // Cart actions
        qsa('[data-qty]')
          .forEach(btn => btn.addEventListener('click', ()=>{
            const id = btn.getAttribute('data-id');
            const size = btn.getAttribute('data-size');
            const delta = Number(btn.getAttribute('data-qty'));
            updateCartQty(id, size, delta);
            route();
          }));
        qsa('[data-remove]')
          .forEach(btn => btn.addEventListener('click', ()=>{ removeCartItem(btn.getAttribute('data-remove'), btn.getAttribute('data-size')); route(); }));
  
        // Contact form
        const cf = qs('#contact-form');
        if (cf) cf.addEventListener('submit', (e)=>{ e.preventDefault(); toast('Message sent! We will reply shortly.'); cf.reset(); });
  
        // Checkout form
        const shipRegion = qs('#ship-region');
        const orderTotal = qs('#order-total');
        const shipFee = qs('#ship-fee');
        const updateTotals = ()=>{
          if (!shipRegion || !orderTotal || !shipFee) return;
          const fees = { lagos:3000, abuja:4500, others:5500 };
          const fee = fees[shipRegion.value] || 3000;
          const { subtotal } = cartTotals();
          shipFee.textContent = money(fee);
          orderTotal.textContent = money(subtotal + fee);
        };
        if (shipRegion) shipRegion.addEventListener('change', updateTotals);
        updateTotals();
  
        const chk = qs('#checkout-form');
        if (chk) chk.addEventListener('submit', (e)=>{
          e.preventDefault();
          const gateway = qs('#payment-gateway').value;
          const { subtotal } = cartTotals();
          const fees = { lagos:3000, abuja:4500, others:5500 };
          const fee = fees[(qs('#ship-region')||{value:'lagos'}).value] || 3000;
          const amount = subtotal + fee;
          if (gateway === 'paystack') simulatePaystack(amount);
          if (gateway === 'flutterwave') simulateFlutterwave(amount);
          if (gateway === 'stripe') simulateStripe(amount);
          if (gateway === 'paypal') simulatePayPal(amount);
        });
      }
  
           // Video controls
       function toggleVideo(playButton) {
         const video = playButton.previousElementSibling;
         if (video.paused) {
           video.play();
           playButton.style.display = 'none';
         } else {
           video.pause();
           playButton.style.display = 'flex';
         } 
       }
  
       // Payment stubs
       function simulatePaystack(amount) { toast('Paystack (demo): Charging ' + money(amount)); afterPaymentSuccess(); }
      function simulateFlutterwave(amount) { toast('Flutterwave (demo): Charging ' + money(amount)); afterPaymentSuccess(); }
      function simulateStripe(amount) { toast('Stripe (demo): Charging ' + money(amount)); afterPaymentSuccess(); }
      function simulatePayPal(amount) { toast('PayPal (demo): Charging ' + money(amount)); afterPaymentSuccess(); }
      function afterPaymentSuccess() {
        localStorage.removeItem(CART_KEY);
        updateCartBadge();
        toast('Payment successful! Order received.');
        setTimeout(()=> navigateTo('home'), 1200);
      }
  
      // Controller
      function route() {
        const { path, params } = parseHash();
        let html = '';
        if (path.startsWith('product/')) html = renderProduct(path.split('/')[1]);
        else if (path === 'home') html = renderHome();
        else if (path === 'shop') html = renderShop(params);
        else if (path === 'services') html = renderServices();
        else if (path === 'about') html = renderAbout();
        else if (path === 'contact') html = renderContact(params);
        else if (path === 'cart') html = renderCart();
        else if (path === 'checkout') html = renderCheckout();
        else if (path === 'blog') html = renderBlog();
        else html = renderHome();
        mount(html);
      }
  
      // Init
      window.addEventListener('hashchange', route);
      qs('#cart-btn').addEventListener('click', ()=> navigateTo('cart'));
      setYear();
      updateCartBadge();
      if (!location.hash) location.hash = '#home';
      route();
    const toggleBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggleBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});
