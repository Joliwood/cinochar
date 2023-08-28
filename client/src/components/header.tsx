'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import UserContext from '../context/UserContext';
import handleLogout from '../utils/handleLogout';

function Header() {
  const { pseudo } = useContext(UserContext);

  return (
    <header className="sticky w-full p-4 shadow-sm">
      <div className="flex-none">
        <nav className="flex items-center justify-between">
          <div className="font-semibold text-xl">Cinochar</div>

          <ul className="menu menu-horizontal px-1 flex gap-3 py-0">
            <button type="button" className="flex items-center">
              <a className="btn" href="/">Accueil</a>
            </button>

            <button type="button" className="flex items-center">
              <a className="btn" href="/dashboard">Profil</a>
            </button>

            {!pseudo && (
              <>
                <button type="button" className="flex items-center">
                  <a className="btn" href="/login">Se connecter</a>
                </button>

                <button type="button" className="flex items-center">
                  <a className="btn" href="/signup">S'enregistrer</a>
                </button>
              </>
            )}

            {pseudo && (
              <button type="button" className="flex items-center" onClick={handleLogout}>
                <a className="btn" href="/">Se deconnecter</a>
              </button>
            )}

          </ul>

          {pseudo && (
            <div className="avatar flex gap-3 items-center">
              <h3 className="font-bold text-primary-content">{pseudo ? <p>{pseudo}</p> : ''}</h3>
              <div className="w-[48px] rounded h-[48px]">
                <Image src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="azok" width={100} height={100} />
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
