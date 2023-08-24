import React from 'react';
import Header from '../components/header';
import FilmFinder from '../components/filmFinder';
import RoomJoin from '../components/roomJoin';
import PlayersList from '../components/playersList';
import PlayersClassement from '../components/playersClassement';

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <Header />
      <RoomJoin />
      <FilmFinder />
      <PlayersClassement />
      <PlayersList />
    </div>
  );
}

export default Home;
