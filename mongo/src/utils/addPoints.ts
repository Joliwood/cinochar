import { ObjectId } from 'mongodb';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';

import { connectToDatabase } from './mongo';

async function addPoints(userId: any, points: any): Promise<boolean> {
  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<any> = db.collection('players-ranking');

  const result = await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $inc: { points } },
  );

  if (result.matchedCount === 0) {
    console.log('No document found with the given userId or points not incremented');
    return false;
  }

  return true;
}

export default addPoints;

// 65e49cb3c758ae02a7612b5e
// 65e49cb3c758ae02a7612b5e
