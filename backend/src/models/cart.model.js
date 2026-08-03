import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Cart user is required'],
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product in cart is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
            default: 1,
            min: [1, 'Quantity must be at least 1'],
        },
        size: {
            type: String,
            enum: {
                values: ['S', 'M', 'L', 'XL', 'XXL'],
                message: 'Invalid product size'
            },
        }
    }]
}, {
    timestamps: true
});

cartSchema.index({ user: 1 });


const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;