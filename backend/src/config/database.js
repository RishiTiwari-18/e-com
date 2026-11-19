import mongoose from "mongoose";
import config from "./config.js";
import userModel from "../models/user.model.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI)

        // Existing Google users were saved with contact: null, which the old
        // unique index treated as a duplicate key.
        await userModel.collection.updateMany(
            { contact: null },
            { $unset: { contact: "" } }
        );
        await userModel.syncIndexes();

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
}

export default connectDB;