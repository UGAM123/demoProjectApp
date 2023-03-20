import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  product!:Product
  productsList!: Product[]
  constructor() { }

  getEmptyProduct(): Product {
    this.product = {
      'id' :0,
      'title': '',
      'description': '',
      'price': 0,
      'discountPercentage': 0,
      'rating': 0,
      'stock': 0,
      'brand': '',
      'category': '',
      'thumbnail': '',
      'images': [],
      'quantity':1
    }
    return this.product
  }

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
