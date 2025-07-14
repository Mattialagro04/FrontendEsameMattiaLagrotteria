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
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
    console.log('[RoleGuard] constructor');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    console.log('[RoleGuard] canActivate called');

    const allowedRoles = route.data['roles'] as Array<string>;

    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        console.log('[RoleGuard] current user:', user);
        if (user && allowedRoles.includes(user.ruolo)) {
          console.log('[RoleGuard] access granted');
          return true;
        } else {
          console.log('[RoleGuard] access denied, redirect to /access-denied');
          return this.router.createUrlTree(['/access-denied']);
        }
      })
    );
  }
}
