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
        required: [true, 'Contact number is required'],
        unique: true,
        trim: true,
        // countryCode: String,
        // number: String,
        // full: {
        //     type: String,
        //     unique: true,
        // },
    },
    role: {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer',
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false,
    },
},{
    timestamps: true
});

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