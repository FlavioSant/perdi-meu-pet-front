import { LinkProps } from 'next/link';
import { IconBaseProps } from 'react-icons/lib';

import { ButtonBackgroundVariants } from './button';

export interface ActionLinkProps extends LinkProps {
  label: string;
  icon?: React.ComponentType<IconBaseProps>;
  background?: ButtonBackgroundVariants;
  width?: string;
  height?: string;
}
