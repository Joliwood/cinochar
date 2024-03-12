import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';
import { connectToDatabase } from '../utils/mongo';

export default async function register(req: Request | any, res: Response | any): Promise<boolean> {
  const { email, password, name }: {
    email: any
    password: any
    name: any
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Veuillez remplir les champs s\'\'il vous plaît' });
  }

  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<any> = db.collection('players-ranking');

  const existingUserByName = await collection.findOne<any | null>({ name });
  const existingUserByEmail = await collection.findOne<any | null>({ email });

  if (existingUserByName) {
    return res.status(400).json({ message: 'Ce name est déjà utilisé' });
  }
  if (existingUserByEmail) {
    return res.status(400).json({ message: 'Cette adresse email est déjà enregistrée' });
  }

  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: any = {
    name,
    email,
    points: 0,
    password: hashedPassword,
  };

  await collection.insertOne(user);

  return true;
}
