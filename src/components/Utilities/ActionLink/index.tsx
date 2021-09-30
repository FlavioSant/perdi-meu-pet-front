import Link from 'next/link';

import { ActionLinkProps } from '../../../types/components/actionLink';

import { ActionLinkContainer } from './styles';

export const ActionLink: React.FC<ActionLinkProps> = ({
  label,
  icon: Icon,
  background,
  width,
  height,
  ...rest
}) => (
  <Link {...rest}>
    <ActionLinkContainer
      background={background || 'orange'}
      title={label}
      width={width}
      height={height}
    >
      {Icon && <Icon size={22} />}
      {label}
    </ActionLinkContainer>
  </Link>
);
