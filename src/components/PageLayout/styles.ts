import styled from 'styled-components';

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr 50px;

  main {
    margin: 2rem auto;
    max-width: 60rem;
    width: 100%;
  }

  @media (max-width: 960px) {
    main {
      padding: 0 1rem;
    }
  }

  @media (max-width: 720px) {
    grid-template-rows: 160px 1fr 50px;

    main {
      margin: 1rem auto;
    }
  }
`;
