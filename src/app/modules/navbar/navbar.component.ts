import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  is_loggedIn!: boolean;
  constructor(private service: SharedService, private router: Router) {
    this.is_loggedIn = this.service.getLogInState();
    this.router.events.subscribe(() => {
      this.is_loggedIn = this.service.getLogInState();
    });
  }

  ngOnInit(): void {
    const loggedIn = localStorage.getItem("login")
    if (loggedIn !== null) {

    }
  }

  ngOnChanges() {
    this.is_loggedIn = this.service.getLogInState();
  }



  logout() {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userCart')
    this.service.changeLogInState();
    this.is_loggedIn = this.service.getLogInState();
  }

}
