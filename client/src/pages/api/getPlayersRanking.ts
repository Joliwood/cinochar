import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';
import type { UserFromMongo } from '@/@types';
import connectToDatabase from '../../utils/mongo';

export default async function getPlayersRanking(_: NextApiRequest, res: NextApiResponse) {
  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<UserFromMongo> = db.collection('players-ranking');
  const datas: UserFromMongo[] = await collection.find({}).toArray();

  res.status(200).json(datas);
}
