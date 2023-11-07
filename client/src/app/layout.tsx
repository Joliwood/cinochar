'use client';

import React from 'react';
import './globals.css';
import ReduxProvider from '../utils/reduxProvider';
import { UserContextProvider } from '../context/UserContext';
import Metadata from './metadata';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Metadata />
      <body>
        <UserContextProvider>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
