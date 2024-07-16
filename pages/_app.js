import React from 'react';
import { Layout } from '../components';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { StateContextProvider } from '../context/StateContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <StateContextProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContextProvider>
  );
};

export default MyApp;