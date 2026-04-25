import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
        sku: {
        type: String,
        required: true,
        unique: true,
    },
    images: [String],
    // price: {
    //     amount: {
    //         type: Number,
    //         required: [true, 'Product price is required'],
    //         min: [0, 'Price must be a positive number'],
    //     },
    //     currency: {
    //         type: String,
    //         enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'],
    //         default: 'INR',
    //     }
    // },
    attributes: {
        type: Map,
        of: String,
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'Stock must be a positive number'],
    }
},{
    _id: true
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
    },
    price: {
        amount: {
            type: Number,
            required: [true, 'Product price is required'],
            min: [0, 'Price must be a positive number'],
        },
        currency: {
            type: String,
            enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY'], // Add more currencies as needed
            default: 'INR',
        }
    },
    images: [{
        type: String,
        required: [true, 'Product image is required'],
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Product seller is required'],
    },
    variants: [variantSchema],
}, {
    timestamps: true
});

const productModel = mongoose.model('Product', productSchema);
export default productModel;