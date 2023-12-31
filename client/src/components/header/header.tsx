'use client';

import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import HeaderLinksBig from './headerLinks.big';
import HeaderLinksSmall from './headerLinks.small';
import type { UserContextType } from '../../@types';

function Header() {
  const { userInfos } = useContext<UserContextType>(UserContext);

  return (
    <header className="fixed top-0 w-screen p-4 shadow-sm z-10 bg-[#ffffffe5]">
      <div className="flex-none">
        <nav className="flex items-center justify-between">
          <div className="font-semibold text-xl">Cinochar</div>
          <HeaderLinksSmall pseudo={userInfos.pseudo} />
          <HeaderLinksBig pseudo={userInfos.pseudo} />
        </nav>
      </div>
    </header>
  );
}

export default Header;
