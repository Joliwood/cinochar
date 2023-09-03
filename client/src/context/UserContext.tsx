import React, {
  useState, createContext, FC, useMemo,
} from 'react';

export type UserContextType = {
  pseudo: string;
  points?: number;
  jokers: number;
  setJokers: (number: number) => void;
  setPseudo: (name: string) => void;
};

export const UserContext = createContext<UserContextType>({
  pseudo: '',
  points: 0,
  jokers: 2,
  setJokers: () => {},
  setPseudo: () => {},
});

interface Props {
  children?: React.ReactNode;
  initialPseudo: string;
  initialJokers: number;
}

// <Partial<Props>> is used to make the props optional (with also ? in the interface)
export const UserContextProvider: FC<Partial<Props>> = ({ children, initialPseudo = '', initialJokers = 2 }) => {
  const [pseudo, setPseudo] = useState(initialPseudo);
  const [jokers, setJokers] = useState(initialJokers);
  const userState = useMemo(() => ({
    pseudo, setPseudo, jokers, setJokers,
  }), [pseudo, setPseudo, jokers, setJokers]);

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};
