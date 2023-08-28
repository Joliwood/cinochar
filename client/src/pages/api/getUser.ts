import { ObjectId } from 'mongodb';
import connectToDatabase from '../../utils/mongo';

export default async function handler(req: any, res: any) {
  const { userId } = req.query;

  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('players-ranking');
  const user = await collection.findOne({ _id: new ObjectId(userId) });

  return res.status(200).json({ user });
}
