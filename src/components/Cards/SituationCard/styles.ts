import styled from 'styled-components';

export const SituationCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--orange-light);
  border: 1px solid var(--orange);
  border-radius: 5px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.25);
  color: var(--orange);
  padding: 0.5rem 2rem;
  width: 12rem;

  span {
    font-weight: 600;
    text-transform: capitalize;
  }

  figure {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--white);
    border: 1px solid var(--orange);
    border-radius: 50%;
    width: 6rem;
    height: 6rem;
  }
`;
