import { FaPaw } from 'react-icons/fa';

import { LoaderContainer } from './styles';

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <FaPaw size={82} color="#FF6043" />
    </LoaderContainer>
  );
};

export { Loader };
