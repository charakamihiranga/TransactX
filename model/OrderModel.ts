import uuid from "react-native-uuid";

export class OrderModel {
    id: string;
    customerId: string;
    date: string;
    totalAmount: number;

    constructor(id: string, customerId: string, totalAmount: number, date?: string) {
        this.id = id || uuid.v4().toString();
        this.customerId = customerId;
        this.totalAmount = totalAmount;
        this.date = date || new Date().toISOString();
    }
}