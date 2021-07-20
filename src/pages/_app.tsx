import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import { ToastContainer } from 'react-toastify';

import GlobalStyle from '../styles/global';
import 'react-toastify/dist/ReactToastify.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <Head>
        <title>Perdi Meu Pet</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
