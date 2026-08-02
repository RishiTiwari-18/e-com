import productModel from "../models/product.model.js"
import AppError from "../utils/appError.js"
import cartModel from "../models/cart.model.js"

export const addToCart = async (req, res) => {
    const {product, quantity = 1, size} = req.body
    const user = req.user

    if(!product) {
        throw new AppError("Product ID is required", 400)
    }

    if (!size) {
        throw new AppError("Size is required", 400);
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

    res.status(200).json({
        status: true,
        message: "Product added to cart successfully",
        data: cartItem
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

    res.status(200).json({
        status: true,
        data: cartItem
    })
}
