import leaftlet from 'leaflet';

export const mapMarker = leaftlet.icon({
  iconUrl: '/marker.svg',
  iconSize: [40, 50],
  iconAnchor: [17, 48],
  popupAnchor: [2, -50],
});
