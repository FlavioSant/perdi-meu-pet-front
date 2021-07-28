import { GetServerSideProps, NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';

import { parseCookies } from 'nookies';

import { Publication } from '../@types/publication';
import { api } from '../services/api';
import { getCoords } from '../utils/getCoords';
import { errorToast, warnToast } from '../utils/toast';

import { PublicationsMap } from '../components/Map';

import { Aside, Container, MainContent } from '../styles/Home';
import { PageHeader } from '../components/PageHeader';

const Home: NextPage = () => {
  const [publications, setPublications] = useState<Publication[]>([]);

  const getPublications = useCallback(async () => {
    try {
      const { latitude, longitude } = await getCoords();

      const { data } = await api.post('search', { latitude, longitude });

      setPublications(data);
    } catch (err) {
      if (err instanceof GeolocationPositionError) {
        warnToast({
          message: 'Não foi possível obter a localização.',
          options: { position: 'bottom-center' },
        });
        return;
      }

      errorToast({
        message: 'Erro ao buscar publcações.',
        options: { position: 'bottom-center' },
      });

      console.error({ err });
    }
  }, []);

  useEffect(() => {
    getPublications();
  }, []);

  return (
    <Container>
      <Aside>
        <img src="/logo.svg" alt="Perdi Meu Pet" title="Perdi Meu Pet" />
        <h1>Clique em uma publicação no mapa</h1>
        <p>Ajude nossos amiguinhos perdidos e desamparados.</p>
      </Aside>

      <PageHeader />

      <MainContent>
        <PublicationsMap
          center={{ lat: -22.3145293, lng: -49.0659743 }}
          publications={publications}
          hasPopup
        />
      </MainContent>
    </Container>
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

export default Home;
