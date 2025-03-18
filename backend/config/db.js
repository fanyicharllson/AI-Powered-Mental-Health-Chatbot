import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connecttion error", err);
    process.exit(1);
  }
};

export default ConnectDB;