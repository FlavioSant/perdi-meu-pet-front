import { Marker } from 'react-leaflet';

import { Position } from '../../@types/position';
import { mapMarker } from '../../utils/mapMarker';

interface MapMarkerProps {
  position: Position;
}

const MapMarker: React.FC<MapMarkerProps> = ({ position, children }) => {
  return (
    <Marker icon={mapMarker} position={position}>
      {children}
    </Marker>
  );
};

export { MapMarker };
