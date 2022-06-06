import { Db, MongoClient, MongoClientOptions } from "mongodb";

const URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;
const DB_NAME = process.env.NEXT_PUBLIC_MONGODB_DB_NAME as string;

const clientOptions: MongoClientOptions = {};

const client: MongoClient = new MongoClient(URI, clientOptions);

export const connectDatabase = async (): Promise<void> => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
};

export const getDatabase = async (): Promise<Db | undefined> => {
  try {
    const db = client.db(DB_NAME);
    return db;
  } catch (error) {
    console.error(error);
  }
};

export const closeDatabase = async (): Promise<void> => {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.error(error);
  }
};

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!URI) {
  throw new Error("Please define the MongoDB URI in the .env.local file");
}

if (!DB_NAME) {
  throw new Error("Please define the MongoDB DB_NAME in the .env.local file");
}

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(URI, clientOptions);

  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

const clientPromise = client.connect();
export default clientPromise;
