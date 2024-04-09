// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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
  
  module.exports = { connect };  