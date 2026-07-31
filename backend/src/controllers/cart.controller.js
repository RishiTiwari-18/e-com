import productModel from "../models/product.model.js"
import AppError from "../utils/appError.js"

export const addToCart = async (req, res) => {
    const {product, quantity} = req.body
    const user = req.user

    if(!product) {
        throw new AppError("Product ID is required", 400)
    }

    const isProductExist = await productModel.findById(product)

    if(!isProductExist){
        throw new AppError("Product not found", 404)
    }
}
