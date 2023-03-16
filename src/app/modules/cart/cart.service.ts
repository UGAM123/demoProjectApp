import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Injectable } from '@angular/core';
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

  constructor() { }

  refreshUserCart() {
    const userCart = localStorage.getItem('userCart')
    if (userCart !== null) {
      this.userCart = JSON.parse(userCart)
    }
  }

  addProductToCart(product: Product) {
    const userCart = localStorage.getItem('userCart')
    var productDiscountedPrice = product.price
    productDiscountedPrice -= product.price * product.discountPercentage / 100;
    this.product = {
      'id': product.id,
      'title': product.title,
      'price': product.price,
      'quantity': 1,
      'total': product.price,
      'discountPercentage': product.discountPercentage,
      'discountedPrice': Math.round(productDiscountedPrice),
    }
    if (userCart !== null) {
      this.userCart = JSON.parse(userCart)
      this.userCart.products.push(this.product)
      this.userCart.discountedTotal += Math.round(productDiscountedPrice)
      this.userCart.total += product.price
      this.userCart.totalQuantity++
      this.userCart.totalProducts++

      localStorage.setItem('userCart', JSON.stringify(this.userCart))
      console.log(this.userCart)
    }
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
        'total': product.price,
        'totalProducts': 1,
        'totalQuantity': 1,
        'userId': this.user.id,
        'discountedTotal': Math.round(productDiscountedPrice)
      }
      localStorage.setItem('userCart', JSON.stringify(this.userCart))
    }
    this.refreshUserCart()
  }

  deleteProductFromCart(product: any) {
    this.refreshUserCart()
    var index = this.userCart.products.findIndex(prod => prod.id == product.id)
    this.userCart.products.splice(index, 1)
    if (this.userCart.products.length == 0) {
      console.log("hii")
      localStorage.removeItem('userCart')
    }
    else {
      var productDiscountedPrice = product.price
      productDiscountedPrice -= product.price * product.discountPercentage / 100;
      this.userCart.discountedTotal -= Math.round(productDiscountedPrice)
      this.userCart.total -= product.price
      this.userCart.totalQuantity -= product.quantity
      this.userCart.totalProducts -= 1
      localStorage.setItem('userCart', JSON.stringify(this.userCart))
    }
    const userCart = localStorage.getItem('userCart')
    if (userCart !== null) {
      this.userCart = JSON.parse(userCart)
    }

  }






}