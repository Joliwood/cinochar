/* eslint-disable react/jsx-props-no-spreading */

import { RecoilRoot } from 'recoil';
import React from 'react';
import { type AppProps } from 'next/app';

import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
