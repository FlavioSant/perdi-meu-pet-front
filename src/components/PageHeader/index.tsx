import { useRouter } from 'next/router';
import { FiUser } from 'react-icons/fi';

import { MenuNavBar } from '../MenuNavBar';

import { HeaderContainer, Header } from './styles';

const PageHeader: React.FC = () => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <Header>
        <img
          src="logo.svg"
          alt="Perdi Meu Pet"
          title="Perdi Meu Pet"
          onClick={() => router.push('/')}
        />
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
          <FiUser size={22} />
          Entrar
        </button>
      </Header>
    </HeaderContainer>
  );
};

export { PageHeader };
