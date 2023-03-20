import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { LoginRoutingModule } from './login-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'


@NgModule({
  declarations: [
    UserLoginComponent,
    UserRegisterComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [  
    MatDatepickerModule,
    MatNativeDateModule  
  ],
})
export class LoginModule { }
