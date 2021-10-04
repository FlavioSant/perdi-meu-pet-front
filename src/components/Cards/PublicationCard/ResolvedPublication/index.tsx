import { Situation } from '../../../../types/publication';

import { ResolvedPublicationContainer } from './styles';

interface ResolvedPublicationProps {
  situation: Situation;
}

export const ResolvedPublication: React.FC<ResolvedPublicationProps> = ({
  situation,
}) => (
  <ResolvedPublicationContainer>
    <p>
      {situation === 'encontrado'
        ? 'Resgatado'
        : situation === 'desaparecido'
        ? 'Encontrado'
        : 'Adotado'}
    </p>
  </ResolvedPublicationContainer>
);
