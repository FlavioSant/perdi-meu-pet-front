import { FiTrash2 } from 'react-icons/fi';

import { PreviewImageContainer } from './styles';

interface Image {
  name: string;
  url: string;
}

interface PreviewImageProps {
  image: Image;
  onRemove: () => void;
}

const PreviewImages: React.FC<PreviewImageProps> = ({ image, onRemove }) => {
  return (
    <PreviewImageContainer>
      <figure>
        <img src={image.url} alt={image.name} />
        <button onClick={onRemove} type="button" title="Remover">
          <FiTrash2 size={18} />
        </button>
      </figure>
    </PreviewImageContainer>
  );
};

export { PreviewImages };
