import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { CartService } from '../cart/cart.service';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsList!:Product[];
  activeProduct!:Product;
  filterString:string = "";
  filterCategory:string = "all";
  noProducts:boolean = false;
  filteredList!:Product[];
  selectedView:string='grid';
  userCart!:Cart;

  constructor(private cartService:CartService, private productService:ProductsService) { }

  ngOnInit(): void {
    const records = localStorage.getItem("productsList")
    if(records!==null){
      this.productsList = JSON.parse(records);
      this.filteredList = this.productsList;
    }
    this.activeProduct = this.productsList[0];
  }

  

  changeView(event:any){
    this.selectedView = event.target.value;
  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id)
    var index = this.filteredList.findIndex(prod => prod.id == this.activeProduct.id)
    if(index > this.filteredList.length){
      this.activeProduct = this.filteredList[0]
    }
    else{
      this.activeProduct = this.filteredList[index+1]
      this.filterProducts()
    }
  }

  filterProducts(){
    const products = localStorage.getItem("productsList")
    if(products!==null){
      this.productsList = JSON.parse(products)
    }
    if(this.filterCategory=="all"){
      this.filteredList = this.productsList.filter((product:Product) => {
        if(product.title.toLowerCase().includes(this.filterString.toLowerCase())){
          return product
        }
        return
      })
    }
    else{
      this.filteredList = this.productsList.filter((product:Product) => {
        if(product.category.toLowerCase() == this.filterCategory.toLowerCase() &&
        product.title.toLowerCase().includes(this.filterString.toLowerCase())){
          return product
        }
        return
      })
    }
    
    if(this.filteredList.length==0){
      this.noProducts = true;
    }  
    else{
      this.noProducts=false;
      this.activeProduct = this.filteredList[0];
    }
  }

  filterProductsByCategory(event: any){
    this.filterCategory = event.target.value;
    this.filterProducts();
    
  }

  filterProductsByName(){
    this.filterProducts()
  }

  addProductToCart(product:Product){  
    this.cartService.addProductToCart(product);
  }
}
