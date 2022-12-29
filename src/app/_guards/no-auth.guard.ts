import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'app/_services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean> {
        return new Promise(async (resolve) => {
            const isAuthenticated = await this.authService.isAuthenticated();

            if (isAuthenticated) this.router.navigate(['/kanban']);
            resolve(!isAuthenticated);
        });
    }
}

