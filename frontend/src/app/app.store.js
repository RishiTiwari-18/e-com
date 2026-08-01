import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/slices/auth.slice.js'
import productReducer from '@/features/products/state/product.slice.js'
import cartReducer from '@/features/cart/state/cart.slice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
})

export default store