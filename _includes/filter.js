function filterCat(cat, el) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.post-item').forEach(item => {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'grid' : 'none';
  });
}

(function() {
  const els = document.querySelectorAll('.fade-in');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
})();
