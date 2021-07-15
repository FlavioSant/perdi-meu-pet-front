import { Marker } from 'react-leaflet';

import { mapMarker } from '../../utils/mapMarker';

interface MapMarkerCoords {
  lat: number;
  lng: number;
}

interface MapMarkerProps {
  position: MapMarkerCoords;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, children }) => {
  return (
    <Marker icon={mapMarker} position={position}>
      {children}
    </Marker>
  );
};

export { MapMarker };
