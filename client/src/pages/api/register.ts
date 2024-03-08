import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';
import type { UserFromMongo } from '#types';
import { connectToDatabase } from '#utils';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, name }: {
    email: UserFromMongo['email'],
    password: UserFromMongo['password']
    name: UserFromMongo['name']
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez remplir les champs s\'\'il vous plaît' });
  }

  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<UserFromMongo> = db.collection('players-ranking');

  const existingUserByName = await collection.findOne<UserFromMongo | null>({ name });
  const existingUserByEmail = await collection.findOne<UserFromMongo | null>({ email });

  if (existingUserByName) {
    return res.status(400).json({ message: 'Ce name est déjà utilisé' });
  }
  if (existingUserByEmail) {
    return res.status(400).json({ message: 'Cette adresse email est déjà enregistrée' });
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: UserFromMongo = {
    name,
    email,
    points: 0,
    password: hashedPassword,
  };

  await collection.insertOne(user);

  return res.status(201).json({ message: 'Votre compte a bien été créé' });
}
