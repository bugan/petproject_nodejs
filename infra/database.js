const { MongoClient } = require('mongodb');

const dbName = 'ead';
const url = 'mongodb://localhost:27017';

const mongoClientDB = (async () => {
  const connection = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await connection.db(dbName);
  return [db, connection];
})();

module.exports = mongoClientDB;
