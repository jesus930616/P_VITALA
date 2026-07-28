'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===== TABS FILTER ===== */
  const tabsContainer = document.getElementById('tabsFilter');
  const servicesGrid = document.getElementById('servicesGrid');
  const serviceCards = servicesGrid ? servicesGrid.querySelectorAll('.service-card') : [];

  if (tabsContainer && servicesGrid) {
    tabsContainer.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;

      tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      serviceCards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.style.display = '';
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'fadeIn 0.4s ease forwards';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

});
