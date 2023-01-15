import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse, IApiTokenResponse } from 'app/interfaces/ApiResponse';
import { ICredentials } from 'app/interfaces/ApiCredentials';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:8000/api/token/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

    login(username: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(
                AUTH_API,
                {
                    username: username,
                    password: password,
                },
                httpOptions
            ).subscribe({
                next: (response: any) => {
                    resolve(response)
                },
                error: (e) => {
                    reject(e)
                }
            });;
        })
    }

    logout(): Observable<any> {
        return this.http.post(AUTH_API + 'signout', {}, httpOptions);
    }

    isAuthenticated(): Promise<boolean> {
        if (this.tokenStorage.getToken()) {
            return new Promise((resolve) => {
                this.http.post<IApiResponse>(AUTH_API + 'verify/', {
                    token: this.tokenStorage.getToken()
                }).subscribe({
                    next: (response: any) => {
                        console.log("test", response)
                        if (response.code && response.detail) {
                            this.tokenStorage.removeToken()
                            resolve(false)
                        }
                        resolve(true);
                    },
                    error: (e) => {
                        localStorage.removeItem('token');
                        resolve(false);
                    },
                });
            });
        }
        else return new Promise((resolve) => resolve(false));
    }

    getToken(credentials: ICredentials): Promise<IApiTokenResponse> {
        return new Promise((resolve, reject) => {
            this.http.post<IApiTokenResponse>(AUTH_API + "token", credentials).subscribe({
                next: (response: IApiTokenResponse) => {
                    resolve(response);
                },
                error: (e) => {
                    reject(e.error.message);
                },
            });
        });
    }

    refreshToken(credentials: ICredentials): Promise<IApiTokenResponse> {
        return new Promise((resolve, reject) => {
            const token: string | null = localStorage.getItem('token');
            this.http.post<IApiTokenResponse>(AUTH_API + "token/refresh", { refresh_token: token }).subscribe({
                next: (response: IApiTokenResponse) => {
                    resolve(response);
                },
                error: (e) => {
                    reject(e.error.message);
                },
            });
        });
    }
}