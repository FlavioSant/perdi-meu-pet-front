import styled, { css } from 'styled-components';

interface ButtonProps {
  styleType: 'blue' | 'green' | 'orange' | 'red';
}

const buttonTypeVariations = {
  blue: css`
    background-color: var(--blue-light);
    border: 1px solid var(--blue);
    color: var(--blue);

    &:hover {
      background-color: var(--blue-medium);
    }
  `,
  green: css`
    background-color: var(--green-light);
    border: 1px solid var(--green);
    color: var(--green);

    &:hover {
      background-color: var(--green-medium);
    }
  `,
  orange: css`
    background-color: var(--orange-light);
    border: 1px solid var(--orange);
    color: var(--orange);

    &:hover {
      background-color: var(--orange-medium);
    }
  `,
  red: css`
    background-color: var(--red-light);
    border: 1px solid var(--red);
    color: var(--red);

    &:hover {
      background-color: var(--red-medium);
    }
  `,
};

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
  height: 45px;
  transition: background 0.2s;

  ${({ styleType }) => buttonTypeVariations[styleType]}
`;
