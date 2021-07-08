import styled from 'styled-components';

export const InputFileContainer = styled.div`
  display: flex;
  background: var(--orange-light);
  border-radius: 5px;
  border: 1px solid var(--orange);
  flex: 1;
  height: 45px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--orange-medium);
  }

  input[type='file'] {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--orange);
    cursor: pointer;
    font-weight: 700;
    font-size: 1rem;
    padding: 1rem 0.3rem;
    width: 100%;
  }
`;
