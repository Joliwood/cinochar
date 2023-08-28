import { createContext } from 'react';

export type UserContextType = {
  pseudo?: string;
  points?: number;
};

// TODO ici infos de l'user doivent arriver

const UserContext = createContext<UserContextType>({
  pseudo: '',
  points: 0,
});

export default UserContext;
