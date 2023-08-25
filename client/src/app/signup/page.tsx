'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header';

function Signup() {
  const [pseudo, setPseudo] = useState('Guigui');
  const [email, setEmail] = useState('joliboisgui@gmail.com');
  const [password, setPassword] = useState('Azpoazpo5!');
  const [confirmPassword, setConfirmPassword] = useState('Azpoazpo5!');
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
      // You can perform further actions, such as redirecting to a login page.
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <div className="bg-grey-lighter mt-[100px] flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

          <form
            className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-8 text-3xl text-center">S'enregistrer</h1>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="pseudo"
              placeholder="Votre pseudo"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              required
            />

            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="email@domain.com"
              // value={email}
              value="joliboisgui@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value="Azpoazpo5!"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              // value={confirmPassword}
              value="Azpoazpo5!"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1"
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
