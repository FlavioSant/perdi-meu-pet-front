import { NextPage } from 'next';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import Router from 'next/router';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from '../contexts/AuthContext';
import { Loader } from '../components/Utilities/Loader';

import GlobalStyle from '../styles/global';
import 'react-toastify/dist/ReactToastify.css';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const [isLoader, setIsLoader] = useState(false);

  Router.events.on('routeChangeStart', () => setIsLoader(true));
  Router.events.on('routeChangeComplete', () => setIsLoader(false));

  return (
    <AuthProvider>
      <GlobalStyle />
      <ToastContainer />
      <Head>
        <title>Perdi Meu Pet</title>
      </Head>
      {isLoader && <Loader />}
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
