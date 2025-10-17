import { apartments } from './data.js';

const getApartment = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return apartments.find((apt) => apt.id === id) || apartments[0];
};

const renderGallery = (photos) => {
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;
  gallery.innerHTML = photos
    .slice(0, 6)
    .map((photo, index) => `
      <img src="${photo}" alt="Foto ${index + 1}" loading="lazy" data-aos="fade-up" />
    `)
    .join('');
};

const renderContent = (apartment) => {
  const title = document.querySelector('[data-title]');
  const description = document.querySelector('[data-description]');
  const amenities = document.querySelector('[data-amenities]');
  const proximity = document.querySelector('[data-proximity]');
  const table = document.querySelector('[data-info-table] tbody');

  if (title) title.textContent = apartment.nome;
  if (description) description.textContent = apartment.descricao;
  if (amenities)
    amenities.innerHTML = apartment.comodidades
      .map((item) => `<span class="chip" data-aos="fade-up">${item}</span>`)
      .join('');
  if (proximity) proximity.textContent = apartment.proximidade;
  if (table) {
    table.innerHTML = `
      <tr>
        <th>Capacidade</th>
        <td>${apartment.capacidade}</td>
      </tr>
      <tr>
        <th>Valor da diária</th>
        <td>${apartment.valor}</td>
      </tr>
      <tr>
        <th>Endereço</th>
        <td>${apartment.endereco}</td>
      </tr>
      <tr>
        <th>WhatsApp</th>
        <td><a href="${apartment.whatsapp}" target="_blank" rel="noopener">Conversar</a></td>
      </tr>
    `;
  }
};

const initMap = (apartment) => {
  const mapContainer = document.getElementById('property-map');
  if (!mapContainer || !window.L) return;

  const map = window.L.map(mapContainer).setView([apartment.latitude, apartment.longitude], 16);
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  const marker = window.L.marker([apartment.latitude, apartment.longitude]).addTo(map);
  marker.bindPopup(`<strong>${apartment.nome}</strong><br>${apartment.distancia}`).openPopup();
};

const highlightNavLink = (apartment) => {
  const link = document.querySelector('[data-whatsapp]');
  if (link) {
    link.href = apartment.whatsapp;
    link.setAttribute('aria-label', `Abrir WhatsApp para ${apartment.nome}`);
  }
};

const init = () => {
  const apartment = getApartment();
  renderGallery(apartment.fotos);
  renderContent(apartment);
  initMap(apartment);
  highlightNavLink(apartment);
  const wrapper = document.querySelector('.page-transition');
  if (wrapper) {
    requestAnimationFrame(() => wrapper.classList.add('is-visible'));
  }
  if (window.AOS) {
    window.AOS.init({ duration: 800, easing: 'ease-out', once: true });
  }
};

window.addEventListener('DOMContentLoaded', init);
