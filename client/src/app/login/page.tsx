import React from 'react';
import Header from '../../components/header';

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />

      <form action="/login" method="POST" className="space-y-4 relative mt-[100px] flex flex-col bg-white shadow-md px-6 py-8 rounded-2xl">
        <div>
          <label className="label flex flex-col items-start gap-2" htmlFor="email">
            <span className="text-base label-text">Email</span>
            <input type="email" placeholder="email@domain.com" className="w-full input input-bordered" />
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
            />
          </label>
        </div>
        <div>
          <button className="btn bg-green-700 btn-block text-white hover:text-neutral" type="submit">Se connecter</button>
        </div>
        <div>
          <a href="/signup" className="px-3 py-1 rounded">S'inscrire</a>
        </div>
        <div>
          <a href="/" className="px-3 py-1 rounded">Retourner à l'accueil</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
