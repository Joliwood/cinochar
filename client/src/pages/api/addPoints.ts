import { ObjectId } from 'mongodb';
import connectToDatabase from '../../utils/mongo';

export default async function handler(req: any, res: any) {
  const { userId, points } = req.body;

  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('players-ranking');

  await collection.updateOne(
    { _id: new ObjectId(userId) },
    // eslint-disable-next-line quote-props
    { $inc: { points } },
  );

  return res.status(200).json({ message: 'Points added.' });
}
