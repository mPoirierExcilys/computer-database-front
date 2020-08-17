import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserLoginComponent } from './components/users/user-login/user-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'computer-database';
}
