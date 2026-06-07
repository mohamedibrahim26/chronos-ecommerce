/* ═══════════════════════════════════════════════
       DATA
    ═══════════════════════════════════════════════ */
    const products = [
      { id:1, name:'Nebula Phantom', collection:'Dark Matter', price:2890, orig:3400, category:'limited', colorClass:'w1', colorBg:'linear-gradient(135deg,#1a0020,#300a50)', borderColor:'rgba(224,64,251,0.5)', badge:'ltd', badgeText:'Limited', rating:'★★★★★', reviews:284 },
      { id:2, name:'Arctic Horizon', collection:'Explorer Series', price:1650, orig:null, category:'sport', colorClass:'w2', colorBg:'linear-gradient(135deg,#0f1e2e,#0a2a3a)', borderColor:'rgba(0,180,216,0.5)', badge:'new', badgeText:'New', rating:'★★★★★', reviews:91 },
      { id:3, name:'Solar Meridian', collection:'Classic Gold', price:3200, orig:3800, category:'classic', colorClass:'w3', colorBg:'linear-gradient(135deg,#1a1a0a,#2e2800)', borderColor:'rgba(255,224,0,0.4)', badge:'sale', badgeText:'Sale', rating:'★★★★☆', reviews:167 },
      { id:4, name:'Forest Sentinel', collection:'Wilderness Series', price:1890, orig:null, category:'sport', colorClass:'w4', colorBg:'linear-gradient(135deg,#0a1e0a,#0d2e1a)', borderColor:'rgba(26,147,111,0.5)', badge:'new', badgeText:'New', rating:'★★★★★', reviews:43 },
      { id:5, name:'Ember Torque', collection:'Inferno Edition', price:2200, orig:2600, category:'limited', colorClass:'w5', colorBg:'linear-gradient(135deg,#1e0a0a,#2e1010)', borderColor:'rgba(255,107,53,0.5)', badge:'ltd', badgeText:'Limited', rating:'★★★★★', reviews:198 },
      { id:6, name:'Midnight Atlas', collection:'Noir Collection', price:1450, orig:null, category:'classic', colorClass:'w6', colorBg:'linear-gradient(135deg,#0f0f1e,#1a1a3a)', borderColor:'rgba(100,100,255,0.5)', badge:'new', badgeText:'New', rating:'★★★★☆', reviews:72 },
    ];

    const reviews = [
      { name:'Alexander V.', avatar:'AV', color:'linear-gradient(135deg,#ff6b35,#f7c59f)', date:'May 2026', stars:'★★★★★', text:'The Nebula Phantom exceeded every expectation. The galactic dial catches light in ways photos simply can\'t capture. This is the most complimented item I\'ve ever owned.', verified:true },
      { name:'Sofia Marchetti', avatar:'SM', color:'linear-gradient(135deg,#e040fb,#8b00ff)', date:'Apr 2026', stars:'★★★★★', text:'Ordered as an anniversary gift. The unboxing experience alone is worth it — they arrived in the most beautiful presentation box. My husband hasn\'t taken it off since.', verified:true },
      { name:'James K.', avatar:'JK', color:'linear-gradient(135deg,#00b4d8,#0096c7)', date:'Apr 2026', stars:'★★★★★', text:'As a watch collector for 20+ years, I can say this stands alongside pieces triple the price. The movement is silky smooth. Five stars without hesitation.', verified:true },
    ];

    const galleryData = [
      { name:'Nebula Phantom', collection:'Dark Matter Collection · 2026', price:'$2,890', orig:'$3,400', bg:'linear-gradient(135deg,#8b00ff,#e040fb)', label:'NEBULA' },
      { name:'Arctic Horizon', collection:'Explorer Series · 2026', price:'$1,650', orig:null, bg:'linear-gradient(135deg,#00b4d8,#0096c7)', label:'ARCTIC' },
      { name:'Solar Meridian', collection:'Classic Gold · 2026', price:'$3,200', orig:'$3,800', bg:'linear-gradient(135deg,#ffd700,#ff8c00)', label:'SOLAR' },
      { name:'Ember Torque', collection:'Inferno Edition · 2026', price:'$2,200', orig:'$2,600', bg:'linear-gradient(135deg,#ff6b35,#e02020)', label:'EMBER' },
    ];

    /* ═══════════════════════════════════════════════
       CART STATE
    ═══════════════════════════════════════════════ */
    let cart = JSON.parse(localStorage.getItem('chronos_cart') || '[]');
    let selectedColor = 'Cosmic Violet';
    let selectedSize = '42mm';
    let qty = 1;
    let discount = 0;

    function saveCart() { localStorage.setItem('chronos_cart', JSON.stringify(cart)); }

    /* ═══════════════════════════════════════════════
       RENDER PRODUCTS
    ═══════════════════════════════════════════════ */
    function renderProducts(filter='all') {
      const grid = document.getElementById('productsGrid');
      const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
      grid.innerHTML = filtered.map(p => `
        <div class="product-card reveal" data-category="${p.category}">
          <div class="card-img">
            <div class="card-watch ${p.colorClass}">
              <div class="card-watch-face" style="background:${p.colorBg};border-color:${p.borderColor}">
                <div class="cw-brand">CHRONOS</div>
                <div class="cw-time">10:10</div>
              </div>
            </div>
            <span class="card-badge badge-${p.badge}">${p.badgeText}</span>
            <button class="quick-add" onclick="addToCart(${p.id},event)">+ Add to Cart</button>
          </div>
          <div class="card-body">
            <div class="card-name">${p.name}</div>
            <div class="card-collection">${p.collection}</div>
            <div class="card-footer">
              <div class="card-price">
                ${p.orig ? `<span class="original">$${p.orig.toLocaleString()}</span>` : ''}
                <span class="${p.orig ? 'sale' : ''}">$${p.price.toLocaleString()}</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="card-stars">${p.rating}</div>
                <button class="wishlist-btn" onclick="toggleCardWishlist(this,event)" title="Wishlist">♡</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
      observeReveal();
    }

    function filterProducts(cat, btn) {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(cat);
    }

    /* ═══════════════════════════════════════════════
       RENDER REVIEWS
    ═══════════════════════════════════════════════ */
    function renderReviews() {
      document.getElementById('reviewsList').innerHTML = reviews.map(r => `
        <div class="review-card reveal">
          <div class="review-header">
            <div class="reviewer">
              <div class="avatar" style="background:${r.color};color:#fff">${r.avatar}</div>
              <div>
                <div class="review-name">${r.name}</div>
                <div class="review-date">${r.date}</div>
              </div>
            </div>
            <div>
              <div class="review-stars">${r.stars}</div>
              ${r.verified ? '<div class="verified">✓ Verified Purchase</div>' : ''}
            </div>
          </div>
          <div class="review-text">"${r.text}"</div>
        </div>
      `).join('');
    }

    /* ═══════════════════════════════════════════════
       RENDER RELATED
    ═══════════════════════════════════════════════ */
    function renderRelated() {
      const related = [...products].sort(() => Math.random()-0.5).slice(0,4);
      document.getElementById('relatedGrid').innerHTML = related.map(p => `
        <div class="product-card reveal" style="transition-delay:${related.indexOf(p)*0.1}s">
          <div class="card-img">
            <div class="card-watch ${p.colorClass}">
              <div class="card-watch-face" style="background:${p.colorBg};border-color:${p.borderColor}">
                <div class="cw-brand">CHRONOS</div>
                <div class="cw-time">10:10</div>
              </div>
            </div>
            <span class="card-badge badge-new">New</span>
            <button class="quick-add" onclick="addToCart(${p.id},event)">+ Add to Cart</button>
          </div>
          <div class="card-body">
            <div class="card-name">${p.name}</div>
            <div class="card-collection">${p.collection}</div>
            <div class="card-footer">
              <div class="card-price">$${p.price.toLocaleString()}</div>
              <div class="card-stars">${p.rating}</div>
            </div>
          </div>
        </div>
      `).join('');
    }

    /* ═══════════════════════════════════════════════
       CART LOGIC
    ═══════════════════════════════════════════════ */
    function addToCart(productId, e) {
      e && e.stopPropagation();
      const p = products.find(x => x.id === productId);
      if(!p) return;
      const existing = cart.find(c => c.id === productId && c.size === '42mm' && c.color === 'Default');
      if(existing) { existing.qty++; }
      else { cart.push({ id:p.id, name:p.name, price:p.price, size:'42mm', color:'Default', qty:1, colorBg:p.colorBg, borderColor:p.borderColor }); }
      saveCart(); updateCartUI();
      showToast('✓', `${p.name} added to cart`, 'success');
      bumpCount();
    }

    function addFeaturedToCart() {
      const existing = cart.find(c => c.id === 999 && c.size === selectedSize && c.color === selectedColor);
      if(existing) { existing.qty += qty; }
      else {
        for(let i=0;i<qty;i++) {
          cart.push({ id:999, name:'Nebula Phantom', price:2890, size:selectedSize, color:selectedColor, qty:1, colorBg:'linear-gradient(135deg,#1a0020,#300a50)', borderColor:'rgba(224,64,251,0.5)' });
        }
      }
      saveCart(); updateCartUI(); openCart();
      showToast('✓', `Nebula Phantom (${selectedSize} · ${selectedColor}) added!`, 'success');
      bumpCount();
    }

    function removeFromCart(idx) {
      cart.splice(idx, 1);
      saveCart(); updateCartUI();
      showToast('×', 'Item removed from cart', 'error');
    }

    function changeCartQty(idx, delta) {
      cart[idx].qty += delta;
      if(cart[idx].qty <= 0) { removeFromCart(idx); return; }
      saveCart(); updateCartUI();
    }

    function updateCartUI() {
      const total = cart.reduce((s,c) => s+c.price*c.qty, 0);
      const totalQty = cart.reduce((s,c) => s+c.qty, 0);
      const discounted = total * (1 - discount/100);

      // count badge
      document.getElementById('cartCount').textContent = totalQty;

      // items
      const container = document.getElementById('cartItems');
      const footer = document.getElementById('cartFooter');

      if(cart.length === 0) {
        container.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">⌚</div><h3>Your cart is empty</h3><p>Add a timepiece to get started.</p></div>`;
        footer.style.display = 'none';
        return;
      }

      footer.style.display = 'block';
      container.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
          <div class="cart-item-img">
            <div class="ci-watch" style="background:${item.colorBg};border-color:${item.borderColor};color:#fff">⌚</div>
          </div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-variant">${item.size} · ${item.color}</div>
            <div class="cart-item-bottom">
              <div class="cart-item-price">$${(item.price*item.qty).toLocaleString()}</div>
              <div class="cart-qty-ctrl">
                <button class="cq-btn" onclick="changeCartQty(${idx},-1)">−</button>
                <span class="cq-num">${item.qty}</span>
                <button class="cq-btn" onclick="changeCartQty(${idx},1)">+</button>
                <button class="cart-remove" onclick="removeFromCart(${idx})">✕</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');

      document.getElementById('subtotal').textContent = `$${total.toLocaleString()}`;
      document.getElementById('discountRow').textContent = discount ? `-$${(total*discount/100).toFixed(0)}` : '—';
      document.getElementById('cartTotal').textContent = `$${discounted.toLocaleString()}`;
    }

    function openCart() {
      document.getElementById('cartOverlay').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeCart() {
      document.getElementById('cartOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }

    document.getElementById('cartClose').onclick = closeCart;
    document.getElementById('cartOverlay').addEventListener('click', e => { if(e.target === document.getElementById('cartOverlay')) closeCart(); });

    function bumpCount() {
      const el = document.getElementById('cartCount');
      el.classList.add('bump');
      setTimeout(() => el.classList.remove('bump'), 400);
    }

    function applyPromo() {
      const code = document.getElementById('promoInput').value.trim().toUpperCase();
      if(code === 'CHRONOS20') { discount = 20; showToast('🎉','20% discount applied!','success'); updateCartUI(); }
      else if(code === 'SAVE10') { discount = 10; showToast('🎉','10% discount applied!','success'); updateCartUI(); }
      else { showToast('✕','Invalid promo code','error'); }
    }

    function checkout() {
      showToast('🔒','Redirecting to secure checkout…','info');
      setTimeout(() => showToast('✓','This is a demo — no payment taken!','info'), 2000);
    }

    /* ═══════════════════════════════════════════════
       TOAST
    ═══════════════════════════════════════════════ */
    function showToast(icon, text, type='success') {
      const container = document.getElementById('toastContainer');
      const el = document.createElement('div');
      el.className = `toast toast-${type}`;
      el.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-text">${text}</span>`;
      container.appendChild(el);
      setTimeout(() => { el.classList.add('removing'); setTimeout(() => el.remove(), 300); }, 3500);
    }

    /* ═══════════════════════════════════════════════
       PRODUCT OPTIONS
    ═══════════════════════════════════════════════ */
    function selectColor(el) {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
      selectedColor = el.dataset.color;
      showToast('🎨', `Color: ${selectedColor}`, 'info');
    }

    function selectSize(el) {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      selectedSize = el.textContent;
    }

    function changeQty(delta) {
      qty = Math.max(1, Math.min(10, qty + delta));
      document.getElementById('qtyNum').textContent = qty;
    }

    function toggleCardWishlist(btn, e) {
      e && e.stopPropagation();
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
      showToast(btn.classList.contains('active') ? '♥' : '♡', btn.classList.contains('active') ? 'Added to wishlist' : 'Removed from wishlist', btn.classList.contains('active') ? 'success' : 'info');
    }

    function toggleWishlist() { showToast('♡','Wishlist coming soon!','info'); }
    function toggleFullWishlist(btn) {
      const active = btn.textContent.includes('♥');
      btn.textContent = active ? '♡   Save to Wishlist' : '♥   Saved to Wishlist';
      showToast(active ? '♡' : '♥', active ? 'Removed from wishlist' : 'Added to wishlist!', active ? 'info' : 'success');
    }

    /* ═══════════════════════════════════════════════
       GALLERY SWITCHER
    ═══════════════════════════════════════════════ */
    function switchGallery(idx, el) {
      document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      const d = galleryData[idx];
      document.getElementById('pdName').textContent = d.name;
      document.getElementById('pdCollection').textContent = d.collection;
      document.getElementById('pdPrice').textContent = d.price;
      document.getElementById('pdOrig').textContent = d.orig || '';
      document.getElementById('featPrice').textContent = d.price;

      const mw = document.getElementById('mainWatch');
      mw.style.transition = 'opacity 0.3s, transform 0.3s';
      mw.style.opacity = '0'; mw.style.transform = 'scale(0.9)';
      setTimeout(() => {
        mw.style.background = `conic-gradient(from 45deg, #1a0020, ${d.bg.split(',')[1] || '#300a50'}, #1a0020, #0a0a30, #1a0020)`;
        mw.style.borderColor = 'rgba(255,107,53,0.4)';
        mw.querySelector('.gi-time').textContent = d.label;
        mw.style.opacity = '1'; mw.style.transform = 'scale(1)';
      }, 200);
    }

    /* ═══════════════════════════════════════════════
       ACCORDION
    ═══════════════════════════════════════════════ */
    function toggleAccordion(btn) {
      const item = btn.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    }

    /* ═══════════════════════════════════════════════
       COUNTDOWN TIMER
    ═══════════════════════════════════════════════ */
    function startCountdown() {
      const target = new Date();
      target.setHours(target.getHours() + 4, target.getMinutes() + 23, target.getSeconds() + 47);
      function update() {
        const now = new Date();
        const diff = Math.max(0, target - now);
        const h = Math.floor(diff/3600000);
        const m = Math.floor((diff%3600000)/60000);
        const s = Math.floor((diff%60000)/1000);
        document.getElementById('cdH').textContent = String(h).padStart(2,'0');
        document.getElementById('cdM').textContent = String(m).padStart(2,'0');
        document.getElementById('cdS').textContent = String(s).padStart(2,'0');
      }
      update(); setInterval(update, 1000);
    }

    /* ═══════════════════════════════════════════════
       LIVE CLOCK
    ═══════════════════════════════════════════════ */
    function startLiveClock() {
      function update() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2,'0');
        const m = String(now.getMinutes()).padStart(2,'0');
        const el = document.getElementById('liveTime');
        if(el) el.textContent = `${h}:${m}`;
      }
      update(); setInterval(update, 1000);
    }

    /* ═══════════════════════════════════════════════
       CUSTOM CURSOR
    ═══════════════════════════════════════════════ */
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx=0, my=0, rx=0, ry=0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx-6}px,${my-6}px)`;
    });

    function animateRing() {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('button,a,[onclick]').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width='52px'; ring.style.height='52px'; ring.style.borderColor='rgba(255,107,53,0.8)'; ring.style.transform+=` translate(-8px,-8px)`; });
      el.addEventListener('mouseleave', () => { ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='rgba(255,107,53,0.6)'; });
    });

    /* ═══════════════════════════════════════════════
       3D TILT ON HERO WATCH
    ═══════════════════════════════════════════════ */
    const heroWatch = document.getElementById('heroWatch');
    const galleryMain = document.getElementById('galleryMain');

    function initTilt(el, inner) {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2) / (r.width/2);
        const y = (e.clientY - r.top - r.height/2) / (r.height/2);
        inner.style.transform = `rotateY(${x*12}deg) rotateX(${-y*12}deg) scale(1.04)`;
      });
      el.addEventListener('mouseleave', () => { inner.style.transform = ''; });
    }
    if(heroWatch) initTilt(heroWatch.parentElement, heroWatch);

    const mainWatch = document.getElementById('mainWatch');
    if(galleryMain && mainWatch) initTilt(galleryMain, mainWatch);

    /* ═══════════════════════════════════════════════
       NAVBAR SCROLL
    ═══════════════════════════════════════════════ */
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ═══════════════════════════════════════════════
       SCROLL REVEAL
    ═══════════════════════════════════════════════ */
    function observeReveal() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
      }, { threshold:0.12 });
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => observer.observe(el));
    }

    /* ═══════════════════════════════════════════════
       INIT
    ═══════════════════════════════════════════════ */
    renderProducts();
    renderReviews();
    renderRelated();
    startCountdown();
    startLiveClock();
    updateCartUI();
    observeReveal();