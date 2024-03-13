import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

import { handleLogout } from '#utils';
import { userInfosState } from '#store';

const HeaderLinksBig = (): JSX.Element => {
  const userInfos = useRecoilValue(userInfosState);
  const { name } = userInfos;

  const buttonsIfConnected = useMemo(() => {
    if (name) {
      return (
        <button type="button" className="flex items-center" onClick={handleLogout}>
          <Link className="btn" href="/" replace={false}>Se deconnecter</Link>
        </button>
      );
    }

    return (
      <>
        <button type="button" className="flex items-center">
          <Link className="btn" href="/login" replace={false}>Se connecter</Link>
        </button>

        <button type="button" className="flex items-center">
          <Link className="btn" href="/signup" replace={false}>S'enregistrer</Link>
        </button>
      </>
    );
  }, [name]);

  return (
    <ul className="menu menu-horizontal px-1 gap-3 py-0 hidden lg:flex">
      <button type="button" className="flex items-center">
        <Link className="btn" href="/">Accueil</Link>
      </button>
      {buttonsIfConnected}
    </ul>
  );
};

export default HeaderLinksBig;
