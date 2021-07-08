import styled from 'styled-components';

export const PreviewImageContainer = styled.div`
  figure {
    background: var(--gray-200);
    border: 1px solid var(--gray-500);
    border-radius: 5px;
    overflow: hidden;
    width: 13rem;
    height: 11.25rem;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    button {
      background: rgba(255, 215, 215, 0.65);
      border: 0;
      border-radius: 50%;
      color: var(--red);
      font-size: 0;
      padding: 0.3rem;
      position: absolute;
      top: 2px;
      right: 2px;
      transition: background 0.2s;

      &:hover {
        background: var(--red-medium);
      }
    }
  }
`;
