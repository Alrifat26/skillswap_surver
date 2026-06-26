const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

let db;

const connectDB = async () => {
  try {
    await client.connect();

    db = client.db("skill_swap_db");

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const getDB = () => db;

module.exports = {
  connectDB,
  getDB,
};