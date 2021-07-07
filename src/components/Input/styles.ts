import styled, { css } from 'styled-components';

interface InputContainerProps {
  isErrored: boolean;
}

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;

  label {
    color: var(--text-secondary);
    font-weight: 500;
  }

  input {
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    color: var(--text-secondary);
    font-size: 1rem;
    height: 45px;
    outline: 0;
    padding: 0.5rem;
    width: 100%;

    ${({ isErrored }) =>
      isErrored &&
      css`
        border-color: var(--red);
      `}

    &:focus {
      border-color: var(--text-secondary);
    }
  }
`;
