import React, {
  useState,
  createContext,
  FC,
  useMemo,
} from 'react';
import type { UserContextType, UserProps, UserInfos } from '@/@types';

const userInitState: UserInfos = {
  pseudo: '',
  points: 0,
  jokers: 2,
  revealImg: false,
  isUserPlaying: false,
};

const UserContext = createContext<UserContextType>({
  userInfos: userInitState,
  setUserInfos: () => {},
});

// <Partial<...>> is used to make the props optional -> ... | undefined
const UserContextProvider: FC<Partial<UserProps>> = ({ children }) => {
  const [userInfos, setUserInfos] = useState<UserInfos>(userInitState);

  const userState: UserContextType = useMemo(() => (
    { userInfos, setUserInfos }
  ), [userInfos, setUserInfos]);

  return (
    <UserContext.Provider value={userState}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
