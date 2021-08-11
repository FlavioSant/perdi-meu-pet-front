import styled, { css } from 'styled-components';

interface SearchDropdownContainerProps {
  isDrop: boolean;
}

export const SearchDropdownContainer = styled.div<SearchDropdownContainerProps>`
  position: absolute;
  top: -63px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  z-index: 1000;
  transition: top 0.3s;

  ${({ isDrop }) =>
    isDrop &&
    css`
      top: 1.25rem !important;
    `}

  form {
    display: grid;
    grid-template-columns: repeat(4, 1fr) 3rem 3rem;
    background: var(--gray-100);
    border: 1px solid var(--gray-500);
    border-radius: 8px 8px 8px 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    gap: 1rem;
    flex: 13;
    padding: 0.5rem;
  }

  button.dropButton {
    background: var(--orange);
    border-radius: 0 0 5px 5px;
    color: var(--white);
    padding: 0.3rem 0.5rem;
    height: initial;
    width: 160px;
  }

  @media (max-width: 720px) {
    top: -163px;

    form {
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }
  }
`;
