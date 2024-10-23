import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';


const verifyToken = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer')) {
        return res.status(401).json({ message: 'You are not logged in' });
    }

    const token = authToken.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_SECRET_STR);

        req.user = { _id: decoded.id, role: 'admin', email: decoded.email };
        return next();
    } catch (err) {
        try {
            const decoded = jwt.verify(token, process.env.USER_SECRET_STR);
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: User not found' });
            }

            req.user = { _id: user._id, role: 'user', email: user.email };
            return next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
};

const restrict = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'You do not have permission to perform this action' });
        }
        next();
    };
};

export { verifyToken, restrict }; 