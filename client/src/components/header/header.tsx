'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';

import { HeaderLinksBig, HeaderLinksSmall } from '#components';

import { userInfosState } from '#store';

const Header = () => {
  const userInfos = useRecoilValue(userInfosState);

  return (
    <header className="fixed top-0 w-screen p-4 shadow-sm z-10 bg-[#ffffffe5]">
      <div className="flex-none">
        <nav className="flex items-center justify-between">
          <div className="font-semibold text-xl">Cinochar</div>
          <HeaderLinksSmall name={userInfos.name} />
          <HeaderLinksBig name={userInfos.name} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
