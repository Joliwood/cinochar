'use client';

import React from 'react';

import HeaderLinksBig from './headerLinks.big';
import HeaderLinksSmall from './headerLinks.small';

const Header = () => {
  return (
    <header className="fixed top-0 w-screen p-4 shadow-sm z-10 bg-[#ffffffe5]">
      <div className="flex-none">
        <nav className="flex items-center justify-between">
          <div className="font-semibold text-xl">Cinochar</div>
          <HeaderLinksSmall />
          <HeaderLinksBig />
        </nav>
      </div>
    </header>
  );
};

export default Header;
