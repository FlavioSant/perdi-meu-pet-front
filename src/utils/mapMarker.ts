import leaftlet from 'leaflet';

export const dogMarker = leaftlet.icon({
  iconUrl: '/dog-marker.svg',
  iconSize: [40, 50],
  iconAnchor: [17, 48],
  popupAnchor: [2, -50],
});

export const catMarker = leaftlet.icon({
  iconUrl: '/cat-marker.svg',
  iconSize: [40, 50],
  iconAnchor: [17, 48],
  popupAnchor: [2, -50],
});

export const otherMarker = leaftlet.icon({
  iconUrl: '/other-marker.svg',
  iconSize: [40, 50],
  iconAnchor: [17, 48],
  popupAnchor: [2, -50],
});
