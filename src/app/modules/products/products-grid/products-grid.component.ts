import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { SharedService } from 'src/app/shared/shared.service';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit {
  @Input() filteredList!:Product[];
  @Input() noProducts!:boolean;
  @Output() addToCart = new EventEmitter();

  listSlice!:Product[];
  userCart!:Cart;
  constructor(private service:SharedService,private cartService:CartService, private router:Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    this.listSlice = this.filteredList.slice(0, 12);
  }

  changeQuantity(product:Product ,value:boolean){
    if(!value && product.quantity>1){
      this.filteredList.forEach((prod,i=0) =>{
        if(prod.id == product.id){
          this.filteredList[i].quantity--
        }
        i++
      })
    }
    else if(value){
      this.filteredList.forEach((prod,i=0) =>{
        if(prod.id == product.id){
          this.filteredList[i].quantity++
        }
        i++
      })
    }
  }

  callParentAddToCart(product:Product){
    this.addToCart.emit(product)
  }

  onPageChange(event:PageEvent){
    const startIndex = event.pageIndex * 12;
    let endIndex = startIndex + 12;
    if(endIndex > this.filteredList.length){
      endIndex = this.filteredList.length - 1;
    }
    this.listSlice = this.filteredList.slice(startIndex, endIndex)
  }

  isLoggedIn(product:Product){
    if(this.service.getLogInState()){
      this.callParentAddToCart(product)
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  productInCart(product:Product){
    if(this.service.getLogInState()){
      var is_present = this.cartService.productInCart(product);
      return is_present
    }
    else{
      return false
    }
  }
}
