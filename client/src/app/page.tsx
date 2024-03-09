'use client';

import React from 'react';

import {
  Header,
  SearchFilm,
  RoomJoin,
  PlayersClassement,
  PlayersConnected,
} from '../components';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center mt-[80px]">
      <Header />
      <RoomJoin />
      <SearchFilm />
      <PlayersClassement />
      <PlayersConnected />
    </div>
  );
}

export default Home;
