import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';
import { connectToDatabase } from '../utils/mongo';

export default async function login(req: Request | any, res: Response | any) {
  const { email, password }: {
    email: any,
    password: any
  } = req.body;

  // Fetch user from the database based on the email
  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<any> = db.collection('players-ranking');
  const user: any | null = await collection.findOne({ email });

  if (!user) {
    return { message: 'User not found' };
  }

  // Compare provided password with the hashed password in the database
  const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return { message: 'Invalid credentials' }
  }

  // Generate a JWT
  const tokenPayload = {
    userId: user._id,
  };

  const secret: string | undefined = process.env.JWT_SECRET;

  if (!secret) {
    return { message: 'We cannot set a new token, please check at environment variables' };
  }

  const token: string = jwt.sign(tokenPayload, secret, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

  return { message: 'Login successful', user, token };
}
