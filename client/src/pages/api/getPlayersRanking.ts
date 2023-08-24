import connectToDatabase from '../../utils/mongo';

export default async function handler(_: any, res: any) {
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('players-ranking');
  const datas = await collection.find({}).toArray();

  res.status(200).json(datas);
}
