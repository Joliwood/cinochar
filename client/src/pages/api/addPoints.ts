import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';
import type { UserFromMongo } from '@/@types';
import connectToDatabase from '../../utils/mongo';

export default async function addPoints(req: NextApiRequest, res: NextApiResponse) {
  const { userId, points } = req.body as { userId: string, points: UserFromMongo['points'] };

  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<UserFromMongo> = db.collection('players-ranking');

  await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $inc: { points } },
  );

  return res.status(200).json({ message: 'Points added.' });
}
