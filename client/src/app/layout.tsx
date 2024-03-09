'use client';

import React from 'react';

import './globals.css';
import { UserContextProvider } from '../context/UserContext';

import Metadata from './metadata';

import type { Props } from '#types';

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
