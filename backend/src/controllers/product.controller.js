import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";
import AppError from "../utils/appError.js";

export const createProduct = async (req, res) => {

    const { title, description, amount, currency} = req.body;
    const user = req.user;

    const images = await Promise.all(req.files.map(async (file) => {
        const result = await uploadFile(file.buffer, file.originalname);
        return result.url;
    }));

    const product = await productModel.create({
        title,
        description,
        price: {
            amount,
            currency:currency || 'INR'
        },
        images,
        seller: user.id
    });

    res.status(201).json({ success: true, message: "Product created successfully", product });

}

export const getSellerProducts = async (req, res) => {
    const user = req.user;

    const products = await productModel.find({ seller: user.id });

    res.status(200).json({ success: true, products});
}

export const getProducts = async (req, res) => {
    const products = await productModel.find()
    res.status(200).json({ success: true, products});
}

export const getSingleProduct = async (req, res) => {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
}
