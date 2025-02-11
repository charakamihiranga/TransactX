import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) =>
            state.filter(item => item.id !== action.payload),

        updateQuantity: (state, action: PayloadAction<{ id: number; change: number }>) => {
            const item = state.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.change;
                if (item.quantity <= 0) return state.filter(i => i.id !== action.payload.id);
            }
        },

        clearCart: () => []  // Clears the cart
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
