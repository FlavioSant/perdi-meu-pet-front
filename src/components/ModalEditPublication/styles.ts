import styled from 'styled-components';

export const FormButtons = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;

  button {
    flex: initial;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    margin-top: 2rem;

    button {
      flex: 1;

      &:first-child {
        order: 1;
      }
    }
  }
`;
