export interface TradeOptionModel {
    id: string;
    price: number;
    stock: number;
    resource: {
        id: string;
        name: string;
    };
}