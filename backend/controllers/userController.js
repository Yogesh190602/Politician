import { User, Funds } from "../models/userModel.js";
import { generateToken } from "../middlewares/auth.js";

import bcrypt from "bcrypt";

//Register

export async function registerUser(req, res) {
  try {
    const { Username, EmailId, Password, Phone } = req.body;

    const existingUser = await User.findOne({ EmailId });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new User({ Username, EmailId, Password: hashedPassword, Phone, role: "user" });

    await newUser.save();

    return res.status(200).json({ message: "User created", newUser });
  } catch (err) {
    return res.status(500).json({ message: "unable to create user" });
  }

}

//Login

export async function userLogin(req, res) {
  const { EmailId, Password } = req.body;

  if (!EmailId || !Password) {
    console.log("Missing email or password");
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ EmailId });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(Password, user.Password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  //tokengeneration

  const token = generateToken({ userId: user._id, EmailId: user.EmailId, Username: user.Username, role: user.role });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 3600000,
    path: "/",
  });

  return res.status(200).json({ message: "Login successful", role: user.role, Username: user.Username });
  
}
//get Username
export async function getUser(req, res) {
    const {Username, EmailId, role} = req.user
    return res.status(200).json({EmailId, Username, role});
}


export async function users(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    return res.status(500).json({ message: "unable to get user" });
  }
}



export async function createFunds(req, res) {
  try {
    const UserFunds = new Funds(req.body);

    await UserFunds.save();
    return res.status(200).json({ UserFunds });
  } catch (err) {
    return res.status(500).json({ message: "unable to create funds" });
  }
}

export async function getFunds(req, res) {
  try {
    const getFunds = await Funds.find();
    return res.status(200).json({ getFunds });
  } catch (err) {
    return res.status(500).json({ message: "unable to get funds" });
  }
}
