import styled from 'styled-components';

export const PublicationCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--gray-100);
  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--gray-500);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 2rem;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    border-radius: 10px;
    object-fit: cover;
    width: 11.25rem;
    height: 9.375rem;
  }

  h2 {
    color: var(--text-primary);
  }

  p {
    color: var(--text-primary);
    font-weight: 500;

    span {
      color: var(--text-secondary-dark);
      text-transform: capitalize;
    }
  }

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 140px;

  button {
    padding: 0.5rem;
    text-transform: capitalize;
  }

  @media (max-width: 720px) {
    margin-top: 1.5rem;
    width: 100%;
  }
`;
