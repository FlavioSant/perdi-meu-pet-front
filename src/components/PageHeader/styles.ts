import styled from 'styled-components';

interface HeaderProps {
  isMenuOpen: boolean;
}

export const HeaderContainer = styled.div`
  background: var(--gray-50);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2000;
`;

export const Header = styled.header<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60rem;
  width: 100%;
  height: 100%;
  position: relative;

  img {
    cursor: pointer;
    width: 100px;
    height: 70px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: 600;

    svg {
      margin-right: 0.3rem;
    }
  }

  @media (max-width: 720px) {
    padding: 0 0.3rem;

    nav {
      display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
    }
  }
`;

export const MenuButton = styled.button`
  background: transparent;
  border: 0;
  color: var(--text-secondary);
  display: none;
  font-size: 0;
  padding: 0.3rem;

  @media (max-width: 720px) {
    display: block;
  }
`;
