const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x9u2gny.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
