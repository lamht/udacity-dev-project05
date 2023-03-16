import { Component, OnInit } from '@angular/core';

import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-menu-button',
  templateUrl: './auth-menu-button.component.html',
  styleUrls: ['./auth-menu-button.component.scss'],
})
export class AuthMenuButtonComponent implements OnInit {

  constructor(
    private auth: AuthService
    ) {}

  
  ngOnInit() {}

}
