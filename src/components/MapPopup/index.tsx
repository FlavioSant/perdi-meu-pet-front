import { Popup } from 'react-leaflet';
import { FiArrowRight } from 'react-icons/fi';

import { MapPopupInfo } from './styles';
import { useCallback } from 'react';

interface PopupInfo {
  publicationId: string;
  name?: string;
  situation: string;
  createdAt: string;
}

interface MapPopupProps {
  popupInfo: PopupInfo;
}

const MapPopup: React.FC<MapPopupProps> = ({ popupInfo }) => {
  const handleClick = useCallback((publicationId: string) => {
    alert(`ID: ${publicationId}`);
  }, []);

  return (
    <Popup
      closeButton={false}
      minWidth={240}
      maxWidth={240}
      className="map-popup"
    >
      <MapPopupInfo>
        <article>
          {popupInfo.name && <h3>{popupInfo.name}</h3>}
          <p>{popupInfo.situation}</p>
          <span>{popupInfo.createdAt}</span>
        </article>
        <button
          type="button"
          onClick={() => handleClick(popupInfo.publicationId)}
          title="Ver publicação"
        >
          <FiArrowRight size={22} />
        </button>
      </MapPopupInfo>
    </Popup>
  );
};

export { MapPopup };
