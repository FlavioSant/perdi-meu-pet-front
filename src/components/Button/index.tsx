import { ButtonHTMLAttributes } from 'react';

import { ButtonContainer } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: 'blue' | 'green' | 'orange' | 'red';
  type: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  styleType,
  type,
  ...rest
}) => {
  return (
    <ButtonContainer type={type} styleType={styleType || 'orange'} {...rest}>
      {children}
    </ButtonContainer>
  );
};

export { Button };
