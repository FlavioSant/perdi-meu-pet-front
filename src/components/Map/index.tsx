import dynamic from 'next/dynamic';

export const PublicationsMap = dynamic(() => import('./PublicationsMap'), {
  ssr: false,
});

export const ClickableMap = dynamic(() => import('./ClickableMap'), {
  ssr: false,
});
