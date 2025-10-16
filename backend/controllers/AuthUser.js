import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Usermodel from "../models/user.js";

export const signin = async (req, res) => {
  const { UserName, Email, Password, ProfilePicture } = req.body;
  if (!UserName || !Email || !Password) {
    return res
      .status(400)
      .json({ message: "Please fill all the missing fields" });
  }
  //   if(!ProfilePicture){
  //     return res.status(200).json({message:"https://i.pinimg.com/1200x/08/11/b0/0811b0a6e0a1cb9ba57fb383b5e511c9.jpg"})
  //   }
  try {
    const hashedPassword = await bcryptjs.hash(Password, 10);
    const User = await Usermodel.findOne({ Email });
    if (User) {
      return res.status(500).json({ message: "user already exist " });
    }
    const userProfilePicture = ProfilePicture
      ? ProfilePicture
      : "https://i.pinimg.com/1200x/08/11/b0/0811b0a6e0a1cb9ba57fb383b5e511c9.jpg";
    const newUser = new Usermodel({
      UserName,
      Email,
      Password: hashedPassword,
      ProfilePicture: userProfilePicture,
    });
    newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      sameSite: process.env.NODE_ENV === "Production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Succesfully signed in" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    if (!Email || !Password) {
      return res
        .status(400)
        .json({ message: "Please Fill all the empty fields" });
    }
    const user = await Usermodel.findOne({ Email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(500).json({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      sameSite: process.env.NODE_ENV === "Production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Succesfully Logged in" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      sameSite: process.env.NODE_ENV === "Production" ? "none" : "strict",
    });
    return res.status(200).json({ message: "Succesfully Logged out" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
