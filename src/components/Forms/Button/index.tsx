import { ButtonHTMLAttributes } from 'react';

import { ButtonContainer } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: 'blue' | 'green' | 'orange' | 'red';
  type: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  styleType,
  type,
  ...rest
}) => (
  <ButtonContainer type={type} styleType={styleType || 'orange'} {...rest}>
    {children}
  </ButtonContainer>
);
