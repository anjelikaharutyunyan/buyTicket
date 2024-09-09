import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        count: 0,
    },
    reducers: {
        addToCart: (state) => {
            state.count += 1;
        },
        removeFromCart: (state) => {
            if (state.count > 0) {
                state.count -= 1;
            }
        },
        setCartCount: (state, action) => {
            state.count = action.payload;
        },
    },
});

export const { addToCart, setCartCount, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
