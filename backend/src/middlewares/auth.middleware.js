import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import config from '../config/config.js';

const authUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new AppError('Unauthorized: No token provided', 401);
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        throw new AppError('Unauthorized: Invalid token', 401);
    }
};

export default authUser;