import { apartments } from './data.js';

const revealPage = () => {
  const wrapper = document.querySelector('.page-transition');
  if (wrapper) {
    requestAnimationFrame(() => {
      wrapper.classList.add('is-visible');
    });
  }
};

const initAOS = () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 80,
    });
  }
};

const initGSAP = () => {
  if (window.gsap && document.querySelector('.hero')) {
    if (window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
    const heroText = document.querySelector('.hero-content');
    window.gsap.fromTo(
      heroText,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3 }
    );

    if (window.gsap.utils && window.ScrollTrigger) {
      window.gsap.utils.toArray('.section').forEach((section) => {
        window.gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    }
  }
};

const renderHighlightCards = () => {
  const container = document.querySelector('[data-highlight-grid]');
  if (!container) return;

  const featured = apartments.slice(0, 3);
  container.innerHTML = featured
    .map(
      (apt) => `
        <article class="highlight-card" data-aos="fade-up">
          <img src="${apt.fotos[0]}" alt="${apt.nome}" loading="lazy" />
          <div>
            <h3>${apt.nome}</h3>
            <p>${apt.descricao}</p>
          </div>
          <div class="card-meta">
            <span class="chip">${apt.bairro} · ${apt.distancia}</span>
            <span class="chip">${apt.capacidade}</span>
            <span class="chip">${apt.valor}</span>
          </div>
          <a class="btn" href="apartamento.html?id=${apt.id}">Ver detalhes</a>
        </article>
      `
    )
    .join('');
};

const renderCatalogGrid = () => {
  const grid = document.querySelector('[data-catalog-grid]');
  if (!grid) return;

  grid.innerHTML = apartments
    .map(
      (apt) => `
        <article class="card" data-aos="fade-up">
          <img src="${apt.fotos[0]}" alt="${apt.nome}" loading="lazy" />
          <div class="card-content">
            <h3 class="card-title">${apt.nome}</h3>
            <div class="card-meta">
              <span>📍 ${apt.bairro} · ${apt.distancia}</span>
              <span>👥 ${apt.capacidade}</span>
            </div>
            <div class="card-meta">
              <span>💰 ${apt.valor}</span>
            </div>
            <a class="btn" href="apartamento.html?id=${apt.id}">Ver mais</a>
          </div>
        </article>
      `
    )
    .join('');
};

const attachCTA = () => {
  const cta = document.querySelector('[data-scroll-to]');
  const target = document.querySelector('[data-scroll-target]');
  if (!cta || !target) return;

  cta.addEventListener('click', (event) => {
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
};

const initParallax = () => {
  if (!window.gsap || !document.querySelector('.hero')) return;

  const hero = document.querySelector('.hero');
  const parallaxElements = hero.querySelectorAll('[data-parallax]');

  parallaxElements.forEach((element) => {
    window.gsap.to(element, {
      xPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
};

const init = () => {
  revealPage();
  renderHighlightCards();
  renderCatalogGrid();
  attachCTA();
  initAOS();
  initGSAP();
  initParallax();
};

window.addEventListener('DOMContentLoaded', init);
