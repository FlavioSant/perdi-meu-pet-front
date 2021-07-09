import styled, { css } from 'styled-components';

interface InputContainerProps {
  isErrored: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<InputContainerProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;

  label {
    color: var(--text-secondary);
    font-weight: 500;
  }

  div {
    display: flex;
    align-items: center;
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    color: var(--text-secondary);
    padding: 0 0.5rem;
    width: 100%;

    ${({ isErrored }) =>
      isErrored &&
      css`
        border-color: var(--red);
      `}

    ${({ isFilled }) =>
      isFilled &&
      css`
        border-color: var(--gray-200);
        color: var(--orange);
      `}

    ${({ isFocused }) =>
      isFocused &&
      css`
        border-color: var(--text-secondary);
      `}

    input {
      border: 0;
      color: var(--text-secondary);
      font-size: 1rem;
      height: 45px;
      outline: 0;
      padding: 0.5rem;
      width: 100%;
    }
  }
`;
