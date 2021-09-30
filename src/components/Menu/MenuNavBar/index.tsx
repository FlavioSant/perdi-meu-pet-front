import { NavBarContainer, MenuList } from './styles';

export const MenuNavBar: React.FC = ({ children }) => (
  <NavBarContainer>
    <MenuList>{children}</MenuList>
  </NavBarContainer>
);
