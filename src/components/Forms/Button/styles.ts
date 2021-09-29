import styled from 'styled-components';

import { ButtonProps, typesVariations } from '../../../types/components/button';

export const ButtonContainer = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 0.5rem;

  border: 0;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.875rem 0;
  margin-top: ${props => props.marginTop};
  margin-bottom: ${props => props.marginBottom};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  width: ${props => props.width};
  height: ${props => props.height || '45px'};
  transition: background 0.2s;

  ${({ background }) => typesVariations[background]}

  &:active {
    transform: translate(1px, 1px);
  }
`;
