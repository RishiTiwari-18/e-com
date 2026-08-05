import api from "@/lib/axios"

export const addCartItem = async (data) => {
    const response = await api.post('/cart/add', data)
    return response.data
}

export const getCartItems = async () => {
    const response = await api.get('/cart')
    return response.data
}

export const updateCartItem = async (itemId, data) => {
    const response = await api.patch(`/cart/update/${itemId}`, data)
    return response.data
}

export const deleteCartItem = async (itemId) => {
    const response = await api.delete(`/cart/delete/${itemId}`)
    return response.data
}