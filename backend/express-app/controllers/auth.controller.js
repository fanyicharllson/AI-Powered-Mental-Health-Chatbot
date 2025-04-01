import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sentResetSuccessEmail,
} from "../mailtrap/emails.js";
import crypto from "crypto";

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
      return res.status(400).json({
        success: false,
        message: "User with the email already exists",
      });
    }
    //check if user name already exists
    const userNameAlreadyExists = await User.findOne({ username });
    if (userNameAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
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

    //send verification email
    await sendVerificationEmail(newUser.email, verificationToken);

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
    res.status(500).json({
      success: false,
      message: "Internal Server Error! Please try again later.",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpireAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }
    //update user to isVerified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpireAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.username);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error! Please try again later.",
    });
  }
};

export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials!",
      });
    }

    //geberate token and set cookie
    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Error signing in the user", error);
  }
};
export const Logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: false,
    message: "Logged out successfully!",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with the email does not exist",
      });
    }

    // generate rest token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000; //1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpireAt = resetTokenExpireAt;

    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (err) {
    console.error("Error sending forgot password email", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error! Please try again later.",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    //update password
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpireAt = undefined;
    await user.save();

    await sentResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error! Please try again later.",
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error checking auth", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error! Please try again later.",
    });
  }
};

export const resentVerificationCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    //check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with the email does not exist",
      });
    }
    //check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified!",
      });
    }
    //generate new verification code
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    user.verificationToken = verificationToken;
    user.verificationTokenExpireAt = Date.now() + 24 * 60 * 60 * 1000; //24hrs

    await user.save();

    //send verification email
    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({
      success: true,
      message: "Verification code resent successfully",
    });
  } catch (error) {
    console.error("Error resending verification code", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error! Please try again later.",
    });
  }
};
