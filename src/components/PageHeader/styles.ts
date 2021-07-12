import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background: var(--gray-50);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 60rem;
  width: 100%;
  height: 100%;

  img {
    cursor: pointer;
    width: 100px;
    height: 70px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0;
    color: var(--text-secondary);
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem;
    transition: color 0.2s;

    svg {
      margin-right: 0.3rem;
    }

    &:hover {
      color: var(--text-sedondary-dark);
    }
  }

  @media (max-width: 720px) {
    padding: 0 1rem;

    ul {
      flex-direction: column;

      a {
        padding: 0.5rem 1rem;
      }
    }
  }
`;
