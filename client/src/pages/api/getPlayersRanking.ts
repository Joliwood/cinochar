import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';

import type { UsersFromMongo } from '#types';
import { connectToDatabase } from '#utils';

export default async function getPlayersRanking(_req: NextApiRequest, res: NextApiResponse) {
  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<UsersFromMongo> = db.collection('players-ranking');
  const response: UsersFromMongo[] | any = await collection.find({}).toArray();

  res.status(200).json(response);
}
