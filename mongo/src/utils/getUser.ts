import { ObjectId } from 'mongodb';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';

import { connectToDatabase } from './mongo';

export default async function getUser(req: Request | any) {
  // Normally, req.query.userId can be string | string[] | undefined
  // but for only one user, it is just a string
  console.log('req : ', req);

  // @ts-ignore
  const { userId } = req.query;

  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<any> = db.collection('players-ranking');
  const user: any | null = await collection.findOne({ _id: new ObjectId(userId) });

  return user;
}
