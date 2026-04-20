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

if(!process.env.GOOGLE_CLIENT_ID) {
    console.error('GOOGLE_CLIENT_ID is not defined in environment variables');
    process.exit(1); 
}

if(!process.env.GOOGLE_CLIENT_SECRET) {
    console.error('GOOGLE_CLIENT_SECRET is not defined in environment variables');
    process.exit(1); 
}

if(!process.env.IMAGEKIT_PUBLIC_KEY) {
    console.error('IMAGEKIT_PUBLIC_KEY is not defined in environment variables');
    process.exit(1); 
}

if(!process.env.IMAGEKIT_PRIVATE_KEY) {
    console.error('IMAGEKIT_PRIVATE_KEY is not defined in environment variables');
    process.exit(1); 
}


const config = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    imagekitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    imagekitPrivateKey: process.env.IMAGEKIT_PRIVATE_KEY
}

export default config;