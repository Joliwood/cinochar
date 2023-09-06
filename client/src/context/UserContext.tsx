import React, {
  useState, createContext, FC, useMemo,
} from 'react';

export type UserContextType = {
  pseudo: string;
  points?: number;
  jokers: number;
  revealImg: boolean,
  isUserPlaying: boolean;
  setIsUserPlaying: (state: boolean) => void;
  setJokers: (number: number) => void;
  setPseudo: (name: string) => void;
  setRevealImg: (state: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  pseudo: '',
  points: 0,
  jokers: 2,
  revealImg: false,
  isUserPlaying: false,
  setIsUserPlaying: () => {},
  setJokers: () => {},
  setPseudo: () => { },
  setRevealImg: () => {},
});

interface Props {
  children?: React.ReactNode;
  initialPseudo: string;
  initialJokers: number;
  initialRevealImg: boolean;
  initialIsPlaying: boolean;
}

// <Partial<Props>> is used to make the props optional (with also ? in the interface)
export const UserContextProvider: FC<Partial<Props>> = ({
  children, initialPseudo = '', initialJokers = 2, initialRevealImg = false, initialIsPlaying = false,
}) => {
  const [pseudo, setPseudo] = useState(initialPseudo);
  const [jokers, setJokers] = useState(initialJokers);
  const [revealImg, setRevealImg] = useState(initialRevealImg);
  const [isUserPlaying, setIsUserPlaying] = useState(initialIsPlaying);

  const userState = useMemo(() => ({
    pseudo, setPseudo, jokers, setJokers, revealImg, setRevealImg, isUserPlaying, setIsUserPlaying,
  }), [
    pseudo, setPseudo,
    jokers, setJokers,
    revealImg, setRevealImg,
    isUserPlaying, setIsUserPlaying,
  ]);

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};
