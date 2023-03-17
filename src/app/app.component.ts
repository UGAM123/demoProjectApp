import { Component } from '@angular/core';
import { slideAnimation } from './app.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideAnimation]
})
export class AppComponent {
  title = 'DemoProjectApp';
  is_loggedIn = false;
  constructor(){
  }


}
