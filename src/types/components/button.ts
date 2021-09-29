import { ButtonHTMLAttributes } from 'react';
import { css } from 'styled-components';

export type ButtonBackgroundVariants = 'blue' | 'green' | 'orange' | 'red';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  background?: ButtonBackgroundVariants;
  marginTop?: string;
  marginRight?: string;
  marginLeft?: string;
  marginBottom?: string;
  width?: string;
  height?: string;
}

export const typesVariations = {
  blue: css`
    background-color: var(--blue-light);
    border: 1px solid var(--blue);
    color: var(--blue);

    &:hover {
      background-color: var(--blue-medium);
    }
  `,
  green: css`
    background-color: var(--green-light);
    border: 1px solid var(--green);
    color: var(--green);

    &:hover {
      background-color: var(--green-medium);
    }
  `,
  orange: css`
    background-color: var(--orange-light);
    border: 1px solid var(--orange);
    color: var(--orange);

    &:hover {
      background-color: var(--orange-medium);
    }
  `,
  red: css`
    background-color: var(--red-light);
    border: 1px solid var(--red);
    color: var(--red);

    &:hover {
      background-color: var(--red-medium);
    }
  `,
};
