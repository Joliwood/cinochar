import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI: any = process.env.MONGO_DB_CONNECT;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env',
  );
}

let cachedClient: MongoClient;

export default async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const clientOptions: MongoClientOptions | any = {
    useUnifiedTopology: true,
  };

  const client = new MongoClient(MONGODB_URI, clientOptions);

  if (!cachedClient) {
    await client.connect();
  }

  cachedClient = client;
  return client;
}
