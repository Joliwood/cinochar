'use client';

import React, { useContext, useEffect } from 'react';
import Header from '../components/header';
import FilmFinder from '../components/filmFinder';
import RoomJoin from '../components/roomJoin';
import PlayersList from '../components/playersList';
import PlayersClassement from '../components/playersClassement';
import { UserContext } from '../context/UserContext';
import auth from '../utils/auth';

function Home() {
  const { setPseudo } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await auth();
        if (result && result.pseudo) {
          setPseudo(result.pseudo);
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };

    fetchData();
  }, [setPseudo]);

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
