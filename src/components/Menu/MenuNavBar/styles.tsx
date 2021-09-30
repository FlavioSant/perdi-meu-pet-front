import styled from 'styled-components';

export const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-left: 1rem;
  z-index: 2000;

  @media (max-width: 768px) {
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    padding: 0;
    position: absolute;
    top: 82px;
    left: 0;
    width: 100%;
    height: initial;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    flex: 1;
  }
`;
