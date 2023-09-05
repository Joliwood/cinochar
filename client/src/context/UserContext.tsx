import React, {
  useState, createContext, FC, useMemo,
} from 'react';

export type UserContextType = {
  pseudo: string;
  points?: number;
  jokers: number;
  revealImg: boolean,
  setJokers: (number: number) => void;
  setPseudo: (name: string) => void;
  setRevealImg: (state: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  pseudo: '',
  points: 0,
  jokers: 2,
  revealImg: false,
  setJokers: () => {},
  setPseudo: () => { },
  setRevealImg: () => {},
});

interface Props {
  children?: React.ReactNode;
  initialPseudo: string;
  initialJokers: number;
  initialRevealImg: boolean;
}

// <Partial<Props>> is used to make the props optional (with also ? in the interface)
export const UserContextProvider: FC<Partial<Props>> = ({
  children, initialPseudo = '', initialJokers = 2, initialRevealImg = false,
}) => {
  const [pseudo, setPseudo] = useState(initialPseudo);
  const [jokers, setJokers] = useState(initialJokers);
  const [revealImg, setRevealImg] = useState(initialRevealImg);
  const userState = useMemo(() => ({
    pseudo, setPseudo, jokers, setJokers, revealImg, setRevealImg,
  }), [pseudo, setPseudo, jokers, setJokers, revealImg, setRevealImg]);

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};
