'use client';

import React from 'react';
import './globals.css';
import ParticipantContextProvider from '@/context/ParticipantContext';
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
          <ParticipantContextProvider>
            {children}
          </ParticipantContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
