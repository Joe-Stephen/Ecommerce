import express from "express";
import {
  createUser,
  listUsers,
  loginUser,
} from "../controllers/user.controller";

const authRouter = express.Router();

authRouter.get("/list", listUsers);

authRouter.post("/login", loginUser);

authRouter.post("/register", createUser);

export default authRouter;
