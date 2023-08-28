import { ObjectId } from 'mongodb';
import connectToDatabase from '../../utils/mongo';

export default async function handler(_: any, res: any, id: string) {
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('players-ranking');
  const user = await collection.findOne({ id });
  // const user = await collection.findOne({
  //   _id: new ObjectId(id),
  // });

  // const user = await collection.findOne({
  //   _id: new ObjectId(id),
  // });

  console.log('user', user);

  return res.status(200).json({ user });
}
