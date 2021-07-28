import { useRouter } from 'next/router';
import { useState } from 'react';

import { FiMenu, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import { MenuNavBar } from '../MenuNavBar';

import { HeaderContainer, Header, MenuButton } from './styles';

const PageHeader: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Header isMenuOpen={isMenuOpen}>
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

        {isAuthenticated && (
          <div>
            <FiUser size={22} />
            <span>{user.nome}</span>
          </div>
        )}

        <MenuButton type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FiMenu size={24} />
        </MenuButton>
      </Header>
    </HeaderContainer>
  );
};

export { PageHeader };
