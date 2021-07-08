import styled, { css } from 'styled-components';

interface TextareaContainerProps {
  isErrored: boolean;
}

export const TextareaContainer = styled.div<TextareaContainerProps>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  flex: 1;

  label {
    color: var(--text-secondary);
    font-weight: 500;
  }

  textarea {
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    color: var(--text-secondary);
    font-size: 1rem;
    min-height: 90px;
    max-height: 180px;
    outline: 0;
    padding: 0.5rem;
    resize: vertical;
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
