import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filteredList!: Product[];
  productList!: Product[];

  constructor() { }

  ngOnInit(): void {
    //Getting products from localStorage
    const records = localStorage.getItem('productsList');
    if (records !== null) {
      this.productList = JSON.parse(records)
    }
    this.filteredList = this.productList.filter((product:Product) => {
      if(product.discountPercentage>17){
        return product
      }
      return
    })
  }



} 
