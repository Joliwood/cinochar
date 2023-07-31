import React from 'react';
import Header from '../components/header';
import FilmFinder from '../components/filmFinder';
import RoomJoin from '../components/roomJoin';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <RoomJoin />
      <FilmFinder />
    </div>
  );
}

export default Home;
