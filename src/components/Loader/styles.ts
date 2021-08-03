import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const LoaderContainer = styled.div`
  background: rgba(23, 3, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 2500;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: ${pulse} 800ms linear infinite;
  }
`;
