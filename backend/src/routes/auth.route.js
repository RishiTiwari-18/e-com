import { Router } from 'express';
import { getMeController, loginController, registerController } from '../controllers/auth.controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { validateLoginUser, validateRegisterUser } from '../validation/auth.validator.js';
import authUser from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post("/register", validateRegisterUser ,asyncHandler(registerController))
authRouter.post("/login", validateLoginUser, asyncHandler(loginController))
authRouter.get("/get-me", authUser, asyncHandler(getMeController))

export default authRouter;