import Image from 'next/image';

import { Situation } from '../../../types/publication';

import { SituationCardContainer } from './styles';

interface SituationCardProps {
  situation: Situation;
}

const situationImgUrlTypes = {
  desaparecido: '/sad-dog.svg',
  encontrado: '/happy-animals.svg',
  adocao: '/adoption.svg',
};

export const SituationCard: React.FC<SituationCardProps> = ({ situation }) => (
  <SituationCardContainer>
    <figure>
      <Image
        src={situationImgUrlTypes[situation]}
        alt={situation}
        width={70}
        height={70}
      />
    </figure>
    <span>{situation === 'adocao' ? 'adoção' : situation}</span>
  </SituationCardContainer>
);
