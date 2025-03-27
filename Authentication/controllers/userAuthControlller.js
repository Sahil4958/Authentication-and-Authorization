import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config()

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res
        .status(404)
        .json({ sucess: false, message: "Please provide missing fields" });
    }

    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    }).select("+password");

    if (checkExistingUser) {
      return res.status(400).json({
        sucess: false,
        message:
          "User is already exists either with same username or same email. Please try with a different username or email, You can login also with this username or email",
      });
    }

    //hash user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    if (newUser) {
      res.status(201).json({
        sucess: true,
        message: "User Registerd Successfully",
        user: {
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register user! please try again.",
      });
    }
  } catch (error) {
    res.status(500).json({ sucess: false, message: "Something went wrong" });
  }
};

const loginUser = async (req,res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User is not exist`,
      });
    }
    

    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) {
      return res.status(400).json({
        success: false,
        message: `Invalid Credential`,
      });
    }
 
    const accessToken = jwt.sign({
      userId: user._id,
      username: user.username,
      role: user.role,
    },process.env.JWT_SECRET_KEY,{
      expiresIn : '1d'
    });


    res.status(200).json({success:true , message : "User logged Sucessfully" ,accessToken})
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export { registerUser, loginUser };
