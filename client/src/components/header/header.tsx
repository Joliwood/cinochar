'use client';

import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import HeaderLinksBig from './headerLinks.big';
import HeaderLinksSmall from './headerLinks.small';

function Header() {
  const { pseudo } = useContext(UserContext);

  return (
    <header className="fixed w-screen p-4 shadow-sm z-10 bg-[#ffffffe5]">
      <div className="flex-none">
        <nav className="flex items-center justify-between">
          <div className="font-semibold text-xl">Cinochar</div>

          <HeaderLinksSmall pseudo={pseudo} />
          <HeaderLinksBig pseudo={pseudo} />

        </nav>
      </div>
    </header>
  );
}

export default Header;
