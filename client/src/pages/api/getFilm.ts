import connectToDatabase from '../../utils/mongo';

export default async function handler(_: any, res: any) {
  const client = await connectToDatabase();
  const db = client.db();
  const collection = db.collection('films-collection');
  // Aggregate = get a random document from the collection
  const datas = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();

  // If I want only one result
  // const datas = await collection.find().toArray();
  // const data = datas[0].name

  res.status(200).json(datas);
}
