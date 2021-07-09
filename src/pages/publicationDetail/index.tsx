import { NextPage } from 'next';
import { PageContainer } from '../../components/PageContainer';

import { PageLayout } from '../../components/PageLayout';
import { PageTitle } from '../../components/PageTitle';
import { PreviewImages } from '../../components/PreviewImages';
import { SituationCard } from '../../components/SituationCard';

import {
  AdvertiserInfo,
  AlertMessage,
  InfoContainer,
  MapContainer,
  PreviewImagesContainer,
  Title,
} from './styles';

const fakeImages = [
  {
    name: 'random1',
    url: 'https://source.unsplash.com/random',
  },
  {
    name: 'random2',
    url: 'https://source.unsplash.com/random',
  },
  {
    name: 'random3',
    url: 'https://source.unsplash.com/random',
  },
  {
    name: 'random4',
    url: 'https://source.unsplash.com/random',
  },
];

const PublicationDetail: NextPage = () => {
  return (
    <PageLayout>
      <AlertMessage>
        <PageTitle title="Aviso importante" />
        <p>
          Este site não se responsabiliza por qualquer tipo de recompensa,
          transações bancárias, envios ou custódia informados no anúncio.
        </p>
      </AlertMessage>

      <PageContainer>
        <PreviewImagesContainer>
          {fakeImages.map((image, index) => (
            <PreviewImages key={index} image={image} />
          ))}
        </PreviewImagesContainer>

        <Title>Nome do Pet</Title>

        <InfoContainer>
          <SituationCard situation="adocao" />
          <article>
            <h2>Porte: Médio - Sexo do Animal: Macho</h2>
            <p>
              Animal desapareceu em bauru no período da tarde, com uma coleira
              branca.....
            </p>
          </article>
        </InfoContainer>

        <MapContainer>
          <p>Última localização</p>
          <div />
          <footer>Ver rotas no google maps</footer>
        </MapContainer>

        <Title>Entre em Contato</Title>

        <AdvertiserInfo>
          <h2>Nome do Anúnciante</h2>
          <p>E-mail: exemplo@exemplo.com</p>
          <a href="mailto:">Entre em Contato com o Anúnciante</a>
        </AdvertiserInfo>
      </PageContainer>
    </PageLayout>
  );
};

export default PublicationDetail;
