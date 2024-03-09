import React from 'react';
import Link from 'next/link';

import { type UserInfos } from '#types';
import { handleLogout } from '#utils';

type Props = {
  name: UserInfos['name'];
};

const headerLinksSmall = (props: Props) => {
  const { name } = props;

  return (
    <div className="dropdown dropdown-bottom dropdown-end lg:hidden">
      <button
        aria-label="open menu"
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
        {!name && <li><Link href="/login" replace={false}>Se connecter</Link></li>}
        {!name && <li><Link href="/signup" replace={false}>S'enregistrer</Link></li>}
        {name && <li><Link href="/" onClick={handleLogout} replace={false}>Se deconnecter</Link></li>}
      </ul>
    </div>
  );
};

export default headerLinksSmall;
