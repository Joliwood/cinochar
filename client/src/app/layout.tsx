'use client';

import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import ReduxProvider from '../utils/reduxProvider';
import { UserContextProvider } from '../context/UserContext';
import Metadata from './metadata';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Metadata />
      <body className={inter.className}>
        <UserContextProvider>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
