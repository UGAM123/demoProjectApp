import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsList!:Product[]
  constructor() { }

  getProductList() {
    const oldRecords = localStorage.getItem('productsList');
    if (oldRecords !== null) {
      this.productsList = JSON.parse(oldRecords);
    }
  }

  deleteProduct(id: number) {
    this.getProductList()
    const index = this.productsList.findIndex((a: any) => a.id == id);
    this.productsList.splice(index, 1);
    localStorage.setItem('productsList', JSON.stringify(this.productsList));
  }


}
