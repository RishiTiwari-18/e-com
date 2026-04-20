import { Router } from "express"
import { isSeller } from "../middlewares/role.middleware.js"
import asyncHandler from "../middlewares/asyncHandler.js"
import { createProduct, getProducts } from "../controllers/product.controller.js"
import authUser from "../middlewares/auth.middleware.js"
import multer from "multer"
import { validateCreateProduct } from "../validation/product.validator.js"

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }) // 5MB limit

const productRouter = Router()

productRouter.post("/", authUser, isSeller, upload.array("images", 7), validateCreateProduct, asyncHandler(createProduct))

productRouter.get("/seller", authUser, isSeller, asyncHandler(getProducts))

export default productRouter