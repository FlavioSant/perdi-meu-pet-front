import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import GlobalStyle from '../styles/global';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Perdi Meu Pet</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
