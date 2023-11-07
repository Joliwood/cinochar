import { ObjectId } from 'mongodb';

export type Login = {
  // If the login fails, it will return only a message
  message: string;
  user: UserFromMongo;
  token: string;
};

export type UserFromMongo = {
  // _id? to accept user creation (so the _id doesn't exists yet)
  _id?: ObjectId
  pseudo: string;
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

export type Participant = {
  pseudo: string;
  points: number;
};

export type ParticipantContextType = {
  participant: Participant[];
  setParticipant: React.Dispatch<React.SetStateAction<Participant[]>>;
};

export interface Props {
  children: ReactNode;
}
