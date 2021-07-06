import styled from 'styled-components';

export const Container = styled.div`
  background: var(--gray-100);
  box-shadow: 2px 6px 15px rgba(0, 0, 0, 0.15);
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
`;

export const Description = styled.div`
  border-bottom: 1px solid var(--orange);
  line-height: 1.5;
  margin-bottom: 1.5rem;
  width: 100%;

  h2 {
    color: var(--text-primary);
    text-align: start;
  }
`;
