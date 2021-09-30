import styled from 'styled-components';

import { ButtonProps, typesVariations } from '../../../types/components/button';

export const ActionLinkContainer = styled.a<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 11.5px 1rem;
  transition: filter 0.2s;
  width: ${props => props.width};
  height: ${props => props.height};

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    transform: translate(2px, 3px);
  }

  ${({ background }) => typesVariations[background]}
`;
