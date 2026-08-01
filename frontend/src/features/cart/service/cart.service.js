const addCartItem = async (data) => {
    const response = await api.post('/cart/add', data)
    return response.data
}

const getCartItems = async () => {
    const response = await api.get('/cart')
    return response.data
}