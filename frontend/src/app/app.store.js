import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/slices/auth.slice.js'
import productReducer from '@/features/products/state/product.slice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
})

export default store