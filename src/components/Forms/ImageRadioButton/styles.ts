import styled from 'styled-components';

export const ImageRadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin: 1rem 0;

  input[type='radio'] {
    display: none;
  }

  input[type='radio']:checked ~ label {
    background: var(--orange);
    color: var(--white);
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: var(--orange-light);
    border: 1px solid var(--orange);
    border-radius: 5px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.25);
    color: var(--orange);
    cursor: pointer;
    padding: 0.5rem 2rem;
    transition: background 0.3s, color 0.3s, transform 0.2s;
    width: 12rem;

    &:hover {
      transform: scale(1.02);
    }

    span {
      font-weight: 600;
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
  }
`;
