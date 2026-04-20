import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRouter from './routes/auth.route.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './utils/notFound.js';
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import config from './config/config.js';
import productRouter from './routes/product.route.js';

const app = express();

app.use(morgan('dev')); 
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());   
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize())

passport.use(new GoogleStrategy({
    clientID: config.googleClientId,
    clientSecret: config.googleClientSecret,
    callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {

    return done(null, profile);
}))

app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)

app.use(notFound)
app.use(errorHandler)

export default app;