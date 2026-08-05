import express from 'express';
import { isBuyer } from '../middlewares/role.middleware.js';
import authUser from '../middlewares/auth.middleware.js';
import { validateCartItem, validateCartItemUpdate } from '../validation/cart.validator.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { addToCart, deleteCartItem, getCartItems, updateCartItem } from '../controllers/cart.controller.js';
const cartRouter = express.Router();

cartRouter.post('/add', authUser, isBuyer, validateCartItem, asyncHandler(addToCart));

cartRouter.get('/', authUser, isBuyer, asyncHandler(getCartItems))

cartRouter.patch("/update/:itemId", authUser, isBuyer, validateCartItemUpdate, asyncHandler(updateCartItem));

cartRouter.delete("/delete/:id", authUser, isBuyer, asyncHandler(deleteCartItem))

export default cartRouter;