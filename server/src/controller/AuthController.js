import express from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const signupController = async (req, res) => {
  const { username, email, role, password } = req.body;

  try {
    if (!username || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const userCheck = await User.findOne({ email });

    if (userCheck) {
      return res.status(400).json({
        success: false,
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const signUpUser = new User({
      username,
      email,
      role,
      password: hashedPassword,
    });

    const userSaved = await signUpUser.save();

    if (userSaved) {
      return res.status(201).json({
        success: true,
        message: "User created successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Failed to create user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to create user",
      details: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User does not exist",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials",
      });
    }

    // console.log(user._id);

    const token = jsonwebtoken.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
       maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful!",
      userId: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      details: error.message,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).send({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "An error occurred during logout",
    });
  }
};

export const getUserController = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
