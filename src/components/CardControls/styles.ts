import styled from 'styled-components';

export const ControlsContainer = styled.div`
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
