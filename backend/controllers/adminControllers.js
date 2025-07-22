import Admin from '../models/adminModel.js';
import bcrypt from 'bcrypt';
export async function createAdmin(req, res) {
    try {

        const { EmailId, Password } = req.body;
        console.log(req.body);

        const hashedPassword = await bcrypt.hash(Password, 10)

        const newAdmin = new Admin({ EmailId, Password: hashedPassword });
        await newAdmin.save();

        res.status(200).json({ message: newAdmin });

    }
    catch (error) {
        res.satus(500).error('admin creation failed')
    }

}

export async function login(req, res) {
    try {
        const { EmailId, Password } = req.body;

        if (!EmailId || !Password) {
            console.log("Missing email or password");
            return res.status(400).json({ message: "Email and password are required" });
        }

        const admin = await Admin.findOne({ EmailId });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = bcrypt.compare(Password, admin.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });

    }

    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}




