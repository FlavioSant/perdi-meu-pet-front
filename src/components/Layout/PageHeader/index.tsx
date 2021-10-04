import Image from 'next/image';
import Router from 'next/router';
import { useState } from 'react';

import { useAuth } from '../../../hooks/auth';
import { FiLogIn, FiLogOut, FiMenu, FiUser } from 'react-icons/fi';

import { MenuItem } from '../../Menu/MenuItem';
import { MenuNavBar } from '../../Menu/MenuNavBar';
import { ActionLink } from '../../Utilities/ActionLink';

import { HeaderContainer, Header, MenuButton, UserInfo } from './styles';

export const PageHeader: React.FC = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderContainer>
      <Header isMenuOpen={isMenuOpen}>
        <figure>
          <Image
            src="/logo.svg"
            alt="Perdi Meu Pet"
            title="Perdi Meu Pet"
            onClick={() => Router.push('/')}
            width={100}
            height={70}
          />
        </figure>

        <MenuNavBar>
          <MenuItem label="Inicio" path="/" />
          <MenuItem label="Criar Publicação" path="/publication/new" />
          <MenuItem label="Buscar Publicação" path="/publication/search" />
          <MenuItem label="Minhas Publicações" path="/publication/me" />
        </MenuNavBar>

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
