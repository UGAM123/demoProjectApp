import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() filteredList!:Product[]
  @Input() activeProduct!:Product;
  @Input() noProducts!:boolean;
  constructor() {  }

  ngOnInit(): void {
  }

  deleteProduct(id:number){

  }
/*
  deleteProduct(id:number){
    const oldRecords =localStorage.getItem('productsList');
    if(oldRecords!==null){
      const products = JSON.parse(oldRecords);
      const index = products.findIndex((a:any) => a.id == id);
      products.splice(index,1);
      this.activeProduct = this.filteredList[index+1];
      localStorage.setItem('productsList',JSON.stringify(products));
    }
    const records = localStorage.getItem("productsList");
    if(records!==null){
      this.productsList = JSON.parse(records) ;
      this.filterProductsByName();
    }
  }*/
}
