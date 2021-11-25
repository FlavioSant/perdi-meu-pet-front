import { Icon, IconOptions } from 'leaflet';
import { Marker } from 'react-leaflet';

import { Position } from '../../../types/position';

interface MapMarkerProps {
  position: Position;
  mapMarker: Icon<IconOptions>;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  position,
  children,
  mapMarker,
}) => (
  <Marker icon={mapMarker} position={position}>
    {children}
  </Marker>
);
