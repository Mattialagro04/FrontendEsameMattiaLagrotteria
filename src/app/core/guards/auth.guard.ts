import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    console.log('[AuthGuard] constructor');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log('[AuthGuard] canActivate called');

    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        console.log('[AuthGuard] current user:', user);
        if (user) {
          return true;
        } else {
          console.log('[AuthGuard] user not authenticated, redirect to /auth/login');
          return this.router.createUrlTree(['/auth/login']);
        }
      })
    );
  }
}
