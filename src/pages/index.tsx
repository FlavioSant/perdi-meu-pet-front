import { NextPage } from 'next';

import { FiUser } from 'react-icons/fi';

import { MenuNavBar } from '../components/MenuNavBar';
import { PublicationsMap } from '../components/Map';

import { Aside, Container, Header, MainContent } from '../styles/Home';

const Home: NextPage = () => {
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
        <button type="button" title="Entrar">
          <FiUser size={24} />
          Entrar
        </button>
      </Header>
      <MainContent>
        <PublicationsMap
          center={{ lat: -22.3145293, lng: -49.0659743 }}
          defaultZoom={13}
          publications={[
            {
              id: 1,
              createdAt: '14/07/2021',
              name: 'Nome do Pet',
              situation: 'desaparecido',
              lat: -22.3145293,
              lng: -49.0659743,
            },
          ]}
        />
      </MainContent>
    </Container>
  );
};

export default Home;
