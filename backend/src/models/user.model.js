import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    contact: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer',
    },
    password: {
        type: String,
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, 
    },
    avatar: {
        type: String,
    },
}, {
    timestamps: true
});

// Unique only when a contact string is present. Google accounts omit this field,
// and a plain unique index treats every missing value as null.
userSchema.index(
    { contact: 1 },
    {
        unique: true,
        partialFilterExpression: { contact: { $type: "string" } },
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// userSchema.pre("save", function () {
//   this.phone.full = `${this.phone.countryCode}${this.phone.number}`;
// });


const userModel = mongoose.model('User', userSchema);
export default userModel;