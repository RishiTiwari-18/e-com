import { useDispatch } from "react-redux";
import { useCallback, useRef, useEffect } from "react";
import { toast } from "sonner";
import store from "@/app/app.store";
import {
    setItems,
    addItems,
    setLoading,
    updateItemQuantity,
    deleteItem,
    selectCartItemById,
} from "../state/cart.slice";
import {
    addCartItem,
    getCartItems,
    updateCartItem,
    deleteCartItem,
} from "../service/cart.service";

const DEBOUNCE_MS = 300;

const useCart = () => {
    const dispatch = useDispatch();
    const debounceTimers = useRef(new Map());
    const pendingSnapshots = useRef(new Map());

    useEffect(() => {
        const timers = debounceTimers.current;
        return () => {
            timers.forEach((t) => clearTimeout(t));
            timers.clear();
        };
    }, []);

    const handleSetCartItems = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const response = await getCartItems();
            dispatch(setItems(response.data));
        } catch (error) {
            const message = error?.response?.data?.error || 'Something went wrong'
            throw new Error(message);
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const handleAddCartItems = useCallback(async (item) => {
        try {
            dispatch(setLoading(true));
            const response = await addCartItem(item);
            dispatch(addItems(response.data));
        } catch (error) {
            const message = error?.response?.data?.error || 'Something went wrong'
            throw new Error(message)
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const syncUpdateWithServer = useCallback(
        async (itemId, quantity, snapshotQty) => {
            try {
                dispatch(setLoading(true));
                const response = await updateCartItem(itemId, { quantity });
                dispatch(setItems(response.data));
                pendingSnapshots.current.delete(itemId);
            } catch (error) {
                if (snapshotQty !== undefined) {
                    dispatch(updateItemQuantity({ itemId, quantity: snapshotQty }));
                }
                pendingSnapshots.current.delete(itemId);
                throw new Error(
                    error.response?.data?.message ||
                        error.response?.data?.error ||
                        error.message ||
                        "Failed to update cart"
                );
            } finally {
                dispatch(setLoading(false));
            }
        },
        [dispatch]
    );

    const handleUpdateCartItem = useCallback(
        (itemId, data) => {
            const { quantity } = data;
            if (quantity === undefined) return;

            const existingTimer = debounceTimers.current.get(itemId);
            if (existingTimer) {
                clearTimeout(existingTimer);
                debounceTimers.current.delete(itemId);
            }

            if (!pendingSnapshots.current.has(itemId)) {
                const state = store.getState();
                const existing = selectCartItemById(state, itemId);
                pendingSnapshots.current.set(itemId, existing?.quantity ?? quantity);
            }

            dispatch(updateItemQuantity({ itemId, quantity }));

            const snapshotQty = pendingSnapshots.current.get(itemId);

            const timer = setTimeout(() => {
                debounceTimers.current.delete(itemId);
                syncUpdateWithServer(itemId, quantity, snapshotQty).catch((err) => {
                    console.error("Sync update failed:", err);
                    toast.error(err.message || "Failed to update cart");
                });
            }, DEBOUNCE_MS);

            debounceTimers.current.set(itemId, timer);

            return Promise.resolve();
        },
        [dispatch, syncUpdateWithServer]
    );

    const handleUpdateCartItemImmediate = useCallback(
        async (itemId, data) => {
            const { quantity } = data;
            if (quantity === undefined) return;

            const existingTimer = debounceTimers.current.get(itemId);
            if (existingTimer) {
                clearTimeout(existingTimer);
                debounceTimers.current.delete(itemId);
            }

            const state = store.getState();
            const existing = selectCartItemById(state, itemId);
            const snapshotQty = existing?.quantity;

            dispatch(updateItemQuantity({ itemId, quantity }));

            try {
                dispatch(setLoading(true));
                const response = await updateCartItem(itemId, { quantity });
                dispatch(setItems(response.data));
                pendingSnapshots.current.delete(itemId);
            } catch (error) {
                if (snapshotQty !== undefined) {
                    dispatch(updateItemQuantity({ itemId, quantity: snapshotQty }));
                }
                pendingSnapshots.current.delete(itemId);
                throw new Error(
                    error.response?.data?.message ||
                        error.response?.data?.error ||
                        error.message ||
                        "Failed to update cart"
                );
            } finally {
                dispatch(setLoading(false));
            }
        },
        [dispatch]
    );

    const handleDeleteCartItem = useCallback(
        async (itemId) => {
            const existingTimer = debounceTimers.current.get(itemId);
            if (existingTimer) {
                clearTimeout(existingTimer);
                debounceTimers.current.delete(itemId);
            }

            const state = store.getState();
            const itemsSnapshot = state.cart.items;
            const summarySnapshot = state.cart.summary;

            dispatch(deleteItem(itemId));

            try {
                dispatch(setLoading(true));
                const response = await deleteCartItem(itemId);
                dispatch(setItems(response.data));
                pendingSnapshots.current.delete(itemId);
            } catch (error) {
                dispatch(setItems({ items: itemsSnapshot, summary: summarySnapshot }));
                pendingSnapshots.current.delete(itemId);
                throw new Error(
                    error.response?.data?.message ||
                        error.response?.data?.error ||
                        error.message ||
                        "Failed to delete cart item"
                );
            } finally {
                dispatch(setLoading(false));
            }
        },
        [dispatch]
    );

    return {
        handleSetCartItems,
        handleAddCartItems,
        handleUpdateCartItem,
        handleUpdateCartItemImmediate,
        handleDeleteCartItem,
    };
};

export default useCart;
