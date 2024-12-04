import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth.route";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler";
dotenv.config();

const app = express();

//mounting middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

//mounting test route
app.use("/api", (req, res) => {
  res.send("Server is running");
});

//mounting routes
app.use("/user", authRouter);

//mounting error handlers
app.use(notFound);
app.use(errorHandler);

//starting server and connecting to database
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${process.env.PORT}!`);
});
