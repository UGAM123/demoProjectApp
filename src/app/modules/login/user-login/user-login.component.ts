import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  is_loggedIn:boolean;
  loginForm:FormGroup;

  constructor(private service:SharedService) { 
    this.is_loggedIn = this.service.getLogInState();
    this.loginForm = new FormGroup({
      'username':new FormControl(),
      'password':new FormControl(),
    })
  }

  ngOnInit(): void {
  }

  login(){
    this.service.changeLogInState();
    console.log(this.service.getLogInState());
  }

}
