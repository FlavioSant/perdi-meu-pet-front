import Link from 'next/link';

import { MenuItemContainer } from './styles';

interface MenuItemProps {
  label: string;
  path: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, path }) => {
  return (
    <MenuItemContainer>
      <Link href={path}>
        <a title={label}>{label}</a>
      </Link>
    </MenuItemContainer>
  );
};

export { MenuItem };
