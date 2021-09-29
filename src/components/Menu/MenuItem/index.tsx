import Link from 'next/link';

import { MenuItemContainer } from './styles';

interface MenuItemProps {
  label: string;
  path: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label, path }) => (
  <MenuItemContainer>
    <Link href={path}>
      <a title={label}>{label}</a>
    </Link>
  </MenuItemContainer>
);
