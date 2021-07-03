import styled from 'styled-components';

export const MenuItemContainer = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  &:hover {
    border-bottom: 4px solid var(--orange);
  }

  a {
    display: block;
    color: var(--text-secondary);
    font-weight: 400;
    padding: 1.6rem 1rem;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--text-primary);
    }
  }

  @media (max-width: 1080px) {
    a {
      padding: 1.2rem 0.5rem;
    }
  }
`;
