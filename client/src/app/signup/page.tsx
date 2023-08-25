'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header';

function Signup() {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        pseudo,
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        console.log(error);

        setMessage('An error occurred during registration.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="bg-grey-lighter mt-[100px] flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

          <form
            className="bg-white px-6 py-8 rounded-2xl shadow-md text-black w-full flex flex-col"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-6 text-3xl text-center">S'enregistrer</h1>

            <label className="label flex flex-col items-start gap-2" htmlFor="pseudo">
              <span className="text-base label-text">Pseudo</span>
              <input
                type="text"
                className="w-full input input-bordered"
                name="pseudo"
                placeholder="Votre pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                required
              />
            </label>

            <label className="label flex flex-col items-start gap-2" htmlFor="email">
              <span className="text-base label-text">Adresse email</span>
              <input
                type="email"
                className="w-full input input-bordered"
                name="email"
                placeholder="email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="label flex flex-col items-start gap-2" htmlFor="password">
              <span className="text-base label-text">Mot de passe</span>
              <input
                type="password"
                className="w-full input input-bordered"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label className="label flex flex-col items-start gap-2" htmlFor="password">
              <span className="text-base label-text">Mot de passe</span>
              <input
                type="password"
                className="w-full input input-bordered"
                name="confirm_password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              className="btn bg-green-700 btn-block text-white hover:text-neutral mt-5"
            >
              Créer un compte
            </button>

          </form>

          <div className="text-grey-dark mt-6">
            Vous avez déjà un compte ?
            <a className="no-underline border-b mx-2 border-blue text-blue" href="/login">
              Se connecter
            </a>
          </div>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
