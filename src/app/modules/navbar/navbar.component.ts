import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart';
import { SharedService } from 'src/app/shared/shared.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  is_loggedIn!: boolean;
  cartItem:any;
  userCart!:Cart;
  cartsList!:Cart[];

  constructor(private service: SharedService, private router: Router, private cartService:CartService) {
    this.is_loggedIn = this.service.getLogInState();
    const cart = localStorage.getItem('userCart')
    if(cart!==null){
      this.userCart = JSON.parse(cart)
      this.cartItem = this.userCart.products.length
    }  
    else{
      this.cartItem = 0
    }
    this.router.events.subscribe(() => {
      setTimeout(() => {
        this.is_loggedIn = this.service.getLogInState();
      },1500) 
    });
    if(this.service.getLogInState()){
      this.cartService.cartSubject.subscribe(data=>{
        debugger
        this.cartItem = data
      })
    }
  }

  ngOnInit(): void {
    
    
  }

  ngOnChanges() {
  }



  logout() {
    const userCart = localStorage.getItem('userCart')
    const cartsList = localStorage.getItem('cartsList')
    if(userCart!==null && cartsList!==null){
      this.userCart = JSON.parse(userCart)
      this.cartsList = JSON.parse(cartsList)
      const is_present = this.cartsList.forEach((cart,i=0) => {
        if(cart.userId == this.userCart.userId){
          this.cartsList.splice(i,1)
        }
        i++
      })
      this.cartsList.push(this.userCart)
    }
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userCart')
    localStorage.setItem('cartsList',JSON.stringify(this.cartsList))
    this.service.changeLogInState();
    setTimeout(() => {
      this.is_loggedIn = this.service.getLogInState();
    },3000)
  }

}
