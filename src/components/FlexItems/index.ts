import styled, { css } from 'styled-components';

interface FlexItemProps {
  hasMargin?: boolean;
}

export const FlexItems = styled.div<FlexItemProps>`
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;

  ${({ hasMargin }) =>
    hasMargin &&
    css`
      margin-top: 1rem;
    `}

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
