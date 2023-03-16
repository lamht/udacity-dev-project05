import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean
                    | UrlTree
                    | Observable<boolean
                    | UrlTree>
                    | Promise<boolean | UrlTree> {
   if (!this.auth.user$.value) {
      this.router.navigateByUrl('/login');
    }

    return true;//this.auth.user$.value !== null;
    }

}
