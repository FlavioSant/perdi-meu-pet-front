import { Map, TileLayer } from 'react-leaflet';

import { MapMarker } from '../MapMarker';
import { MapPopup } from '../MapPopup';

import { MapContainer } from './styles';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface MapCoords {
  lat: number;
  lng: number;
}

interface Publication {
  id: number;
  createdAt: string;
  name: string;
  lat: number;
  lng: number;
  situation: 'desaparecido' | 'encontrado' | 'adocao';
}

interface PublicationsMapProps {
  center: MapCoords;
  defaultZoom: number;
  publications?: Publication[];
}

const PublicationsMap: React.FC<PublicationsMapProps> = ({
  center,
  defaultZoom,
  publications,
}) => {
  return (
    <MapContainer>
      <Map
        center={center}
        zoom={defaultZoom}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {publications &&
          publications.length > 0 &&
          publications.map(publication => (
            <MapMarker
              key={publication.id}
              position={{ lat: publication.lat, lng: publication.lng }}
            >
              <MapPopup
                popupInfo={{
                  name: publication.name,
                  publicationId: publication.id,
                  situation: publication.situation,
                  createdAt: publication.createdAt,
                }}
              />
            </MapMarker>
          ))}
      </Map>
    </MapContainer>
  );
};

export default PublicationsMap;
