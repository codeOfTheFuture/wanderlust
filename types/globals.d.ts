declare global {
  var _mongoClientPromise: Promise<MongoClient>;
  var _mongoDb: Db;
}

export {};
