import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
    ) {
      this.auth.user$.subscribe((user) => {
        this.isLoggedIn = user !== null;
      });
    }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean
                    | UrlTree
                    | Observable<boolean
                    | UrlTree>
                    | Promise<boolean | UrlTree> {
   if (!this.isLoggedIn) {
      this.router.navigateByUrl('/home');
    }

    return this.isLoggedIn;//this.auth.user$.value !== null;
    }

}
