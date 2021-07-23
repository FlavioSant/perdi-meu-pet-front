import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { FiUser } from 'react-icons/fi';

import { Publication } from '../@types/publication';
import { api } from '../services/api';
import { getCoords } from '../utils/getCoords';
import { warnToast } from '../utils/toast';

import { MenuNavBar } from '../components/MenuNavBar';
import { PublicationsMap } from '../components/Map';

import { Aside, Container, Header, MainContent } from '../styles/Home';

const Home: NextPage = () => {
  const router = useRouter();
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
      <Header>
        <MenuNavBar
          items={[
            {
              label: 'Inicio',
              path: '/',
            },
            {
              label: 'Nova Publicação',
              path: '/newPublication',
            },
            {
              label: 'Buscar Publicação',
              path: '/findPublications',
            },
            {
              label: 'Minhas Publicações',
              path: '/myPublications',
            },
          ]}
        />
        <button
          type="button"
          title="Entrar"
          onClick={() => router.push('/signIn')}
        >
          <FiUser size={24} />
          Entrar
        </button>
      </Header>
      <MainContent>
        <PublicationsMap
          center={{ lat: -22.3145293, lng: -49.0659743 }}
          publications={publications}
        />
      </MainContent>
    </Container>
  );
};

export default Home;
