import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isLoggedIn: boolean = false;
  constructor(private auth: AuthService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      this.isLoggedIn = user !== null;
      this.redirect();
    });
    this.redirect();
  }
  redirect(){
    if(this.isLoggedIn){
      this.router.navigate(['feed']);
    }
  }
}
