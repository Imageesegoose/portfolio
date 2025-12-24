(function () {
  'use strict';

  // footer year
  try {
    var yEl = document.getElementById('year');
    if (yEl) yEl.textContent = new Date().getFullYear();
  } catch (e) {
    /* ignore */
  }

  // If a site lightbox already initializes, do nothing else.
  if (window.__site_lightbox_installed) return;

  // Lightweight lightbox fallback for anchors with class "gallery-item"
  function createLightbox() {
    var lb = document.createElement('div');
    lb.id = 'simple-lightbox';
    lb.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);z-index:1200;';
    lb.innerHTML = '<button id="slb-close" aria-label="Close" style="position:absolute;right:18px;top:18px;font-size:28px;color:#fff;background:none;border:0;cursor:pointer">×</button><img id="slb-img" style="max-width:92%;max-height:92%;box-shadow:0 8px 30px rgba(0,0,0,0.6)"><div id="slb-caption" style="color:#fff;margin-top:12px;text-align:center;max-width:90%"></div>';
    document.body.appendChild(lb);

    var img = lb.querySelector('#slb-img');
    var caption = lb.querySelector('#slb-caption');
    var closeBtn = lb.querySelector('#slb-close');

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

  var lightbox = createLightbox();
  window.__site_lightbox_installed = true;

  // attach click handlers
  function onGalleryClick(e) {
    var a = e.currentTarget;
    var href = a.getAttribute('href') || a.dataset.href;
    if (!href) return;
    e.preventDefault();
    var caption = a.getAttribute('data-caption') || a.getAttribute('title') || '';
    lightbox.open(href, caption);
  }

  try {
    var items = document.querySelectorAll('a.gallery-item');
    for (var i = 0; i < items.length; i++) {
      items[i].addEventListener('click', onGalleryClick);
      var im = items[i].querySelector('img');
      if (im && !im.getAttribute('loading')) im.setAttribute('loading', 'lazy');
    }
  } catch (e) {
    /* ignore */
  }

  // Desktop-only navigation tooltips
  var MOBILE_BREAKPOINT = 640;
  var tooltipsInitialized = false;

  function initNavTooltips() {
    // Only add tooltips on desktop (min-width: 641px)
    if (window.innerWidth <= MOBILE_BREAKPOINT) return;

    // Avoid duplicate initialization
    if (tooltipsInitialized) return;

    var navLinks = document.querySelectorAll('.site-nav a');
    
    navLinks.forEach(function(link) {
      // Create tooltip element
      var tooltip = document.createElement('span');
      tooltip.className = 'nav-tooltip';
      tooltip.textContent = 'Have fun!';
      link.appendChild(tooltip);

      // Show tooltip on mouseenter
      link.addEventListener('mouseenter', function() {
        if (window.innerWidth > MOBILE_BREAKPOINT) {
          tooltip.classList.add('show');
        }
      });

      // Hide tooltip on mouseleave
      link.addEventListener('mouseleave', function() {
        tooltip.classList.remove('show');
      });
    });

    tooltipsInitialized = true;
  }

  function removeNavTooltips() {
    var existingTooltips = document.querySelectorAll('.nav-tooltip');
    existingTooltips.forEach(function(tooltip) {
      tooltip.remove();
    });
    tooltipsInitialized = false;
  }

  // Initialize tooltips after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavTooltips);
  } else {
    initNavTooltips();
  }

  // Re-check on window resize to handle orientation changes
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        // Remove tooltips when switching to mobile
        removeNavTooltips();
      } else if (!tooltipsInitialized) {
        // Re-add tooltips when switching back to desktop
        initNavTooltips();
      }
    }, 250);
  });
})();
