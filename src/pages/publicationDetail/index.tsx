import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { FiMail } from 'react-icons/fi';
import { ImWhatsapp } from 'react-icons/im';

import { Publication } from '../../types/publication';
import { auth } from '../../middleware/auth';
import { getAPIClient } from '../../services/apiClient';
import { serverSideHandler } from '../../functions/serverSideHandler';

import { Button } from '../../components/Forms/Button';
import { PublicationsMap } from '../../components/Map';
import { FlexItems } from '../../components/FlexItems';
import { PageTitle } from '../../components/Layout/PageTitle';
import { NoPublication } from '../../components/NoPublication';
import { PreviewImages } from '../../components/PreviewImages';
import { PageLayout } from '../../components/Layout/PageLayout';
import { SituationCard } from '../../components/Cards/SituationCard';
import { PageContainer } from '../../components/Layout/PageContainer';

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
        {publication.anexos.length > 0 && (
          <PreviewImagesContainer>
            {publication.anexos.map(anexo => (
              <PreviewImages
                key={anexo}
                image={{
                  name: publication.nome || publication.categoria,
                  url: `${process.env.API_URL}/anexos/${anexo}`,
                }}
              />
            ))}
          </PreviewImagesContainer>
        )}

        {publication.nome && <Title>{publication.nome}</Title>}

        <InfoContainer>
          <SituationCard situation={publication.situacao} />
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
            hasPopup={false}
            hasRadius
          />
          <footer>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${publication.latitude},${publication.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver rotas no google maps
            </a>
          </footer>
        </MapContainer>

        <Title>Entre em Contato</Title>

        <AdvertiserInfo>
          <h2>{publication.usuario.nome}</h2>
          <FlexItems style={{ gap: '2rem', alignItems: 'flex-start' }}>
            <p>
              E-mail:
              <h3>{publication.usuario.email}</h3>
              <a
                href={`mailto:${publication.usuario.email}?subject=Estou%20Entrando%20em%20Contato%20Atraves%20do%20Perdi%20Meu%20Pet`}
                title="Entrar em contato por e-mail"
                style={{ color: '#3C83EE' }}
              >
                <FiMail size={22} /> Enviar e-mail
              </a>
            </p>

            <p>
              Celular:{' '}
              <h3>
                {publication.celular ? publication.celular : 'Não informado'}
              </h3>
              {publication.celular && (
                <a
                  href={`https://api.whatsapp.com/send?l=pt_BR&phone=55${publication.celular}
                        &text=Estou%20entrando%20em%20contato%20através%20do%20Perdi%20Meu%20Pet`}
                  title="Entrar em contato por whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImWhatsapp size={22} />
                  Entrar em contato com anúnciante
                </a>
              )}
            </p>
          </FlexItems>
        </AdvertiserInfo>
      </PageContainer>
    </PageLayout>
  );
};

export const getServerSideProps = serverSideHandler(auth(), async ctx => {
  const { publicationId } = ctx.query;

  const { data: publication } = await getAPIClient(ctx).get(
    `/publicacoes/${publicationId}`,
  );

  return {
    props: {
      publication,
    },
  };
});

export default PublicationDetail;
