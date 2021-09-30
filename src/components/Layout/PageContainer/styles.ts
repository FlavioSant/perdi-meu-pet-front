import styled from 'styled-components';

export const Container = styled.section`
  background: var(--gray-100);
  border: 1px solid var(--gray-500);
  border-radius: 10px;
  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.15);
  margin-top: 2rem;
  padding: 1rem 1.5rem;

  > div {
    padding: 0 0.5rem;
  }

  @media (max-width: 720px) {
    padding: 1rem;
  }
`;

export const Description = styled.div`
  border-bottom: 1px solid var(--orange);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  width: 100%;

  h2 {
    color: var(--text-primary);
    font-weight: 500;
    text-align: start;
  }
`;
