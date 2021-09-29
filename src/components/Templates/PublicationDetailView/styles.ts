import styled from 'styled-components';

export const AlertMessage = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1.25rem;
  background: var(--gray-100);
  border: 1px solid var(--gray-500);
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  margin-bottom: 3rem;
  padding: 1rem 2rem;
  width: 100%;

  p {
    color: var(--text-secondary);
    max-width: 700px;
    text-align: center;
  }
`;

export const PreviewImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
`;

export const Title = styled.h1`
  display: flex;
  align-items: flex-start;
  flex: 1;
  color: var(--text-primary);
  border-bottom: 1px solid var(--gray-200);
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-top: 2rem;

  article {
    line-height: 1.5;

    h2 {
      color: var(--text-primary);
    }

    p {
      color: var(--text-secondary);
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const MapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  margin: 2.375rem 0;
  width: 100%;
  height: 450px;

  p {
    color: var(--text-primary);
    font-size: 1.175rem;
    font-weight: 500;
  }

  .leaflet-container {
    border: 1px solid var(--gray-200);
    border-radius: 10px 10px 0 0;
  }

  footer {
    background: var(--white);
    border: 1px solid var(--gray-200);
    border-radius: 0 0 9px 9px;
    color: var(--text-primary);
    font-weight: 500;
    text-align: center;
    width: 100%;

    a {
      display: flex;
      justify-content: center;
      color: var(--text-primary);
      padding: 0.7rem 0;
      text-decoration: none;
      transition: color 0.2s;
      width: 100%;

      &:hover {
        color: var(--text-secondary);
      }
    }
  }
`;

export const AdvertiserInfo = styled.article`
  line-height: 2;
  margin-top: 1rem;

  h2 {
    color: var(--text-primary);
  }

  p {
    color: var(--text-secondary);
    font-weight: bold;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--green);
      font-weight: 600;
      text-decoration: none;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.85);
      }
    }
  }
`;
