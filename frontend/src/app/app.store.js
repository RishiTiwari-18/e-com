import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/slices/auth.slice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store