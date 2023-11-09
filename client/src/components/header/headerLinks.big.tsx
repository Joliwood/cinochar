import React from 'react';
import Link from 'next/link';
import { UserInfos } from '@/@types';
import handleLogout from '../../utils/handleLogout';

function headerLinksBig({ pseudo }: { pseudo: UserInfos['pseudo'] }) {
  return (
    <ul className="menu menu-horizontal px-1 gap-3 py-0 hidden lg:flex">

      <button type="button" className="flex items-center">
        <a className="btn" href="/">Accueil</a>
      </button>

      {!pseudo && (
      <>
        <button type="button" className="flex items-center">
          <Link className="btn" href="/login" replace={false}>Se connecter</Link>
        </button>

        <button type="button" className="flex items-center">
          <Link className="btn" href="/signup" replace={false}>S'enregistrer</Link>
        </button>
      </>
      )}

      {pseudo && (
      <button type="button" className="flex items-center" onClick={handleLogout}>
        <Link className="btn" href="/" replace={false}>Se deconnecter</Link>
      </button>
      )}

    </ul>
  );
}

export default headerLinksBig;
