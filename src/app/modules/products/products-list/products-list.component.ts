import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  productsList!:Product[];
  activeProduct!:Product;
  filterString:string = "";
  noProducts:boolean = false;
  filteredList!:Product[];
  constructor() {  }

  ngOnInit(): void {
    const records = localStorage.getItem("productsList")
    if(records!==null){
      this.productsList = JSON.parse(records);
      this.filteredList = this.productsList;
    }
    this.activeProduct = this.productsList[0];
  }

  filterProductsByCategory(event: any){
    if(event.target.value=="all"){
      this.filteredList = this.productsList
      return
    }
    this.filteredList = this.productsList.filter((product:Product) => {
      if(product.category.toLowerCase() == event.target.value.toLowerCase()){
        return product
      }
      return
    })
    if(this.filteredList.length==0){
      this.noProducts = true;
    }  
    else{
      this.noProducts=false;
    }
  }

  filterProductsByName(){
    if(this.filterString==""){
      this.filteredList = this.productsList
    }
    this.filteredList = this.productsList.filter((product:Product) => {
      if(product.title.toLowerCase().includes(this.filterString.toLowerCase())){
        return product
      }
      return
    })
    if(this.filteredList.length==0){
      this.noProducts = true;
    }  
    else{
      this.noProducts=false;
    }
  }

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
  }
}
