import { NextPage } from 'next';

import { Circle } from 'react-leaflet';

import { Position } from '../../types/position';

interface MapCircleProps {
  center: Position;
}

const MapCircleRadius: NextPage<MapCircleProps> = ({ center }) => {
  return (
    <Circle
      radius={1100}
      center={center}
      color="#FF6043"
      fillColor="#FF6043"
      weight={2}
    />
  );
};

export { MapCircleRadius };
