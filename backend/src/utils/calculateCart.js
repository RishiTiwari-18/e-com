export const calculateCart = (cart) => {
    let subtotal = 0;

    const items = cart.items.map(item => {
        const itemTotal = item.product.price * item.quantity;

        subtotal += itemTotal;

        return {
            ...item.toObject(),
            subtotal: itemTotal
        };
    });

    const shipping = subtotal >= 999 ? 0 : 99;
    // const tax = Math.round(subtotal * 0.18);

    return {
        items,
        summary: {
            subtotal,
            shipping,
            // tax,
            total: subtotal + shipping
        }
    };
};