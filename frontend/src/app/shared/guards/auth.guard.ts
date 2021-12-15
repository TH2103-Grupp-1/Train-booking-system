import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Notyf } from 'notyf';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private notyf: Notyf) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUser;
    if (currentUser != null) {
      if (currentUser.token !== undefined) {
        // authorised so return true
        return true;
      }
    }
    //  return true;
    // not logged in so redirect to login page with the return url
    this.notyf.error("Du behöver vara inloggad för att se denna sida"); // Todo: Translate
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
