import { body, validationResult } from 'express-validator';
import AppError from '../utils/appError.js';

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new AppError(errors.array().map(err => err.msg).join(', '), 400);
    }
    next();
};

export const validateCartItem = [
    body('product')
        .notEmpty()
        .withMessage('Product ID is required'),
    body('quantity')
        .notEmpty()
        .withMessage('Quantity is required'),
    validateRequest
];

export const validateCartItemUpdate = [
    body('quantity')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer')
];
