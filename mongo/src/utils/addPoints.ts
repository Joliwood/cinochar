import { connectToDatabase } from '../utils/mongo';

import { ObjectId } from 'mongodb';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';

async function addPoints(userId: any, points: any): Promise<boolean> {

  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<any> = db.collection('players-ranking');

  await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $inc: { points } },
  );

  return true;
}

export default addPoints;