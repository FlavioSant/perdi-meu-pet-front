import styled from 'styled-components';

export const MapContainer = styled.section`
  width: 100%;
  height: 100%;

  .map-popup .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }

  .map-popup .leaflet-popup-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.375rem;
  }
`;
