import jwt from 'jsonwebtoken';

export const adminVerifyToken = (req, res, next) => {
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

        const decodedToken = jwt.verify(token, process.env.ADMIN_SECRET_STR);

        req.admin = decodedToken;

        const isAdmin = decodedToken.role === 'admin';

        if (!isAdmin) {
            return res.status(403).json({
                status: 'Failed',
                message: 'Unauthorized access'
            });
        }
        next();
    } catch (error) {

        return res.status(401).json({
            status: 'Failed',
            message: 'Invalid or expired token'
        });
    }
};