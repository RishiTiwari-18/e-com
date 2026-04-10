import config from "../config/config.js";
import userModel from "../models/user.model.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

const sendTokenResponse = (user, res, message) => {
       const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, {expiresIn: '7d'});
       res.cookie('token', token,{
              httpOnly: true,
              // secure: process.env.NODE_ENV === 'production',
              // sameSite: 'strict',
              maxAge: 7 * 24 * 60 * 60 * 1000,
       })

              res.status(201).json({
              success: true,
              message,
              user: {
                     id: user._id,
                     fullname: user.fullname,
                     email: user.email,
                     contact: user.contact,
                     role: user.role
              }
       })
}

export const registerController = async (req, res) => {
       const { fullname, email, password, contact } = req.body;

       const isUserExist = await userModel.exists({
              $or: [
                     { email: email },
                     { contact: contact }
              ]
       })

       if (isUserExist) {
              throw new AppError('User already exists', 409);
       }

       const user = await userModel.create({
              fullname,
              email,
              password,
              contact
       });

       sendTokenResponse(user, res, 'User registered successfully');
}

export const loginController = async (req, res) => {
       const { email, password } = req.body;
       const user = await userModel.findOne({ email }).select('+password');

       if (!user || !(await user.comparePassword(password))) {
              throw new AppError('Invalid email or password', 401);
       }

       sendTokenResponse(user, res, 'User logged in successfully');
}

export const getMeController = async (req, res) => {
       const user = await userModel.findById(req.user.id);

       if (!user) {
              throw new AppError('User not found', 404);
       }      
       
       res.status(200).json({
              status: 'success',
              user
       })
}