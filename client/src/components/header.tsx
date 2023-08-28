'use client';

import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
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

            {/* <button type="button" className="flex items-center">
              <a className="btn" href="/dashboard">Profil</a>
            </button> */}

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

        </nav>
      </div>
    </header>
  );
}

export default Header;
