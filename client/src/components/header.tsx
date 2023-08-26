'use client';

import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
// import { useAuth } from '../utils/authContext';

function Header() {
  // const { user } = useAuth();

  const [pseudo, setPseudo] = useState('');

  useEffect(() => {
    // To retrieve the token from localStorage
    const storedToken = localStorage.getItem('token');

    // Decode the JWT to access user information
    const decodedToken: any = jwt_decode(storedToken);
    const userPseudo = decodedToken.pseudo;

    setPseudo(userPseudo);
  }, []);

  // if (user && user.data.token) {
  //   const decodedToken = jwt_decode(user);
  //   console.log(decodedToken);

  //   setPseudo(decodedToken.username);
  // }

  return (
    <header className="sticky w-full p-4 shadow-sm">
      <div className="flex-none">
        <nav className="flex items-center justify-between">
          <div className="font-semibold text-xl">Cinochar</div>
          <ul className="menu menu-horizontal px-1 flex gap-3 py-0">
            Hello
            {pseudo ? <p>{pseudo}</p> : null}
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
