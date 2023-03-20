import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registerForm!: FormGroup;
  user!: User;
  usersList!: User[];
  passMatch: boolean = false;
  minDate: Date;
  maxDate: Date;

  constructor(private _snackBar: MatSnackBar, private router: Router) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    this.maxDate = new Date(currentYear - 10, 0, 0);
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      'maidenName': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      'lastName': new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
      'phone': new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      'birthDate': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', Validators.required),
      'confirm-password': new FormControl('', [Validators.required, this.confirmPassword]),
    })
    const userRecords = localStorage.getItem('usersList')
    if (userRecords !== null) {
      this.usersList = JSON.parse(userRecords);
    }
  }

  //Registering User
  registerUser() {
    setTimeout('',1000);
    const age = 22;
    var id = 0;
    const userRecords = localStorage.getItem('usersList')
    if (userRecords !== null) {
      this.usersList = JSON.parse(userRecords);
      id = this.usersList[this.usersList.length - 1].id
    }
    this.user = {
      'id': id + 1,
      'username': this.registerForm.controls['username'].value,
      'password': this.registerForm.controls['password'].value,
      'firstName': this.registerForm.controls['firstName'].value,
      'maidenName': this.registerForm.controls['maidenName'].value,
      'lastName': this.registerForm.controls['lastName'].value,
      'phone': this.registerForm.controls['phone'].value,
      'birthDate': this.registerForm.controls['birthDate'].value,
      'gender': this.registerForm.controls['gender'].value,
      'email': this.registerForm.controls['email'].value,
      'age': age,
    }
    this.usersList.push(this.user)
    localStorage.setItem('usersList', JSON.stringify(this.usersList))
    this.router.navigate(['/login'])
    this._snackBar.open("Registration Done.", '', {
      duration: 3000
    });
  }

  confirmPassword(control:FormControl){
    debugger
    let confirmPassword = control.value
    const password = this.registerForm.get('password')?.value;

    if(confirmPassword && password && password == confirmPassword){
      return { passwordMatch: true }
    }
    return null;
  }

  /*
    confirmPassword(control: AbstractControl): ValidationErrors | null {
      if(control && control.get('password') && control.get('confirm-password')){
        debugger
        const password = control.get('password');
        const confirm_password = control.get('confirm-password')
        return (password == confirm_password) ? { passwordMatch: true } : null
      }
      return null;
    }
  
    confirmPassword(control:FormControl):{[s:string]:boolean}{
      if(this.registerForm){
        if(this.registerForm.controls['password'].value== control.value){
          return {'passwordMatched':true}
        }
      }
      return null;
    }
  
    confirmPassword() {
      if (this.registerForm.controls['password'].value === this.registerForm.controls['confirm-password'].value) {
        this.passMatch = true;
      }
    }*/
}
