import React from 'react';
import Header from '../components/header';
import Testar from '../components/testar';
import FilmFinder from '../components/filmFinder';

function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Testar />
      <main className="flex flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <p className="flex bg-red-700 px-5">Welcome to this application</p>
        </div>
      </main>
      <FilmFinder />
    </div>
  );
}

export default Home;
