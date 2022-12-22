import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DBNAME,
  user: process.env.MONGODB_USER,
  pass: process.env.MONGODB_PASSWORD,
});

console.log(`Connected to MongoDB database ${process.env.MONGODB_DBNAME}`);

export default mongoose;