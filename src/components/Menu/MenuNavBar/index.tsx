import { MenuItem } from '../MenuItem';

import { NavBarContainer, MenuList } from './styles';

interface Item {
  label: string;
  path: string;
}

interface MenuNavBarProps {
  items: Item[];
}

export const MenuNavBar: React.FC<MenuNavBarProps> = ({ items }) => (
  <NavBarContainer>
    <MenuList>
      {items.map(item => (
        <MenuItem key={item.label} label={item.label} path={item.path} />
      ))}
    </MenuList>
  </NavBarContainer>
);
