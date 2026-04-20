import api from "@/lib/axios"

export const createProduct = async (productData) => {
    const response = await api.post('/products', productData)
    return response.data
}

export const getProducts = async () => {
    const response = await api.get('/products/seller')
    return response.data
}