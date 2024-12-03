"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.loginUser = exports.listUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const user_model_1 = __importDefault(require("../models/user.model"));
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find();
        return res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Error listing users" });
    }
});
exports.listUsers = listUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) { }
});
exports.loginUser = loginUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Duplicate email checking
        const existingUser = yield user_model_1.default.findOne({ email: req.body.email });
        if (existingUser) {
            return res
                .status(400)
                .json({ success: false, message: "Email already exists" });
        }
        // Generating salt
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        // Hashing the password
        const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
        // Replacing the password in the request body
        req.body.password = hashedPassword;
        // Creating the user
        const user = yield user_model_1.default.create(req.body);
        // Responding with success
        return res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message,
        });
    }
});
exports.createUser = createUser;
