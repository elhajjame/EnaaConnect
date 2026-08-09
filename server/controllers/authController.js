import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, role } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const newUser = await User.create({
      fullName,
      email,
      password,
      confirmPassword,
      role,
    });
    const token = generateToken(newUser._id);
    res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req,res) => {
  try {
    const {email, password} = req.body;
    if (!email && !password) {
      
    }
  } catch (error) {
    
  }
}