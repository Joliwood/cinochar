import { ObjectId } from 'mongodb';

export interface User {
  id?: number;
  pseudo?: string;
  email?: string;
}

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
