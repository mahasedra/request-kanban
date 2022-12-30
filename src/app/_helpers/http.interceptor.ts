import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'app/_services/token-storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private tokenStorage: TokenStorageService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string | null = this.tokenStorage.getToken();

        if (token) {
            const authenticatedRequest: HttpRequest<any> = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + token),
                withCredentials: true,
            });

            return next.handle(authenticatedRequest);
        } else {
            return next.handle(req);
        }
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];