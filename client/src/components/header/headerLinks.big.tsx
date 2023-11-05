import React from 'react';
import Link from 'next/link';
import handleLogout from '../../utils/handleLogout';

function headerLinksBig({ pseudo }: any) {
  return (
    <ul className="menu menu-horizontal px-1 gap-3 py-0 hidden lg:flex">

      <button type="button" className="flex items-center">
        <a className="btn" href="/">Accueil</a>
      </button>

      {!pseudo && (
      <>
        <button type="button" className="flex items-center">
          <a className="btn" href="/login">Se connecter</a>
        </button>

        <button type="button" className="flex items-center">
          <Link className="btn" href="/signup">S'enregistrer</Link>
        </button>
      </>
      )}

      {pseudo && (
      <button type="button" className="flex items-center" onClick={handleLogout}>
        <a className="btn" href="/">Se deconnecter</a>
      </button>
      )}

    </ul>
  );
}

export default headerLinksBig;
