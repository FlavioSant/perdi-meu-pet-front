import Router from 'next/router';
import { useState } from 'react';

import { useAuth } from '../../../hooks/auth';
import { FiLogIn, FiLogOut, FiMenu, FiUser } from 'react-icons/fi';

import { MenuNavBar } from '../../Menu/MenuNavBar';
import { ActionLink } from '../../Utilities/ActionLink';

import { HeaderContainer, Header, MenuButton, UserInfo } from './styles';

export const PageHeader: React.FC = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Header isMenuOpen={isMenuOpen}>
        <img
          src="logo.svg"
          alt="Perdi Meu Pet"
          title="Perdi Meu Pet"
          onClick={() => Router.push('/')}
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
          <ActionLink
            href="/signIn"
            label="Entrar"
            icon={FiLogIn}
            width="160px"
          />
        )}

        <MenuButton type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FiMenu size={24} />
        </MenuButton>
      </Header>
    </HeaderContainer>
  );
};
