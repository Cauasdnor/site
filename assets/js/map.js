import { apartments } from './data.js';

const initMap = () => {
  const mapContainer = document.getElementById('full-map');
  if (!mapContainer || !window.L) return;

  const map = window.L.map(mapContainer).setView([-23.9925, -46.255], 13);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  apartments.forEach((apt) => {
    const marker = window.L.marker([apt.latitude, apt.longitude]).addTo(map);
    const popupContent = `
      <div class="map-popup">
        <strong>${apt.nome}</strong><br />
        <img src="${apt.fotos[0]}" alt="${apt.nome}" loading="lazy" />
        <p>${apt.bairro} · ${apt.distancia}</p>
        <a class="btn" href="apartamento.html?id=${apt.id}">Ver detalhes</a>
      </div>
    `;
    marker.bindPopup(popupContent, { autoPanPadding: [24, 24] });
  });
};

const init = () => {
  const wrapper = document.querySelector('.page-transition');
  if (wrapper) {
    requestAnimationFrame(() => wrapper.classList.add('is-visible'));
  }
  initMap();
};

window.addEventListener('DOMContentLoaded', init);
