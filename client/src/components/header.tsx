import React from 'react';

function Header() {
  return (
    <header className="sticky w-full p-4 shadow-sm ">
      <div className="flex-none">
        <nav className="flex items-center justify-between">
          <div className="font-semibold text-xl">Cinochar</div>
          <ul className="menu menu-horizontal px-1">
            {/* <li>
              <a href="/">Accueil</a>
            </li>
            <li>
              <a href="/">Se connecter</a>
            </li>
            <li>
              <a href="/">S&apos;enregistrer</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
