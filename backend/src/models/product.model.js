import mongoose from "mongoose";

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
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a positive number'],
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
    units: {
        type: Number,
        required: [true, 'Product units is required'],
        default: 0,
        min: [0, 'Units must be a positive number'],
    },
    category: {
        type: String,
        enum: {
            values: ['tshirt', 'sweatshirt', 'cap', 'cargo', 'hoodie', 'jacket', 'jeans', 'shorts', 'shoes'],
            message: 'Invalid product category'
        },
        required: [true, 'Product category is required'],
    },
    size: {
        type: String,
        enum: {
            values: ['S', 'M', 'L', 'XL', 'XXL'],
            message: 'Invalid product size'
        },
    },
    hasSizes: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

const productModel = mongoose.model('Product', productSchema);
export default productModel;