import { ObjectId } from 'mongodb';

export type Login = {
  // If the login fails, it will return only a message
  message: string;
  user: UserFromMongo;
  token: string;
};

export type UserInfos = {
  name: string;
  points?: number;
  jokers: number;
  revealImg: boolean,
  isUserPlaying: boolean;
};

export type UserContextType = {
  userInfos: UserInfos;
  setUserInfos: React.Dispatch<React.SetStateAction<UserInfos>>;
};

export type UsersFromMongo = {
  data: [{
    // _id? to accept user creation (so the _id doesn't exists yet)
    _id?: ObjectId
    name: string;
    email: string;
    points: number;
    password: string;
  }]
};

export type UserFromMongo = {
  // _id? to accept user creation (so the _id doesn't exists yet)
  _id?: ObjectId
  name: string;
  email: string;
  points: number;
  password: string;
};

export type FilmFromMongo = {
  _id: ObjectId
  name: string;
  picture_urls: string[];
};

export type UserDecodedToken = {
  userId: string;
  iat: number;
  exp: number;
};

export interface Props {
  children: ReactNode;
}

export type Player = {
  name: string;
  points: number;
};

export type RandomFilmPosition = {
  x: number;
  y: number;
};

export interface UserProps {
  children: ReactNode;
  initialName: string;
  initialJokers: number;
  initialRevealImg: boolean;
  initialIsPlaying: boolean;
}
