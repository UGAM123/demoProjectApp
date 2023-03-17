import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Cart } from './interfaces/cart';
import { Product } from './interfaces/product';
import { User } from './interfaces/user';
import { SharedService } from './shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AppResolver implements Resolve<any> {
  temp:any;
  productsList!:Product[];
  cartsList!:Cart[];
  usersList!:User[]

  constructor(private service:SharedService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const productsRecords = localStorage.getItem("productsList");
    const cartsRecords = localStorage.getItem("cartsList");
    const usersRecords = localStorage.getItem("usersList");

    //Adds products to Local Storage if doesn't exist
    this.service.getAllProducts().subscribe(res => {
      this.temp = res;
      this.productsList = this.temp.products;
      this.productsList.forEach(product => {
        product.quantity = 1;
      })
      if(productsRecords==null || productsRecords=="[]"){
        localStorage.setItem("productsList",JSON.stringify(this.productsList))
      }
    })

    //Adds carts to Local Storage if doesn't exist
    this.service.getAllCarts().subscribe(res => {
      this.temp = res;
      this.cartsList =this.temp.carts;
      if(cartsRecords==null || cartsRecords=="[]"){
        localStorage.setItem("cartsList",JSON.stringify(this.cartsList))
      }
    })
    
    //Adds users to Local Storage if doesn't exist
    this.service.getAllUsers().subscribe(res => {
      this.temp=res;
      this.usersList = this.temp.users;
      if(usersRecords==null || usersRecords=="[]"){
        localStorage.setItem("usersList",JSON.stringify(this.usersList))
      }
    })
    return this.service.getAllProducts();
  }
}