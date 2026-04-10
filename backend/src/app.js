import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRouter from './routes/auth.route.js';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './utils/notFound.js';

const app = express();

app.use(morgan('dev')); 
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());   
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter)

app.use(notFound)
app.use(errorHandler)

export default app;