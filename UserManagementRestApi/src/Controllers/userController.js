import User from "../model/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import validateUser from "../validation/userJoiValidation.js";




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



export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: 'Users retrieved successfully',
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};





export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};





export const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            message: 'User edited successfully',
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







export const getUserProfile = async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.status(200).json({
        message: 'Fetched profile successfull',
        data: user
    });
};
