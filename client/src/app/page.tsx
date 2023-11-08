'use client';

import React from 'react';
import Header from '../components/header/header';
import FilmFinder from '../components/filmFinder/searchFilm';
import RoomJoin from '../components/roomJoin';
import PlayersClassement from '../components/playersClassement';
import PlayersConnected from '../components/playersConnected';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center mt-[80px]">
      <Header />
      <RoomJoin />
      <FilmFinder />
      <PlayersClassement />
      <PlayersConnected />
    </div>
  );
}

export default Home;
