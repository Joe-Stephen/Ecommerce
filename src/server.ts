import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.route";
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
//default route for testing
app.use("/api", (req, res) => {
  res.send("Server is running");
});

//user routes
app.use("/user", authRouter);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${process.env.PORT}!`);
});
