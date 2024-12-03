"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authRouter = express_1.default.Router();
authRouter.get("/list", user_controller_1.listUsers);
authRouter.post("/login", user_controller_1.loginUser);
authRouter.post("/register", user_controller_1.createUser);
exports.default = authRouter;
