import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm:FormGroup;
  constructor() {
    this.registerForm = new FormGroup({
      'firstName':new FormControl(),
      'maidenName':new FormControl(),
      'lastName':new FormControl(),
      'phone':new FormControl(),
      'birthDate':new FormControl(),
      'gender':new FormControl(),
      'email':new FormControl(),
      'username':new FormControl(),
      'password':new FormControl(),
    })
   }

  ngOnInit(): void {
  }

}
