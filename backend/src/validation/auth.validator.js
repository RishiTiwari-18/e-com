import { body, validationResult } from 'express-validator';
import AppError from '../utils/appError.js';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError(errors.array().map(err => err.msg).join(', '), 400);
    }
    next();
};


export const validateRegisterUser = [
    body('fullname')
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 3 })
        .withMessage('Full name must be at least 3 characters long'),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('contact')
        .notEmpty()
        .withMessage('Contact number is required')
        .matches(/^\d{10}$/)
        .withMessage('Contact number must be a valid 10-digit number'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    validateRequest
];

export const validateLoginUser = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    validateRequest
];
