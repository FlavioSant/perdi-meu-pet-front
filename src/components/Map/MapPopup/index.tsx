import { useRouter } from 'next/router';
import { useCallback } from 'react';

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

const MapPopup: React.FC<MapPopupProps> = ({ popupInfo }) => {
  const router = useRouter();

  const handleClick = useCallback((publicationId: string) => {
    router.push({
      pathname: '/publicationDetail',
      query: {
        publicationId,
      },
    });
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
          <p>{popupInfo.category}</p>
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
