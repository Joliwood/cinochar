import { MongoClient, MongoClientOptions } from 'mongodb';

const MONGODB_URI: any = process.env.MONGO_DB_CONNECT;

if (typeof MONGODB_URI === 'undefined') {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
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
