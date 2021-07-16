import { NextPage } from 'next';

import { Circle } from 'react-leaflet';

interface MapCoords {
  lat: number;
  lng: number;
}

interface MapCircleProps {
  center: MapCoords;
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

export default MapCircleRadius;
