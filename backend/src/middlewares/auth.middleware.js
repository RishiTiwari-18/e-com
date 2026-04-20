import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import config from '../config/config.js';
import userModel from '../models/user.model.js';

const authUser = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return next(new AppError('Unauthorized: No token provided', 401));
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return next(new AppError('Unauthorized: User not found', 401));
        }

        req.user = {
            id: user._id,
            email: user.email,
            name: user.fullname,
            role: user.role,
            contact: user.contact
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Unauthorized: Token expired', 401));
        }

        if (error.name === 'JsonWebTokenError') {
            return next(new AppError('Unauthorized: Invalid token', 401));
        }

        return next(new AppError(error.message || 'Unauthorized', 401));
    }
};

export default authUser;