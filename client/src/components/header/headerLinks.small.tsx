import React from 'react';
import Link from 'next/link';
import { UserInfos } from '@/@types';
import handleLogout from '../../utils/handleLogout';

function headerLinksSmall({ pseudo }: { pseudo: UserInfos['pseudo'] }) {
  return (
    <div className="dropdown dropdown-bottom dropdown-end lg:hidden">
      <button
        className="block lg:hidden"
        type="button"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm0 5h14a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
          />
        </svg>
      </button>
      <ul className="dropdown-content z-[1] bg-white menu p-2 shadow rounded-box w-52">
        <li><Link href="/" replace={false}>Accueil</Link></li>
        {!pseudo && <li><Link href="/login" replace={false}>Se connecter</Link></li>}
        {!pseudo && <li><Link href="/signup" replace={false}>S'enregistrer</Link></li>}
        {pseudo && <li><Link href="/" onClick={handleLogout} replace={false}>Se deconnecter</Link></li>}
      </ul>
    </div>
  );
}

export default headerLinksSmall;
