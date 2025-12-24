(function () {
  'use strict';

  // Dark mode toggle functionality
  (function initDarkMode() {
    const toggle = document.getElementById("dark-mode-toggle");
    if (!toggle) return;

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const storedMode = localStorage.getItem("theme");

    // Apply stored preference or OS preference
    if (storedMode) {
      const isDark = storedMode === "dark";
      document.body.classList.toggle("dark-mode", isDark);
      toggle.checked = isDark;
    } else if (darkModeMediaQuery.matches) {
      document.body.classList.add("dark-mode");
      toggle.checked = true;
    }

    // Toggle handler
    toggle.addEventListener("change", function() {
      const enableDark = toggle.checked;
      document.body.classList.toggle("dark-mode", enableDark);
      localStorage.setItem("theme", enableDark ? "dark" : "light");
    });

    // Listen for OS preference changes (only if user hasn't manually set preference)
    darkModeMediaQuery.addEventListener("change", function(e) {
      if (!localStorage.getItem("theme")) {
        document.body.classList.toggle("dark-mode", e.matches);
        toggle.checked = e.matches;
      }
    });
  })();

  // Mobile menu toggle
  (function initMobileMenu() {
    const MOBILE_BREAKPOINT = 640; // Match CSS media query breakpoint
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
    
    // Close menu when clicking nav links (except dropdown parent)
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      // Don't close menu if it's the dropdown parent link
      const isDropdownParent = link.parentElement.classList.contains('dropdown') && 
                               link.nextElementSibling && 
                               link.nextElementSibling.classList.contains('dropdown-content');
      if (!isDropdownParent) {
        link.addEventListener('click', closeMenu);
      }
    });
    
    // Mobile dropdown toggle - always attach handlers, behavior controlled by CSS
    const dropdowns = nav.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const parentLink = dropdown.querySelector('a[href="#"]');
      if (parentLink) {
        parentLink.addEventListener('click', function(e) {
          e.preventDefault();
          // Only toggle on mobile (CSS will handle showing on desktop via hover)
          if (window.innerWidth <= MOBILE_BREAKPOINT) {
            dropdown.classList.toggle('active');
          }
        });
      }
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

  // Main site lightbox implementation for anchors with class "gallery-item", reused via the exposed handler
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
