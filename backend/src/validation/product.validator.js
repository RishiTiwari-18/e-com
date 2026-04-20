import { body, validationResult } from 'express-validator';
import AppError from '../utils/appError.js';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError(errors.array().map(err => err.msg).join(', '), 400);
    }
    next();
};

export const validateCreateProduct = [
    body('title')
        .notEmpty()
        .withMessage('Product title is required'),
    body('description')
        .notEmpty()
        .withMessage('Product description is required'),
    body('amount')
        .isNumeric()
        .withMessage('Product amount must be a number'),
    body('currency')
        .isIn(['USD', 'EUR', 'GBP', 'INR', 'JPY'])
        .withMessage('Invalid currency'),
    validateRequest
];
