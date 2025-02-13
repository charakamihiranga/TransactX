export default class ItemModel {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    qty: number;
    constructor(id: string, name: string, price: number, description: string, category: string, image: string, stock: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.qty = stock;
    }
}