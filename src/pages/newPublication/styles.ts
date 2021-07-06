import styled from 'styled-components';

export const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid var(--gray-200);
  border-radius: 10px;
  margin: 1rem 0;

  div {
    height: 350px;
  }

  footer {
    background: var(--white);
    border-top: 1px solid var(--gray-200);
    border-radius: 0 0 9px 9px;
    color: var(--text-primary);
    padding: 0.7rem 0;
    text-align: center;
    width: 100%;
  }
`;
