/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import React from 'react';

const App = ({ Component, pageProps }): JSX.Element => {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
