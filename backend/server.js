import express from "express";
import ConnectDB from "./Config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.route.js"

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

//routes
app.use('/api/auth', authRoutes)

const startServer = async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();