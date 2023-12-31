'use client';

import React, { useState, useContext, FormEvent } from 'react';
import Link from 'next/link';
import type { Login, UserContextType } from '@/@types';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Header from '../../components/header/header';
import handleLogin from '../../utils/handleLogin';
import { UserContext } from '../../context/UserContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { userInfos, setUserInfos } = useContext<UserContextType>(UserContext);
  const router: AppRouterInstance = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result: Login | string = await handleLogin(email, password);
    // The result will contains user object only if the login is successful
    if (typeof result === 'string') {
      setMessage(result);
    } else {
      setUserInfos({ ...userInfos, pseudo: result.user.pseudo });
      router.push('/');
    }
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

export default LoginPage;
