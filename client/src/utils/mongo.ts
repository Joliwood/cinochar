import { MongoClient } from 'mongodb';

const MONGODB_URI: string | undefined = process.env.MONGO_DB_CONNECT;
let cachedClient: MongoClient | null = null;

export default async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env',
    );
  }

  if (cachedClient) {
    return cachedClient;
  }

  const client: MongoClient = new MongoClient(MONGODB_URI);
  cachedClient = client;
  await client.connect();

  return client;
}
