import { FiTrash2 } from 'react-icons/fi';

import { PreviewImageContainer } from './styles';

interface Image {
  name: string;
  url: string;
}

interface PreviewImageProps {
  image: Image;
  onRemove?: () => void;
}

export const PreviewImages: React.FC<PreviewImageProps> = ({
  image,
  onRemove,
}) => (
  <PreviewImageContainer>
    <figure>
      <img src={image.url} alt={image.name} />
      {onRemove && (
        <button onClick={onRemove} type="button" title="Remover">
          <FiTrash2 size={18} />
        </button>
      )}
    </figure>
  </PreviewImageContainer>
);
