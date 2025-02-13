import uuid from "react-native-uuid";

export default class CustomerModel {
    id: string;
    name: string;
    address: string;
    email: string;
    phone: string;

    constructor(id: string, name: string, email: string, address: string, phone: string) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }
}
