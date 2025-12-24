(function () {
  'use strict';

  // Mobile menu toggle
  (function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('site-nav');
    const overlay = document.getElementById('mobile-menu-overlay');
    
    if (!menuBtn || !nav || !overlay) return;
    
    function toggleMenu() {
      nav.classList.toggle('active');
      overlay.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMenu() {
      nav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    menuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking nav links
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  })();

  // footer year
  try {
    const yEl = document.getElementById('year');
    if (yEl) yEl.textContent = new Date().getFullYear();
  } catch (e) {
    /* ignore */
  }

  // If a site lightbox already initializes, do nothing else.
  if (window.__site_lightbox_installed) return;

  // Lightweight lightbox for anchors with class "gallery-item"
  function createLightbox() {
    const lb = document.createElement('div');
    lb.id = 'simple-lightbox';
    lb.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);z-index:1200;';
    lb.innerHTML = '<button id="slb-close" aria-label="Close" style="position:absolute;right:18px;top:18px;font-size:28px;color:#fff;background:none;border:0;cursor:pointer">×</button><img id="slb-img" style="max-width:92%;max-height:92%;box-shadow:0 8px 30px rgba(0,0,0,0.6)"><div id="slb-caption" style="color:#fff;margin-top:12px;text-align:center;max-width:90%"></div>';
    document.body.appendChild(lb);

    const img = lb.querySelector('#slb-img');
    const caption = lb.querySelector('#slb-caption');
    const closeBtn = lb.querySelector('#slb-close');

    function open(src, text) {
      img.src = src;
      caption.textContent = text || '';
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.style.display = 'none';
      img.src = '';
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) {
      if (e.target === lb) close();
    });

    return { open: open, close: close };
  }

  const lightbox = createLightbox();
  window.__site_lightbox_installed = true;

  // attach click handlers
  function onGalleryClick(e) {
    const a = e.currentTarget;
    const href = a.getAttribute('href') || a.dataset.href;
    if (!href) return;
    e.preventDefault();
    const caption = a.getAttribute('data-caption') || a.getAttribute('title') || '';
    lightbox.open(href, caption);
  }
  
  // Expose for dynamic gallery items
  window.__site_gallery_handler = onGalleryClick;

  try {
    const items = document.querySelectorAll('a.gallery-item');
    items.forEach(item => {
      item.addEventListener('click', onGalleryClick);
      const img = item.querySelector('img');
      if (img && !img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
    });
  } catch (e) {
    /* ignore */
  }
})();
