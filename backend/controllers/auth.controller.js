import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }
    //check if user email already exists
    const userEmailAlreadyExists = await User.findOne({ email });
    if (userEmailAlreadyExists) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with this email already exists",
        });
    }
    //check if user name already exists
    const userNameAlreadyExists = await User.findOne({ username });
    if (userNameAlreadyExists) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with this username already exists",
        });
    }
    //hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    //verification code
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    //create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000, //24hrs
    });
    //save user
    await newUser.save();

    //jwt
    generateTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const SignIn = async (req, res) => {
  res.send("SignIn route");
};
export const Logout = async (req, res) => {
  res.send("Logout route");
};
