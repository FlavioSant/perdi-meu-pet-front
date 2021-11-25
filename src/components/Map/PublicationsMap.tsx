import { Map, TileLayer, ZoomControl } from 'react-leaflet';

import { Publication } from '../../types/publication';

import { Position } from '../../types/position';

import { MapMarker } from './MapMarker';
import { MapPopup } from './MapPopup';
import { MapCircleRadius } from './MapCircleRadius';
import { catMarker, dogMarker, otherMarker } from '../../utils/mapMarker';

import { MapContainer } from './styles';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

interface PublicationsMapProps {
  center: Position;
  publications?: Publication[];
  hasPopup: boolean;
  hasRadius?: boolean;
}

const PublicationsMap: React.FC<PublicationsMapProps> = ({
  center,
  publications,
  hasPopup,
  hasRadius = false,
}) => (
  <MapContainer>
    <Map
      center={center}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom
      style={{ width: '100%', height: '100%' }}
    >
      <ZoomControl position="bottomright" />
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {publications &&
        publications.length > 0 &&
        publications.map(publication => (
          <MapMarker
            key={publication.publicacaoId}
            mapMarker={
              publication.categoria === 'cachorro'
                ? dogMarker
                : publication.categoria === 'gato'
                ? catMarker
                : otherMarker
            }
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

export default PublicationsMap;
