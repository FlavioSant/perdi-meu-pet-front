import { MenuItem } from '../MenuItem';

import { NavBarContainer, MenuList } from './styles';

interface Item {
  label: string;
  path: string;
}

interface MenuNavBarProps {
  items: Item[];
}

const MenuNavBar: React.FC<MenuNavBarProps> = ({ items }) => {
  return (
    <NavBarContainer>
      <MenuList>
        {items.map(item => (
          <MenuItem key={item.label} label={item.label} path={item.path} />
        ))}
      </MenuList>
    </NavBarContainer>
  );
};

export { MenuNavBar };
