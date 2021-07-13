import styled from 'styled-components';

export const NoPublicationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 4rem;

  img {
    width: 12rem;
    height: 12.25rem;
  }

  h2 {
    color: var(--text-primary);
    margin-top: 1rem;
  }

  p {
    color: var(--text-secondary-dark);
  }
`;
