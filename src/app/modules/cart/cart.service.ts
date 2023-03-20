import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartsList!: Cart[]
  userCart!: Cart;
  user!: User
  product: any;
  cartSubject = new Subject<any>()

  constructor() { 
    
  }

  ngOnInit(){
    
  }

  //Refreshing to get latest data after CRUD operations
  refreshUserCart() {
    const userCart = localStorage.getItem('userCart')
    if (userCart !== null) {
      this.userCart = JSON.parse(userCart)
    }
  }

  //Checking if the received product is in the cart
  productInCart(product: Product) {
    var is_present = false;
    this.refreshUserCart()
    if (this.userCart !== undefined) {
      this.userCart.products.forEach(prod => {
        if (prod.id == product.id) {
          is_present = true;
        }
      })
    }
    return is_present
  }

  //Adding product to cart
  addProductToCart(product: Product) {
    const userCart = localStorage.getItem('userCart')
    var productDiscountedPrice = product.price * product.quantity
    productDiscountedPrice -= product.price * product.quantity * product.discountPercentage / 100;

    //Making an object to represent the product
    this.product = {
      'id': product.id,
      'title': product.title,
      'price': product.price,
      'quantity': product.quantity,
      'total': product.price*product.quantity,
      'discountPercentage': product.discountPercentage,
      'discountedPrice': Math.round(productDiscountedPrice),
    }

    //Adding product to existing cart
    if (userCart !== null) {
      this.userCart = JSON.parse(userCart)
      this.userCart.products.push(this.product)
      this.userCart.discountedTotal += Math.round(productDiscountedPrice)
      this.userCart.total += product.price * product.quantity
      this.userCart.totalQuantity += product.quantity
      this.userCart.totalProducts++

      localStorage.setItem('userCart', JSON.stringify(this.userCart))
      this.cartSubject.next(this.userCart.products.length)
    }
    //Making a new cart if it doesn't exist
    else {
      const cartsList = localStorage.getItem('cartsList')
      const user = localStorage.getItem('currentUser')
      if (cartsList !== null && user !== null) {
        this.cartsList = JSON.parse(cartsList)
        this.user = JSON.parse(user)
      }
      var id = this.cartsList[this.cartsList.length - 1].id
      this.userCart = {
        'id': id,
        'products': [this.product],
        'total': product.price*product.quantity,
        'totalProducts': 1,
        'totalQuantity': product.quantity,
        'userId': this.user.id,
        'discountedTotal': Math.round(productDiscountedPrice)
      }
      localStorage.setItem('userCart', JSON.stringify(this.userCart))
      this.cartSubject.next(this.userCart.products.length)
    }
    this.refreshUserCart()
  }

  //Deleting a product from Cart
  deleteProductFromCart(product: any) {
    this.refreshUserCart()
    var index = this.userCart.products.findIndex(prod => prod.id == product.id)
    this.userCart.products.splice(index, 1)
    //If there are no products in cart deleting the cart
    if (this.userCart.products.length == 0) {
      localStorage.removeItem('userCart')
      this.cartSubject.next(0)
    }
    //Changing the cart by removing the product
    else {
      var productDiscountedPrice = product.price * product.quantity
      productDiscountedPrice -= product.price * product.quantity * product.discountPercentage / 100;
      this.userCart.discountedTotal -= Math.round(productDiscountedPrice)
      this.userCart.total -= product.price * product.quantity
      this.userCart.totalQuantity -= product.quantity
      this.userCart.totalProducts -= 1
      localStorage.setItem('userCart', JSON.stringify(this.userCart))
    }
    const userCart = localStorage.getItem('userCart')
    if (userCart !== null) {
      this.userCart = JSON.parse(userCart)
    }
    this.cartSubject.next(this.userCart.products.length)
  }

  
}