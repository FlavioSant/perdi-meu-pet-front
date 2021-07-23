import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { Publication } from '../../@types/publication';
import { Button } from '../../components/Button';

import { PublicationsMap } from '../../components/Map';
import { NoPublication } from '../../components/NoPublication';
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

interface PublicationDetailProps {
  publication: Publication;
}

const PublicationDetail: NextPage<PublicationDetailProps> = ({
  publication,
}) => {
  const router = useRouter();

  if (!publication) {
    return (
      <PageLayout>
        <NoPublication title="Publicação não encontrada..." />
        <Button
          type="button"
          onClick={() => router.back()}
          style={{ margin: '2rem auto', width: 250 }}
        >
          Voltar
        </Button>
      </PageLayout>
    );
  }

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
          <PreviewImages image={{ name: '', url: '' }} />
        </PreviewImagesContainer>

        {publication.nome && <Title>{publication.nome}</Title>}

        <InfoContainer>
          <SituationCard situation="adocao" />
          <article>
            <h2>
              Porte: {publication.porte} - Sexo do Animal:{' '}
              {publication.sexo || ''}
            </h2>
            <p>{publication.observacoes || ''}</p>
          </article>
        </InfoContainer>

        <MapContainer>
          <p>Última localização</p>
          <PublicationsMap
            center={{ lat: publication.latitude, lng: publication.longitude }}
            publications={[publication]}
          />
          <footer>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${publication.latitude},${publication.longitude}`}
            >
              Ver rotas no google maps
            </a>
          </footer>
        </MapContainer>

        <Title>Entre em Contato</Title>

        <AdvertiserInfo>
          <h2>{publication.usuario.nome}</h2>
          <p>E-mail: {publication.usuario.email}</p>
          <a
            href={`mailto:${publication.usuario.email}?subject=Estou%20Entrando%20em%20Contato%20Atraves%20do%20Perdi%20Meu%20Pet`}
          >
            Entre em Contato com o Anúnciante
          </a>
        </AdvertiserInfo>
      </PageContainer>
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['perdi-meu-pet']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default PublicationDetail;
