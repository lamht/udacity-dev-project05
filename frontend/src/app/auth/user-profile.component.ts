import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-profile',
  template: `
      <li class="nav-item" *ngIf="auth.user$ | async as user">
      <a class="nav-link" >
        <i class="fas fa-user"></i> {{ user.name }} </a>
      `
})
export class UserProfileComponent {
  constructor(public auth: AuthService) {

    auth.idTokenClaims$.subscribe(token =>{
      if(token){
        console.log("token " + token?.__raw);
      }
    });
  }
}