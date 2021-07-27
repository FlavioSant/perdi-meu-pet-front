import { Map, TileLayer } from 'react-leaflet';
import { MapMarker } from '../MapMarker';
import { MapPopup } from '../MapPopup';

import { Publication } from '../../@types/publication';

import { MapContainer } from './styles';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import MapCircleRadius from '../MapCircleRadius';

interface MapCoords {
  lat: number;
  lng: number;
}

interface PublicationsMapProps {
  center: MapCoords;
  publications?: Publication[];
  hasPopup: boolean;
  hasRadius?: boolean;
}

const PublicationsMap: React.FC<PublicationsMapProps> = ({
  center,
  publications,
  hasPopup,
  hasRadius = false,
}) => {
  return (
    <MapContainer>
      <Map
        center={center}
        zoom={13}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {publications &&
          publications.length > 0 &&
          publications.map(publication => (
            <MapMarker
              key={publication.publicacaoId}
              position={{
                lat: publication.latitude,
                lng: publication.longitude,
              }}
            >
              {hasRadius && (
                <MapCircleRadius
                  center={{
                    lat: publication.latitude,
                    lng: publication.longitude,
                  }}
                />
              )}
              {hasPopup && (
                <MapPopup
                  popupInfo={{
                    publicationId: publication.publicacaoId,
                    category: publication.categoria,
                    name: publication.nome || '',
                    situation: publication.situacao,
                    createdAt: new Date(publication.createdAt).toLocaleString(),
                  }}
                />
              )}
            </MapMarker>
          ))}
      </Map>
    </MapContainer>
  );
};

export default PublicationsMap;
