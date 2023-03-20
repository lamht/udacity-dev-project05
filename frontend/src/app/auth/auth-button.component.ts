import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">      
      <li class="nav-item">
            <a class="nav-link btn btn-success" (click)="auth.logout({ logoutParams: { returnTo: document.location.origin } })" >
               Logout </a>            
      </li>
    </ng-container>

    <ng-template #loggedOut>
      <li class="nav-item">
            <a class="nav-link btn btn-success" (click)="auth.loginWithRedirect()" >
               Login </a>            
      </li>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}
}