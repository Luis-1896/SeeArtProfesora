import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private autenticacionService: AutenticacionService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> {
    return new Promise(resolve => {
      this.autenticacionService.user.subscribe(user => {
        if (user) {
          // this.router.navigate(['/bienvenido']);
          resolve(true);
        } else {
          this.router.navigate(['/']);
          resolve(false);
        }
      });
    });
  }

}
