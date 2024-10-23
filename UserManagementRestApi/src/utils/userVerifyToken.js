import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';


export const userVerifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                status: 'Failed',
                message: 'No token provided'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Token missing or invalid'
            });
        }

        const decodedToken = jwt.verify(token, process.env.USER_SECRET_STR);

        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Unauthorized: User not found'
            });
        }

        req.user = {
            _id: user._id,
            role: user.role,
            email: user.email,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            status: 'Failed',
            message: 'Invalid or expired token'
        });
    }
};
