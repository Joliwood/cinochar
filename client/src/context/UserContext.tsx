import React, {
  useState, createContext, FC, useMemo,
} from 'react';

export type UserContextType = {
  pseudo?: string;
  points?: number;
  setPseudo: (name: string) => void;
};

export const UserContext = createContext<UserContextType>({
  pseudo: '',
  points: 0,
  setPseudo: () => {},
});

interface Props {
  children?: React.ReactNode;
  initial: string;
}

// <Partial<Props>> is used to make the props optional (with also ? in the interface)
export const UserContextProvider: FC<Partial<Props>> = ({ children, initial = '' }) => {
  const [pseudo, setPseudo] = useState(initial);
  const pseudoState = useMemo(() => ({ pseudo, setPseudo }), [pseudo, setPseudo]);

  return (
    <UserContext.Provider value={pseudoState}>
      {children}
    </UserContext.Provider>
  );
};
