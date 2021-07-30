import { Situation } from '../../@types/publication';

import { SituationCardContainer } from './styles';

interface SituationCardProps {
  situation: Situation;
}

const situationImgUrlTypes = {
  desaparecido: '/sad-dog.svg',
  encontrado: '/happy-animals.svg',
  adocao: '/adoption.svg',
};

const SituationCard: React.FC<SituationCardProps> = ({ situation }) => {
  return (
    <SituationCardContainer>
      <figure>
        <img src={situationImgUrlTypes[situation]} alt={situation} />
      </figure>
      <span>{situation === 'adocao' ? 'adoção' : situation}</span>
    </SituationCardContainer>
  );
};

export { SituationCard };
