import { MongoClient } from "mongodb";

const URI = process.env.NEXT_PUBLIC_MONGODB_URI;
const DB_NAME = process.env.NEXT_PUBLIC_MONGODB_DB_NAME;

const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const connectDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
};

export const getDatabase = async () => {
  try {
    const db = client.db(DB_NAME);
    return db;
  } catch (error) {
    console.error(error);
  }
};

export const closeDatabase = async () => {
  try {
    await client.close();
    console.log("Disconnected from database");
  } catch (error) {
    console.error(error);
  }
};

let cachedClient = null;
let cachedDb = null;

if (!URI) {
  throw new Error("Please define the MongoDB URI in the .env.local file");
}

if (!DB_NAME) {
  throw new Error("Please define the MongoDB DB_NAME in the .env.local file");
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
