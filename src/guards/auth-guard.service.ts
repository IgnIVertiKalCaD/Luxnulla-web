import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Injectable, inject } from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";
import {AuthenticationService} from "@/services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
;

  canActivate(): Observable<boolean> | boolean {

    return this.authenticationService.checkValidToken()
      .pipe(
      map(response => {
        if (response) {
          return true;
        } else {
          this.router.navigate(['/']).then(r => r);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/']).then(r => r);
        return of(false);
      })
    );
  }
}
