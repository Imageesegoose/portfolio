// Simple lightbox & keyboard navigation
(() => {
  const gallery = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox.querySelector('.lightbox-image');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let current = -1;

  function open(index){
    const el = gallery[index];
    const src = el.getAttribute('href') || el.querySelector('img').src;
    const cap = el.dataset.caption || el.querySelector('img').alt || '';
    lbImg.src = src;
    lbImg.alt = cap;
    lbCaption.textContent = cap;
    lightbox.setAttribute('aria-hidden','false');
    current = index;
    // prevent page jump
    history.replaceState(null, '', '#');
  }
  function close(){
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    current = -1;
  }
  function prev(){
    if(current > 0) open(current - 1);
  }
  function next(){
    if(current < gallery.length - 1) open(current + 1);
  }

  gallery.forEach((g, i) => {
    g.addEventListener('click', (e) => {
      e.preventDefault();
      open(i);
    });
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  window.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();