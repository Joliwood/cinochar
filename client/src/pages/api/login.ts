import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';
import { UserFromMongo } from '@/@types';
import connectToDatabase from '../../utils/mongo';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password }: {
    email: UserFromMongo['email'],
    password: UserFromMongo['password']
  } = req.body;

  // Fetch user from the database based on the email
  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<Document> = db.collection('players-ranking');
  // Normally returns WithId<Document> with findOne but here
  // this findOne will return a very specific type of user
  const user = await collection.findOne<UserFromMongo | null>({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare provided password with the hashed password in the database
  const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT
  const tokenPayload = {
    userId: user._id,
  };

  const secret: string | undefined = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(401).json({ message: 'We cannot set a new token, please check at environment variables' });
  }

  const token: string = jwt.sign(tokenPayload, secret, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

  return res.status(200).json({ message: 'Login successful', user, token });
}
