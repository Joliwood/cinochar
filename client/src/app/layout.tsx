'use client';

import React from 'react';
import {
  RecoilRoot,
} from 'recoil';

import './globals.css';

import Metadata from './metadata';

import type { Props } from '#types';

export default function RootLayout({
  children,
}: {
  children: Props | any
}) {
  return (
    <html lang="en">
      <Metadata />
      <body>
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </body>
    </html>
  );
}
