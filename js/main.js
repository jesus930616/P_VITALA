'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ===== MENÚ HAMBURGUESA ===== */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const header = document.getElementById('header');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('nav--open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    document.querySelectorAll('.header__nav a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          mainNav.classList.remove('nav--open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.innerHTML = '☰';
        }
      });
    });
  }

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ===== ACTIVE NAV (IntersectionObserver) ===== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav a[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('nav--active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('nav--active');
            }
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ===== FAQ ACCORDION ===== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq--open');

        faqItems.forEach(i => i.classList.remove('faq--open'));

        if (!isOpen) {
          item.classList.add('faq--open');
        }
      });
    }
  });

  /* ===== HEADER SCROLL EFFECT ===== */
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 60);
    }, { passive: true });
  }

});
