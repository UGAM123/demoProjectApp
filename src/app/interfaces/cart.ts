
//Model for Cart
export interface Cart {
    id:number;
    products:any[];
    total:number;
    discountedTotal:number;
    userId:number;
    totalProducts:number;
    totalQuantity:number
}
