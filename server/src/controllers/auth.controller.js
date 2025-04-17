import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characterd" });
    }
    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save the user to the database and make jwt token
    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error occured in signup controller", error.message);
    return res.status(400).json({message:"Internal Server Error"});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({message: "All fields are required!"});
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message: "Invalid Credentials"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({message: "Invalid Credentials"});
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("error in login controll" + error.message);
    res.status(400).json({message: "Internal server error"});
  }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(200).json({message: "Logout Successfully"})
    } catch (error) {
        console.log("Error in logout controll" + error.message);
        return res.status(400).json({message: "Internal Server Error"});
    }
};

export const updateProfile = async (req, res) => {
  try {
    const {profilePic} = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({message: "Profile picture is required"});
    };

    const cloudResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: cloudResponse.secure_url}, {new: true});
    if (!updatedUser) {
      return res.status(400).json({message: "User not found"});
    }

    res.status(200).json(updatedUser);

   } catch (error) {
    console.log("Error in update profile controll" + error.message);
    return res.status(400).json({message: "Internal Server Error"});
  }
};

export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in check auth controll" + error.message);
    return res.status(400).json({message: "Internal Server Error"});
    
  }
}
