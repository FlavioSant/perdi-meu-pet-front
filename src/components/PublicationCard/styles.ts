import styled, { css } from 'styled-components';

interface PublicationContainerProps {
  isResolved: boolean;
}

export const PublicationCardContainer = styled.div<PublicationContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--gray-100);
  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--gray-500);
  border-radius: 10px;
  margin-top: 2rem;
  padding: 1rem;

  ${({ isResolved }) =>
    isResolved &&
    css`
      border-color: var(--green);
      background: var(--green-light);
    `}

  a {
    display: flex;
    align-items: center;
    align-self: flex-end;
    gap: 0.5rem;
    background-color: var(--green-light);
    color: var(--green);
    border: 1px solid var(--green);
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem;
    text-decoration: none;
    transition: background 0.2s;

    &:hover {
      background-color: var(--green-medium);
    }
  }

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

export const ResolvedPublication = styled.div`
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
