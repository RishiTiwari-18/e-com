import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    summary: {
        subtotal: 0,
        shipping: 0,
        total: 0,
    },
    loading: false,
};

const calculateSummary = (items) => {
    const subtotal = items.reduce((acc, item) => {
        const price = item.product?.price || 0;
        const qty = item.quantity || 0;
        return acc + price * qty;
    }, 0);
    const shipping = subtotal >= 999 ? 0 : 99;
    return {
        subtotal,
        shipping,
        total: subtotal + shipping,
    };
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            const payload = action.payload || { items: [], summary: { subtotal: 0, shipping: 0, total: 0 } };
            state.items = payload.items || [];
            state.summary = payload.summary || calculateSummary(state.items);
        },
        updateItemQuantity: (state, action) => {
            const { itemId, quantity } = action.payload;
            const item = state.items.find((i) => i._id === itemId || i.id === itemId);
            if (item) {
                item.quantity = quantity;
                state.summary = calculateSummary(state.items);
            }
        },
        deleteItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((i) => i._id !== itemId && i.id !== itemId);
            state.summary = calculateSummary(state.items);
        },
        addItems: (state, action) => {
            const payload = action.payload;
            if (payload && Array.isArray(payload.items)) {
                state.items = payload.items;
                state.summary = payload.summary || calculateSummary(state.items);
            } else if (payload && !Array.isArray(payload)) {
                state.items = payload.items || state.items;
                state.summary = payload.summary || calculateSummary(state.items);
            } else {
                state.items.push(payload);
                state.summary = calculateSummary(state.items);
            }
        },
        setSubtotal: (state, action) => {
            state.summary.subtotal = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
            state.summary = { subtotal: 0, shipping: 0, total: 0 };
            state.loading = false;
        },
    },
});

export const { setItems, addItems, setSubtotal, setLoading, updateItemQuantity, deleteItem, clearCart } =
    cartSlice.actions;

const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector([selectCartState], (cart) => cart.items);

export const selectCartSummary = createSelector(
    [selectCartState],
    (cart) => cart.summary || { subtotal: 0, shipping: 0, total: 0 }
);

export const selectCartSubtotal = createSelector([selectCartSummary], (summary) => summary.subtotal);

export const selectCartLoading = createSelector([selectCartState], (cart) => cart.loading);

export const selectCartItemById = createSelector(
    [selectCartItems, (_, itemId) => itemId],
    (items, itemId) => items.find((i) => i._id === itemId || i.id === itemId)
);

export const selectCartItemCount = createSelector([selectCartItems], (items) =>
    items.reduce((acc, item) => acc + (item.quantity || 0), 0)
);

export const selectCartUniqueItemCount = createSelector(
    [selectCartItems],
    (items) => items.length
);

export default cartSlice.reducer;
