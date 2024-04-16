// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_URI;
const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost:27017';
// Avec callback
MongoClient.connect(MONGO_URL, (err, database) => {
 db = database;
})


async function connect() {
    try {
      await client.connect();
      console.log("Connected successfully to MongoDB");
      return client.db("mytree");
    } catch (e) {
      console.error("Connection to MongoDB failed", e);
      process.exit(1);
    }
  } 

async function disconnect() {
    try {
      await client.close();
      console.log("Disconnected successfully from MongoDB");
    } catch (e) {
      console.error("Disconnection from MongoDB failed", e);
      process.exit(1);
    }
  }

module.exports = { connect, disconnect };