import { ButtonProps } from '../../../types/components/button';
import { ButtonContainer } from './styles';

export const Button: React.FC<ButtonProps> = ({
  children,
  background,
  type,
  ...rest
}) => (
  <ButtonContainer type={type} background={background || 'orange'} {...rest}>
    {children}
  </ButtonContainer>
);
