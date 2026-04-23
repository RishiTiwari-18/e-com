import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        sellerProducts: [],
        products: [],
        loading: false,
    },
    reducers: {
        setSellerProducts: (state, action) => {
            state.sellerProducts = action.payload;
        },
        setAllProducts: (state, action) => {
            state.products = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { setSellerProducts, setAllProducts, setLoading } = productSlice.actions;
export default productSlice.reducer;