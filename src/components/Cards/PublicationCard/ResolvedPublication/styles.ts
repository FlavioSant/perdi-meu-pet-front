import styled from 'styled-components';

export const ResolvedPublicationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  background: var(--green-medium);
  border-radius: 5px;
  color: var(--green);
  padding: 1rem;

  p {
    font-size: 1.15rem;
    font-weight: bold;
  }

  @media (max-width: 720px) {
    margin-top: 1rem;
    width: 100%;
  }
`;
