import Router from 'next/router';

import { Popup } from 'react-leaflet';
import { FiArrowRight } from 'react-icons/fi';

import { MapPopupInfo } from './styles';

interface PopupInfo {
  publicationId: string;
  category: string;
  name?: string;
  situation: string;
  createdAt: string;
}

interface MapPopupProps {
  popupInfo: PopupInfo;
}

export const MapPopup: React.FC<MapPopupProps> = ({ popupInfo }) => (
  <Popup
    closeButton={false}
    minWidth={240}
    maxWidth={240}
    className="map-popup"
  >
    <MapPopupInfo>
      <article>
        {popupInfo.name && <h3>{popupInfo.name}</h3>}
        <p>{popupInfo.category}</p>
        <p>{popupInfo.situation}</p>
        <span>{popupInfo.createdAt}</span>
      </article>

      <button
        type="button"
        title="Ver publicação"
        onClick={() => Router.push(`/publication/${popupInfo.publicationId}`)}
      >
        <FiArrowRight size={22} />
      </button>
    </MapPopupInfo>
  </Popup>
);
