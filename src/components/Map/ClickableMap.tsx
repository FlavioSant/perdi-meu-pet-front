import { Map, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { Position } from '../../types/position';
import { MapMarker } from './MapMarker';
import { MapCircleRadius } from './MapCircleRadius';

import { MapContainer } from './styles';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface ClickableMapProps {
  center: Position;
  position: Position;
  onMapClick: (event: LeafletMouseEvent) => void;
}

const ClickableMap: React.FC<ClickableMapProps> = ({
  center,
  position,
  onMapClick,
}) => (
  <MapContainer>
    <Map
      center={center}
      zoom={14}
      scrollWheelZoom
      style={{ width: '100%', height: '100%' }}
      onclick={(event: LeafletMouseEvent) => onMapClick(event)}
    >
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {position.lat !== 0 && (
        <MapMarker position={position}>
          <MapCircleRadius center={position} />
        </MapMarker>
      )}
    </Map>
  </MapContainer>
);

export default ClickableMap;
