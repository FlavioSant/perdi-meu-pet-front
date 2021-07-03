import styled from 'styled-components';

export const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-left: 1rem;

  @media (max-width: 1080px) {
    padding-left: 0.5rem;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  height: 100%;
`;
