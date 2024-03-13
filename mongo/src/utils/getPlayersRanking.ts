import type {
  Collection, Db, MongoClient,
} from 'mongodb';

import { connectToDatabase } from './mongo';

export default async function getPlayersRanking() {
  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<any> = db.collection('players-ranking');
  const playersRanking: any[] | any = await collection.find({}).sort({ points: -1 }).toArray();

  return playersRanking;
}
