import api from "@/lib/axios"

export const createProduct = async (productData) => {
    const response = await api.post('/products', productData)
    return response.data
}

export const getSellerProducts = async () => {
    const response = await api.get('/products/seller')
    return response.data
}

export const getAllProducts = async () => {
    const response = await api.get('/products')
    return response.data
}

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
}