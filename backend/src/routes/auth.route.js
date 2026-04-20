import { Router } from 'express';
import { getMeController, googleAuthController, loginController, registerController } from '../controllers/auth.controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { validateLoginUser, validateRegisterUser } from '../validation/auth.validator.js';
import authUser from '../middlewares/auth.middleware.js';
import passport from 'passport';

const authRouter = Router();

authRouter.post("/register", validateRegisterUser ,asyncHandler(registerController))
authRouter.post("/login", validateLoginUser, asyncHandler(loginController))
authRouter.get("/get-me", authUser, asyncHandler(getMeController))
authRouter.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

authRouter.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: 'http://localhost:5173/login' }), asyncHandler(googleAuthController))

export default authRouter;

