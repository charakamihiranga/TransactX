import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderModel } from "@/model/OrderModel";
import {OrderDetailModel} from "@/model/OrderDetailModel";

interface OrderState {
    orders: OrderModel[];
    orderDetails: OrderDetailModel[];
}

const initialState: OrderState = {
    orders: [],
    orderDetails: [],
};

const placeOrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<{ order: OrderModel; orderItems: OrderDetailModel[] }>) => {
            const { order, orderItems } = action.payload;
            console.log(order, orderItems);
            state.orders.push(order);
            state.orderDetails.push(...orderItems);
        },
        removeOrder: (state, action: PayloadAction<string>) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
            state.orderDetails = state.orderDetails.filter(item => item.orderId !== action.payload);
        }
    }
});

export const { addOrder, removeOrder } = placeOrderSlice.actions;
export default placeOrderSlice.reducer;
