import CustomerModel from "@/model/CustomerModel";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {state} from "sucrase/dist/types/parser/traverser/base";

const initialState: CustomerModel[] = [];



const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<CustomerModel>) => {
            state.push(action.payload);
        },
        removeCustomer: (state, action: PayloadAction<string>) => {
            return state.filter(customer => customer.id !== action.payload);
        },
        updateCustomer: (state, action: PayloadAction<CustomerModel>) => {
            console.log(action.payload);
            const index = state.findIndex(customer => customer.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
            return state;
        }
    }
});
export const {addCustomer, removeCustomer, updateCustomer} = customerSlice.actions;
export default customerSlice.reducer;