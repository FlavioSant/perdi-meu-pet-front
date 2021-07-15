import styled from 'styled-components';

export const MapPopupInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
  width: 100%;

  h3 {
    color: var(--text-primary);
    font-size: 1.25rem;
  }

  p {
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 500;
    text-transform: capitalize;
    margin: 0;
  }

  span {
    color: var(--text-secondary);
    font-weight: 500;
    margin-top: 0.3rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--orange);
    border: 0;
    border-radius: 5px;
    color: var(--white);
    padding: 0.675rem;
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
