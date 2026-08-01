import express from 'express';
import { isBuyer } from '../middlewares/role.middleware.js';
import authUser from '../middlewares/auth.middleware.js';
import { validateCartItem } from '../validation/cart.validator.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { addToCart, getCartItems } from '../controllers/cart.controller.js';
const cartRouter = express.Router();

cartRouter.post('/add', authUser, isBuyer, validateCartItem, asyncHandler(addToCart));

cartRouter.get('/', authUser, isBuyer, asyncHandler(getCartItems))

export default cartRouter;