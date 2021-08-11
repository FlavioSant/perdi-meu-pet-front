import { useRouter } from 'next/router';
import { useState } from 'react';

import { FiLogIn, FiLogOut, FiMenu, FiUser } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import { Button } from '../Button';

import { MenuNavBar } from '../MenuNavBar';

import { HeaderContainer, Header, MenuButton, UserInfo } from './styles';

const PageHeader: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuth();
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
              label: 'Criar Publicação',
              path: '/createPublication',
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
          <UserInfo>
            <FiUser size={22} />
            <span>{user.nome}</span>
            <button
              type="button"
              className="signOutButton"
              title="Sair"
              onClick={signOut}
            >
              <FiLogOut size={22} />
            </button>
          </UserInfo>
        ) : (
          <Button
            type="button"
            onClick={() => router.push('/signIn')}
            style={{ maxWidth: '180px' }}
          >
            Entrar <FiLogIn size={22} />
          </Button>
        )}

        <MenuButton type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FiMenu size={24} />
        </MenuButton>
      </Header>
    </HeaderContainer>
  );
};

export { PageHeader };
