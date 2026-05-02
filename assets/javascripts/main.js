    // Navbar scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    function closeMobile() {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));

    // Map
    document.addEventListener('DOMContentLoaded', function () {
      const map = L.map('map').setView([17.4065, 78.4772], 13);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      const markerHtml = `<div style="
        width:12px; height:12px; border-radius:50%;
        background:var(--accent-coral, #fc736c);
        border:2px solid rgba(252,115,108,0.3);
        box-shadow:0 0 0 6px rgba(252,115,108,0.15), 0 0 20px rgba(252,115,108,0.4);
      "></div>`;
      const icon = L.divIcon({ className: '', html: markerHtml, iconSize: [12, 12], iconAnchor: [6, 6] });
      L.marker([17.4065, 78.4772], { icon })
        .addTo(map)
        .bindPopup('<strong style="font-family:Georgia,serif">Hyderabad</strong><br><span style="color:#888;font-size:12px">Find me here</span>')
        .openPopup();
    });
