/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import ReduxProvider from '../utils/reduxProvider';
import UserContext from '../context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cinochar',
  description: 'Trouve le film !',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo192.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/logo192.png',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [pseudo, setPseudo] = useState<string>('');

  async function getUser() {
    try {
      const storedToken: string | null = localStorage.getItem('token');

      // Decode the JWT to access user information
      const decodedToken: any = jwt_decode(storedToken!);

      // const response = await axios.post('/api/getUser', {
      //   id: decodedToken.userId,
      // });

      // console.log(decodedToken.pseudo);

      return setPseudo(decodedToken.pseudo);
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContext.Provider value={{ pseudo }}>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </UserContext.Provider>
      </body>
    </html>
  );
}
