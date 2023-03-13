import { Product } from "./product";

export interface Cart {
    id:number;
    products:Product[];
    total:number;
    discounterTotal:number;
    userId:number;
    totalProducts:number;
    totalQuantity:number
}
