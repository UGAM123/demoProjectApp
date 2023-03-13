import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  is_loggedIn = false;

  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get("https://dummyjson.com/products?limit=100");
  }

  getAllCarts(){
    return this.http.get("https://dummyjson.com/carts");
  }

  getAllUsers(){
    return this.http.get("https://dummyjson.com/users?limit=100");
  }

  getLogInState(){
    return this.is_loggedIn;
  }

  changeLogInState(){
    this.is_loggedIn = !this.is_loggedIn;
  }
}
