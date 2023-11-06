'use client';

import React, { useState, useContext, FormEvent } from 'react';
import Link from 'next/link';
import Header from '../../components/header/header';
import handleLogin from '../../utils/handleLogin';
import { UserContext } from '../../context/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setPseudo } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await handleLogin(email, password);

    setMessage(result.message);
    setPseudo(result.user.pseudo);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />

      <form
        action="/login"
        method="POST"
        className="space-y-4 relative mt-[100px] flex flex-col bg-white shadow-md px-6 py-8 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="label flex flex-col items-start gap-2" htmlFor="email">
            <span className="text-base label-text">Email</span>
            <input
              type="email"
              placeholder="email@domain.com"
              className="w-full input input-bordered"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label className="label flex flex-col items-start gap-2" htmlFor="password">
            <span className="text-base label-text">Mot de passe</span>
            <input
              type="password"
              placeholder="*********"
              className="w-full input input-bordered"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button className="btn bg-green-700 btn-block text-white hover:text-neutral" type="submit">Se connecter</button>
        </div>
        <div>
          <Link href="/signup" className="px-3 py-1 rounded">S'inscrire</Link>
        </div>
        <div>
          <a href="/" className="px-3 py-1 rounded">Retourner à l'accueil</a>
        </div>
        <div>
          <p>{message}</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
