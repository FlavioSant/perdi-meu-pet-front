import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
`;

export const ModalFrame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--white);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
  padding: 1rem 0 0;
  width: 18.75rem;

  svg {
    color: var(--orange);
  }

  h2 {
    color: var(--text-primary);
    margin: 1rem 0;
  }

  p {
    color: var(--text-secondary);
    word-break: break-all;
    max-width: 90%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--orange-light);
    border: 0;
    border-top: 1px solid var(--orange);
    border-radius: 0 0 5px 5px;
    color: var(--orange);
    font-size: 1rem;
    font-weight: 500;
    margin-top: 1rem;
    padding: 0.3rem;
    width: 100%;
    transition: background 0.2s;

    &:hover {
      background: var(--orange-medium);
    }
  }
`;
