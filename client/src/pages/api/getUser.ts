import { ObjectId } from 'mongodb';
import type { UserFromMongo } from '@/@types';
import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';
import connectToDatabase from '../../utils/mongo';

export default async function getUser(req: NextApiRequest, res: NextApiResponse) {
  // Normally, req.query.userId can be string | string[] | undefined
  // but for only one user, it is just a string
  const { userId } = req.query as { userId: string };

  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<UserFromMongo> = db.collection('players-ranking');
  const user: UserFromMongo | null = await collection.findOne({ _id: new ObjectId(userId) });

  return res.status(200).json({ user });
}
