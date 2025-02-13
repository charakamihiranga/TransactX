import ItemModel from "@/model/ItemModel";
import {createSlice} from "@reduxjs/toolkit";

const initialState: ItemModel[] = [];

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        },
        removeItem: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        updateItem: (state, action) => {
            const index = state.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        }
    }
});
export const { addItem, removeItem, updateItem } = itemSlice.actions;
export default itemSlice.reducer;