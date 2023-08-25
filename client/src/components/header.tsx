'use client';

import React from 'react';

function Header() {
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
            <button type="button" className="flex items-center">
              <a className="btn" href="/login">Se connecter</a>
            </button>
            <button type="button" className="flex items-center">
              <a className="btn" href="/signup">S'enregistrer</a>
            </button>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
