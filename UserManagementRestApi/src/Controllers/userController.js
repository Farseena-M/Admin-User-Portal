import User from "../model/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validateUser from "../validation/userJoiValidation.js";
import validateUserLogin from "../validation/userLogin.js";




export const addUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, phone, location } = req.body;
    const password = Math.random().toString(36).slice(2);
    try {
        const user = new User({ name, email, phone, location, password });
        await user.save();
        await sendEmail(email, password);
        res.status(201).json({
            message: 'User added successfully',
            data: user
        });
    } catch (error) {
        console.log(error);

        res.status(400).json({ message: 'Error adding user', error });
    }
};




export const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            message: 'User editedsuccessfully',
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({ message: 'Error editing user', error });
    }
};




export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
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
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.USER_SECRET_STR, { expiresIn: '1h' });
        return res.status(200).json({
            message: 'User login successful',
            token,
            user: {
                id: user._id,
                role: user.role
            }
        });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};



export const getUserProfile = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(200).json({
        message: 'Fetched profile successfull',
        data: user
    });
};
