"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
//default route for testing
app.use("/api", (req, res) => {
    res.send("Server is running");
});
//user routes
app.use("/user", auth_route_1.default);
app.listen(process.env.PORT, () => {
    (0, db_1.connectDB)();
    console.log(`Server is running at http://localhost:${process.env.PORT}!`);
});
