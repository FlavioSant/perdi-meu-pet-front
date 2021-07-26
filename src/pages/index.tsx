import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { FiUser } from 'react-icons/fi';

import { Publication } from '../@types/publication';
import { api } from '../services/api';
import { getCoords } from '../utils/getCoords';
import { errorToast, warnToast } from '../utils/toast';

import { MenuNavBar } from '../components/MenuNavBar';
import { PublicationsMap } from '../components/Map';

import { Aside, Container, Header, MainContent } from '../styles/Home';
import { useAuth } from '../hooks/auth';

const Home: NextPage = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
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
        {isAuthenticated ? (
          <div>
            <FiUser size={24} />
            <span>{user.nome}</span>
          </div>
        ) : (
          <button
            type="button"
            title="Entrar"
            onClick={() => router.push('/signIn')}
          >
            <FiUser size={24} />
            Entrar
          </button>
        )}
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
