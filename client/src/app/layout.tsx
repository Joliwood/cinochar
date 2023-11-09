'use client';

import React from 'react';
import './globals.css';
import type { Props } from '@/@types';
import { UserContextProvider } from '../context/UserContext';
import Metadata from './metadata';

export default function RootLayout({
  children,
}: {
  children: Props
}) {
  return (
    <html lang="en">
      <Metadata />
      <body>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
