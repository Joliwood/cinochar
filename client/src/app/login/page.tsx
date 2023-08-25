'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../components/header';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      setMessage(response.data.message);

      // Store the JWT in local storage or a secure cookie
      localStorage.setItem('token', response.data.token);

      setMessage(response.data.message);
      // The player can be redirected on the main page to join the game
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        console.error(error);
        setMessage('An error occurred during login.');
      }
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
          <a href="/signup" className="px-3 py-1 rounded">S'inscrire</a>
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
