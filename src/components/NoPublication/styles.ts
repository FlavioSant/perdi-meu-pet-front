import styled from 'styled-components';

export const NoPublicationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 4rem;

  article {
    display: flex;
    align-items: center;
    flex-direction: column;

    h2 {
      color: var(--text-primary);
      margin-top: 1rem;
    }

    p {
      color: var(--text-secondary-dark);
    }
  }
`;
