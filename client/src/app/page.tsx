'use client';

import React, { useContext, useEffect } from 'react';
import type { UserFromMongo } from '@/@types';
import Header from '../components/header/header';
import FilmFinder from '../components/filmFinder/filmFinder';
import RoomJoin from '../components/roomJoin';
import PlayersClassement from '../components/playersClassement';
import { UserContext } from '../context/UserContext';
import auth from '../utils/auth';
import PlayersConnected from '../components/playersConnected';

function Home() {
  const { setPseudo } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      // If the type of return is string, so it show us an error
      const result: string | UserFromMongo = await auth();
      if (typeof result !== 'string' && result.pseudo) {
        setPseudo(result.pseudo);
      } else {
        console.error(result);
      }
    };

    fetchData();
  }, [setPseudo]);

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
