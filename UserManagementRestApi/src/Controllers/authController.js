import jwt from 'jsonwebtoken'
import validateAdminLogin from '../validation/adminLogin.js';
import User from '../model/userSchema.js';
import validateUserLogin from "../validation/userLogin.js";
import bcrypt from 'bcryptjs';



export const adminLogin = async (req, res) => {
    const { error } = validateAdminLogin(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ username, role: 'admin' }, process.env.ADMIN_SECRET_STR, {
            expiresIn: process.env.LOGIN_EXPIRES
        });
        return res.status(200).json({
            message: 'Login success',
            role: 'admin',
            token
        });
    } else {
        return res.status(404).json({
            status: 'Not found',
            message: 'Invalid admin credentials'
        });
    }
};





export const userLogin = async (req, res) => {
    const { error } = validateUserLogin(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.USER_SECRET_STR,
            { expiresIn: process.env.LOGIN_EXPIRES });
        return res.status(200).json({
            message: 'User login successful',
            token,
            id: user._id,
            role: user.role
        });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};
