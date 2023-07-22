import { connectToDatabase } from '../../utils/mongo';

export default async function handler(_: any, res: any) {
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('test-collection-name');
  const datas = await collection.find().toArray();

  // If I want only one result
  // const datas = await collection.find().toArray();
  // const data = datas[0].name

  res.status(200).json(datas);
}