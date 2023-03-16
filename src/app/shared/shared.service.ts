import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  is_loggedIn: boolean;

  constructor(private http: HttpClient) {
    const userRecord = localStorage.getItem("currentUser")
    if (userRecord !== null) {
      this.is_loggedIn = true;
    }
    else {
      this.is_loggedIn = false;
    }
  }


  getAllProducts() {
    return this.http.get("https://dummyjson.com/products?limit=100");
  }

  getAllCarts() {
    return this.http.get("https://dummyjson.com/carts");
  }

  getAllUsers() {
    return this.http.get("https://dummyjson.com/users?limit=100");
  }

  getLogInState() {
    return this.is_loggedIn;
  }

  changeLogInState() {
    this.is_loggedIn = !this.is_loggedIn;
  }
}
