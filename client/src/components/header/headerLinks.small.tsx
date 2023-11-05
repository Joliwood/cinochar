import React from 'react';
import Link from 'next/link';
import handleLogout from '../../utils/handleLogout';

function headerLinksSmall({ pseudo }: any) {
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
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><a href="/">Accueil</a></li>
        {!pseudo && <li><Link href="/login">Se connecter</Link></li>}
        {!pseudo && <li><Link href="/signup">S'enregistrer</Link></li>}
        {pseudo && <li><a href="/" onClick={handleLogout}>Se deconnecter</a></li>}
      </ul>
    </div>
  );
}

export default headerLinksSmall;
