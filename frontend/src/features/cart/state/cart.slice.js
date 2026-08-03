import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items:[],
        loading:false
    },
    reducers:{
        setItems: (state, action) => {
            state.items = action.payload
        },
        addItems: (state, action) => {
            state.items.push(action.payload)
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const {setItems, addItems, setLoading} = cartSlice.actions
export default cartSlice.reducer