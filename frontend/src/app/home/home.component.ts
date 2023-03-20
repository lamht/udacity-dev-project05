import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoggedIn: boolean = false;
  constructor(private auth: AuthService) {
    this.auth.user$.subscribe((user) => {
      this.isLoggedIn = user !== null;
    });
  }
}
