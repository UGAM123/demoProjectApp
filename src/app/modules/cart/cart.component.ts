import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user!:User;
  cartsList!: Cart[];
  userCart!: Cart;
  is_empty:boolean = false

  constructor(private cartService:CartService) {
    
  }

  ngOnInit(): void {
    this.refreshData()
  }

  //Refreshing to get latest data after making CRUD operations
  refreshData(){
    const cartRecords = localStorage.getItem('userCart')
    const userRecord = localStorage.getItem('currentUser')
    if (cartRecords !== null && userRecord!==null) {
      this.userCart = JSON.parse(cartRecords)
      this.user = JSON.parse(userRecord)
    }
    else{
      this.is_empty = true
    }
  }

  //Delete Product from cart
  delete(product:Product){
    this.cartService.deleteProductFromCart(product)
    this.refreshData( )
  }
}
