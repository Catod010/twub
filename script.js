/* ---- Custom cursor (desktop only) ---- */
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  if (cursor && cursorRing && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + 'px';
      cursorRing.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => { cursorRing.style.width = '56px'; cursorRing.style.height = '56px'; });
      el.addEventListener('mouseleave', () => { cursorRing.style.width = '36px'; cursorRing.style.height = '36px'; });
    });
  }

  /* ---- Hamburger menu ---- */
  const ham = document.getElementById('navHam');
  const navLinks = document.getElementById('navLinks');
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      ham.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---- Filter products ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const productCount = document.getElementById('productCount');

  function applyFilter(filter) {
    let visible = 0;
    productCards.forEach(card => {
      const cats = card.dataset.category || '';
      const show = filter === 'all' || cats.split(' ').includes(filter);
      card.setAttribute('data-hidden', show ? 'false' : 'true');
      if (show) visible++;
    });
    productCount.textContent = visible + ' ite' + (visible === 1 ? 'm' : 'ns');
    filterBtns.forEach(b => b.classList.remove('active'));
    filterBtns.forEach(b => { if (b.dataset.filter === filter) b.classList.add('active'); });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });

  /* ---- "Ver Todas" scrolls to products and activates New Collection filter ---- */
  document.getElementById('viewAllNewCollection').addEventListener('click', () => {
    document.getElementById('produtos').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => applyFilter('new'), 400);
  });

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  reveals.forEach(r => observer.observe(r));