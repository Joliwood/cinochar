import { ObjectId } from 'mongodb';

export interface User {
  id?: number;
  pseudo?: string;
  email?: string;
}

export type UserFromMongo = {
  _id: ObjectId
  pseudo: string;
  email: string;
  points: number;
  password: string;
} | null;
