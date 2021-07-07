import styled from 'styled-components';

export const FlexItems = styled.div`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;

  & + div {
    margin-top: 1rem;
  }

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
