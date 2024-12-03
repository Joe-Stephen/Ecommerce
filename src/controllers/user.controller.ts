import bcrypt from "bcrypt";
const saltRounds = 10;
import User from "../models/user.model";

export const listUsers = async (req: any, res: any) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Error listing users" });
  }
};
export const loginUser = async (req: any, res: any) => {
  try {
  } catch (error) {}
};

export const createUser = async (req: any, res: any) => {
  try {
    //Duplicate email checking
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    // Generating salt
    const salt = await bcrypt.genSalt(saltRounds);
    // Hashing the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // Replacing the password in the request body
    req.body.password = hashedPassword;
    // Creating the user
    const user = await User.create(req.body);
    // Responding with success
    return res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};
