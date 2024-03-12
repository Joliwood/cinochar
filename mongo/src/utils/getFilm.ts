import type {
  Collection, Db, MongoClient,
} from 'mongodb';
import { connectToDatabase } from '../utils/mongo';

export default async function getFilms() {
  const client: MongoClient = await connectToDatabase();
  const db: Db = client.db();
  const collection: Collection<any> = db.collection('films-collection');

  // Aggregate = get a random document from the collection
  const randomMovie: any[] = (
    await collection.aggregate<any>([{ $sample: { size: 1 } }]).toArray()
  );

  const randomMovieResponse = randomMovie[0];

  // res.status(200).json(randomMovie[0]);

  return randomMovieResponse;
}
