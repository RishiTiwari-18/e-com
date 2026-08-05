import productModel from "../models/product.model.js"
import AppError from "../utils/appError.js"
import cartModel from "../models/cart.model.js"
import { calculateCart } from "../utils/calculateCart.js"

export const addToCart = async (req, res) => {
    const {product, quantity = 1, size} = req.body
    const user = req.user

    if(!product) {
        throw new AppError("Product ID is required", 400)
    }

    if (!quantity || quantity < 1) {
        throw new AppError("Quantity must be at least 1", 400);
    }

    const existingProduct = await productModel.findById(product)

    if(!existingProduct){
        throw new AppError("Product not found", 404)
    }

    if( existingProduct.units < quantity){
        throw new AppError(`Only ${existingProduct.units} items are available in stock`, 400)
    }

    const cartItem = (await cartModel.findOne({user: user.id})) || await cartModel.create({user: user.id})

    const isProductInCart = cartItem.items.find(item => item.product.toString() === product && item.size === size)

    if(isProductInCart){
        if(isProductInCart.quantity + quantity > existingProduct.units) {
            throw new AppError(`Only ${existingProduct.units - isProductInCart.quantity} more items are available in stock for this size`, 400)
        }
        isProductInCart.quantity += quantity
    } else {
        cartItem.items.unshift({product, quantity, size})
    }

    await cartItem.save()

    const updatedCart = await cartModel.findOne({ user: user.id }).populate("items.product");
    const cartSummary = calculateCart(updatedCart);

    res.status(200).json({
        status: true,
        message: "Product added to cart successfully",
        data: cartSummary
    })

}

export const getCartItems = async (req, res) => {
    const user = req.user
    const cartItem = await cartModel.findOne({user: user.id}).populate("items.product")

    if(!cartItem){
        return res.status(200).json({
            status: true,
            data: {
                items: []
            }
        })
    }
    const cartSummary = calculateCart(cartItem)

    res.status(200).json({
        status: true,
        data: cartSummary
    })
}

export const updateCartItem = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if(!quantity || quantity < 1){
        throw new AppError("Quantity must be at least 1", 400)
    }

    const cart = await cartModel.findOne({ user: req.user.id });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const itemToUpdate = cart.items.id(itemId);

    if(!itemToUpdate){
        throw new AppError("Cart item not found", 404);
    }

    const product = await productModel.findById(itemToUpdate.product);

    if(!product){
        throw new AppError("Product not found", 404);
    }

    if(quantity > product.units){
        throw new AppError(`Only ${product.units} items are available in stock`, 400)
    }

    itemToUpdate.quantity = quantity;
    await cart.save();

    const updatedCart = await cartModel.findOne({ user: req.user.id }).populate("items.product");
    const cartSummary = calculateCart(updatedCart);

    res.status(200).json({
        status: true,
        message: "Cart item updated successfully",
        data: cartSummary
    });
}

export const deleteCartItem = async (req, res) => {
    const {id} = req.params

    const cart = await cartModel.findOne({user: req.user.id})

    if(!cart){
        throw new AppError("Cart not found", 404)
    }

    const item = cart.items.id(id)

    if(!item){
        throw new AppError("Cart item not found", 404)
    }

    item.deleteOne()
    await cart.save()

    const updatedCart = await cartModel.findOne({ user: req.user.id }).populate("items.product");
    
    if (!updatedCart || updatedCart.items.length === 0) {
        return res.status(200).json({
            status: true,
            message: "Cart item deleted successfully",
            data: { items: [], summary: { subtotal: 0, shipping: 0, total: 0 } }
        });
    }

    const cartSummary = calculateCart(updatedCart);

    res.status(200).json({
        status: true,
        message: "Cart item deleted successfully",
        data: cartSummary
    })
}