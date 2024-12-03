import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.route";
dotenv.config();

const app = express();

app.use(express.json());
//default route for testing
app.use("/", (req, res) => {
  res.send("Server is running");
});

//user routes
app.use("/api/user", authRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${process.env.PORT}!`);
});
