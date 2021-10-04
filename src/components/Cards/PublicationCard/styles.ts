import styled, { css } from 'styled-components';

interface PublicationContainerProps {
  isResolved: boolean;
}

export const PublicationCardContainer = styled.div<PublicationContainerProps>`
  display: flex;
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

  @media (max-width: 720px) {
    flex-direction: column;

    a {
      margin-top: 1rem;
      width: 100%;
    }
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

  @media (max-width: 425px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
