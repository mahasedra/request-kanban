import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        return new Promise(async (resolve) => {
            const isAuthenticated = await this.authService.isAuthenticated();

            if (!isAuthenticated) this.router.navigate(['/login']);
            resolve(isAuthenticated);
        });
    }
}
