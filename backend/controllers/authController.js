import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import User from "../models/AuthModel.js";
import { createJWT } from "../utils/tokenUtils.js";
import { StatusCodes } from "http-status-codes";

  export const register = async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });

      if (existingUser) {
        return res.status(400).json({ msg: "This email already in use" });
      }
      const hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      await User.create(req.body);
      res.status(200).json({ msg: "user created" });
    } catch (error) {
      res.status(500).json({ msg: "An error occurred while registering user" });
    }
  };

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isValidUser = await comparePassword(req.body.password, user.password);

    if (!isValidUser) {
      return res.status(404).json({ msg: "Invalid credentials" });
    }

    const token = createJWT({ userId: user._id });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ msg: "User logged in", user });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred while logging in" });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
