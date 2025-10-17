import { mapLocations } from './data.js';

const initMap = () => {
  const mapContainer = document.getElementById('full-map');
  if (!mapContainer || !window.L) return;

  const map = window.L.map(mapContainer).setView([-23.9925, -46.255], 13);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  const buildPopupContent = (location) => {
    if (location.apartamentos.length > 1) {
      const items = location.apartamentos
        .map(
          (apartment) => `
            <li class="map-popup__item">
              <img src="${apartment.thumbnail}" alt="${apartment.nome}" loading="lazy" />
              <div>
                <h4>${apartment.nome}</h4>
                <p>${apartment.bairro} · ${apartment.distancia}</p>
                <a class="btn" href="apartamento.html?id=${apartment.id}">Ver detalhes</a>
              </div>
            </li>
          `
        )
        .join('');

      return `
        <div class="map-popup map-popup--group">
          <div class="map-popup__heading">
            <strong>${location.nome}</strong>
            <p>${location.endereco}</p>
          </div>
          <ul class="map-popup__list">
            ${items}
          </ul>
        </div>
      `;
    }

    const [apartment] = location.apartamentos;
    return `
      <div class="map-popup">
        <strong>${apartment.nome}</strong>
        <img src="${apartment.thumbnail}" alt="${apartment.nome}" loading="lazy" />
        <p>${apartment.bairro} · ${apartment.distancia}</p>
        <a class="btn" href="apartamento.html?id=${apartment.id}">Ver detalhes</a>
      </div>
    `;
  };

  mapLocations.forEach((location) => {
    const marker = window.L.marker([location.latitude, location.longitude]).addTo(map);
    const popupContent = buildPopupContent(location);
    marker.bindPopup(popupContent, { autoPanPadding: [24, 24] });

    marker.on('popupopen', (event) => {
      const popupElement = event.popup.getElement();
      if (!popupElement) return;
      const content = popupElement.querySelector('.map-popup');
      if (!content) return;
      content.classList.remove('is-visible');
      void content.offsetWidth;
      requestAnimationFrame(() => content.classList.add('is-visible'));
    });

    marker.on('popupclose', (event) => {
      const popupElement = event.popup.getElement();
      if (!popupElement) return;
      const content = popupElement.querySelector('.map-popup');
      if (!content) return;
      content.classList.remove('is-visible');
    });
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
