import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  is_loggedIn:boolean;
  invalidDetails:boolean = false;
  loginForm:FormGroup;
  usersList!:User[]

  constructor(private service:SharedService, private router:Router) { 
    this.is_loggedIn = this.service.getLogInState();
    this.loginForm = new FormGroup({
      'username':new FormControl('', Validators.required),
      'password':new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
  }

  detailsValidation(){
    const disableButton = document.getElementById('login-button')
    disableButton?.setAttribute('disabled', 'true')
    const userRecords = localStorage.getItem("usersList");
    if(userRecords!==null){
      this.usersList = JSON.parse(userRecords);
      this.usersList.forEach(user =>{
        if(this.loginForm.controls['username'].value === user.username && 
        this.loginForm.controls['password'].value === user.password){
          this.service.changeLogInState();
          this.router.navigate(['/products'])
          return
        }
      })
      if(!this.service.getLogInState()){
        this.invalidDetails = true;
      }
    }
       
  }

}
