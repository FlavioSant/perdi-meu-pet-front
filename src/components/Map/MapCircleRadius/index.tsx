import { Circle } from 'react-leaflet';

import { Position } from '../../../types/position';

interface MapCircleProps {
  center: Position;
}

export const MapCircleRadius: React.FC<MapCircleProps> = ({ center }) => (
  <Circle
    radius={1100}
    center={center}
    color="#FF6043"
    fillColor="#FF6043"
    weight={2}
  />
);
