import { Router } from 'express';
import { logoutController, getMeController, googleAuthController, loginController, registerController } from '../controllers/auth.controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import { validateLoginUser, validateRegisterUser } from '../validation/auth.validator.js';
import authUser from '../middlewares/auth.middleware.js';
import passport from 'passport';
import config from '../config/config.js';

const authRouter = Router();

authRouter.post("/register", validateRegisterUser ,asyncHandler(registerController))
authRouter.post("/login", validateLoginUser, asyncHandler(loginController))
authRouter.post("/logout", asyncHandler(logoutController))
authRouter.get("/get-me", authUser, asyncHandler(getMeController))
authRouter.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
)

authRouter.get("/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${config.clientUrl}/login` }), asyncHandler(googleAuthController))

export default authRouter;

