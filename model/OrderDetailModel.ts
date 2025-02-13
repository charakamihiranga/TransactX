import uuid from "react-native-uuid";

export class OrderDetailModel {
    id: string;
    orderId: string;
    itemId: string;
    quantity: number;
    price: number;

    constructor(id: string, orderId: string, itemId: string, quantity: number, price: number) {
        this.id = id || uuid.v4().toString();
        this.orderId = orderId;
        this.itemId = itemId;
        this.quantity = quantity;
        this.price = price;
    }
}