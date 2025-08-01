import { ElectionDay, LastElection, NextElection} from '../models/adminModel.js';

import { User } from "../models/userModel.js";
// import { generateToken } from "../middlewares/auth.js";

import bcrypt from "bcrypt";

export async function createAdmin(req, res) {
  try {
    const { EmailId, Password } = req.body;

    const existingAdmin = await User.findOne({ EmailId });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

    const hashedPassword = await bcrypt.hash(Password, 10);
    const newAdmin = new User({
      EmailId,
      Password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    return res.status(200).json({ message: newAdmin });
  } catch (error) {
    console.log("Admin creation error",error);
    
    return res.status(500).json({ message: "Admin creation failed", error: error.message });
  }
}

// export async function login(req, res) {
//   try {
//     const { EmailId, Password } = req.body;

//     if (!EmailId || !Password) {
//       console.log("Missing email or password");
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });
//     }

//     const admin = await User.findOne({ EmailId });
//     if (!admin) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isPasswordValid = await bcrypt.compare(Password, admin.Password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     const token = generateToken({
//       userId: admin._id,
//       EmailId: admin.EmailId,
//       role: admin.role,
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "Lax",
//       maxAge: 3600000,
//       path: "/",
//     });

//     return res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }


// export async function getUser(req, res) {
//     const {EmailId, role} = req.user
//     return res.status(200).json({EmailId, role});
// }


//lastelection

export async function lastelectionDetails(req , res) {
    try {
        const LastElec = new LastElection(req.body);
        await LastElec.save();
        return res.status(200).json({ LastElec });
    }

    catch (error) {
        return res.status(500).json({ message: 'unable to add details' });

    }

}

export async function getlastelectionDetails(req, res) {
    try{
        const getLastElec = await LastElection.find();
        res.status(200).json({ getLastElec });
    }

    catch (error) {
        res.status(500).json({ message: 'unable to get details' });
    }

}

//nextelection

export async function nextelectionDetails(req , res) {
    try {
        const NextElec = new NextElection(req.body);
        await NextElec.save();
        return res.status(200).json({ NextElec });
    }
    catch(error) {
        return res.status(500).json({ message: 'unable to add details' });
    }
}

export async function getnextelectionDetails(req, res) {
    try {
        const getNextElec = await NextElection.find();
        return res.status(200).json({ getNextElec });
    }
    catch(error) {
        return res.status(500).json({ message: 'unable to get details' });
    }
}

//electionday

export async function electionDay(req, res) {
    try{
        const ElectDay = new ElectionDay(req.body);
        await ElectDay.save();
        return res.status(200).json({ ElectDay });

    }

    catch(error) {
        res.status(500).json({ message: 'unable to add details' });
    }

}

export async function getElectionDay (req, res) {
    try {
        const getElecDay = await ElectionDay.find();
        return res.status(200).json({ getElecDay });
    }
    catch(error) {
        return res.status(500).json({ message: 'unable to get details' });
    }
}
