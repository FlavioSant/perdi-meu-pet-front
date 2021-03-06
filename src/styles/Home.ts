import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 25% 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas: 'aside nav' 'aside main';
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas: 'nav' 'main';

    aside {
      display: none;
    }
  }
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: linear-gradient(166.62deg, #ff826b 0%, #ff4c2c 100%);
  grid-area: aside;
  color: var(--white);
  padding: 1rem 2rem;

  img {
    width: 14.375rem;
    height: 8.125rem;
    margin-left: -2rem;
  }

  h1 {
    line-height: 1.4;
    margin-top: 8rem;
  }

  p {
    margin-top: 2rem;
    max-width: 200px;
  }

  @media (max-width: 1080px) {
    padding: 1rem 1.5rem;

    h1 {
      font-size: 1.8rem;
    }
  }
`;

export const MainContent = styled.main`
  grid-area: main;
  position: relative;
`;

export const Register = styled.div`
  background: var(--orange-light);
  border: 1px solid var(--orange);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  color: var(--orange);
  min-width: 320px;
  padding: 0.375rem 1rem;
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;

  a {
    color: var(--orange);
    font-weight: bold;
  }
`;
