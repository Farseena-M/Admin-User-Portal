import jwt from 'jsonwebtoken'
import validateAdminLogin from '../validation/adminLogin.js';

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