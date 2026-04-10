import dotenv from 'dotenv';
dotenv.config();

if(!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables');
    process.exit(1); 
}

if(!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1); 
}

const config = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
}

export default config;