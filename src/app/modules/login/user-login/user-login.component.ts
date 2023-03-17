import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart';
import { User } from 'src/app/interfaces/user';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  is_loggedIn: boolean;
  invalidDetails: boolean = false;
  loggedIn: boolean = false;
  loginForm: FormGroup;
  usersList!: User[]
  cartsList!: Cart[]

  constructor(private service: SharedService, private router: Router) {
    this.is_loggedIn = this.service.getLogInState();
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }

  //Validating if the user exist
  detailsValidation() {
    const userRecords = localStorage.getItem("usersList");
    this.invalidDetails = false;
    if (userRecords !== null) {
      this.usersList = JSON.parse(userRecords);
      this.usersList.forEach(user => {
        if (this.loginForm.controls['username'].value === user.username &&
          this.loginForm.controls['password'].value === user.password) {
          this.service.changeLogInState();
          localStorage.setItem('currentUser', JSON.stringify(user));

          const cartsList = localStorage.getItem('cartsList')
          if (cartsList !== null) {
            this.cartsList = JSON.parse(cartsList)
            this.cartsList.filter((cart: Cart) => {
              if (cart.userId === user.id) {
                localStorage.setItem('userCart', JSON.stringify(cart))
              }
            })
          }
          this.router.navigate(['/products'])
          return
        }
      })
      if (!this.service.getLogInState()) {
        setTimeout(() => {
          this.invalidDetails = true;
        }, 500)
      }
      else {
        setTimeout(() => {
          this.loggedIn = true;
        }, 500)
        const disableButton = document.getElementById('login-button')
        disableButton?.setAttribute('disabled', 'true')
      }
    }
  }
}
