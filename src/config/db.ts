import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn: any = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`Connected to MongoDB :${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB :${error}`);
    process.exit(1); //process code 1 means exit with error, 0 means exit without error
  }
};
