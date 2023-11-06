import type { NextApiRequest, NextApiResponse } from 'next';
import type {
  Collection, Db, MongoClient,
} from 'mongodb';
import type { FilmFromMongo } from '@/@types';
import connectToDatabase from '../../utils/mongo';

export default async function getFilms(_: NextApiRequest, res: NextApiResponse) {
  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<FilmFromMongo> = db.collection('films-collection');

  // Aggregate = get a random document from the collection
  const randomMovie: FilmFromMongo[] = (
    await collection.aggregate<FilmFromMongo>([{ $sample: { size: 1 } }]).toArray()
  );

  // If I want only one result
  // const datas = await collection.find().toArray();
  // const data = datas[0].name

  res.status(200).json(randomMovie[0]);
}
