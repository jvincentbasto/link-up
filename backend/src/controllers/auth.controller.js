import jwt from "jsonwebtoken";
import User from "../models/User.js";

import { config } from "../lib/config.js";
import { stream } from "../lib/stream.js";

const { upsertStreamUser } = stream;
const { envs, constants } = config;

// main
const signup = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // check existing user
    const existingUser = await User.findOne({ email }).select("-password");
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // avatar
    const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });

    try {
      const payloadStream = {
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      };
      await upsertStreamUser(payloadStream);
    } catch (error) {
      console.log("Failed to create Stream User:", error);
    }

    const payloadToken = { userId: newUser._id };
    const tokenOptions = { expiresIn: "7d" };
    const token = jwt.sign(payloadToken, envs.jwtSecret, tokenOptions);

    const payloadCookie = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: envs.nodeEnv === "production",
    };
    res.cookie(constants.jwt, token, payloadCookie);

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to signup user" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payloadToken = { userId: user._id };
    const tokenOptions = { expiresIn: "7d" };
    const token = jwt.sign(payloadToken, envs.jwtSecret, tokenOptions);

    const payloadCookie = {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, // prevent XSS attacks,
      sameSite: "strict", // prevent CSRF attacks
      secure: envs.nodeEnv === "production",
    };
    res.cookie(constants.jwt, token, payloadCookie);

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie(constants.jwt);
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};

//
const onboarding = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      fullName,
      bio,
      // nativeLanguage,
      // learningLanguage,
      location,
    } = req.body;

    if (
      !fullName ||
      !bio ||
      // !nativeLanguage ||
      // !learningLanguage ||
      !location
    ) {
      const missingFields = [
        !fullName && "fullName",
        !bio && "bio",
        // !nativeLanguage && "nativeLanguage",
        // !learningLanguage && "learningLanguage",
        !location && "location",
      ].filter(Boolean);

      const payload = {
        message: "All fields are required",
        missingFields,
      };
      return res.status(400).json(payload);
    }

    const payloadUser = {
      ...req.body,
      isOnboarded: true,
    };
    const updateOptions = {
      new: true,
    };
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      payloadUser,
      updateOptions
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      const payloadStream = {
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      };
      await upsertStreamUser(payloadStream);
      console.log(
        `Successfully updated Stream User for ${updatedUser.fullName}`
      );
    } catch (error) {
      console.log("Failed to update Stream User: ", error.message);
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Onboarding details" });
  }
};
const verifyUser = async (req, res) => {
  try {
    const user = req.user;
    delete user.password;

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify user" });
  }
};

export const userController = {
  signup,
  login,
  logout,
  onboarding,
  verifyUser,
};
