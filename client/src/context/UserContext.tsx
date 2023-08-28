import { createContext } from 'react';

export type UserContextType = {
  pseudo?: string;
  points?: number;
};

const UserContext = createContext<UserContextType>({});

export default UserContext;
