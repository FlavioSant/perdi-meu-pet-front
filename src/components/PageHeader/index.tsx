import { FiUser } from 'react-icons/fi';

import { MenuNavBar } from '../MenuNavBar';

import { HeaderContainer, Header } from './styles';

const PageHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <Header>
        <img src="logo.svg" alt="Perdi Meu Pet" title="Perdi Meu Pet" />
        <MenuNavBar
          items={[
            {
              label: 'Inicio',
              path: '#',
            },
            {
              label: 'Nova Publicação',
              path: '#',
            },
            {
              label: 'Buscar Publicação',
              path: '#',
            },
            {
              label: 'Minhas Publicações',
              path: '#',
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
