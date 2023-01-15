import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse, IApiTokenResponse } from 'app/interfaces/ApiResponse';
import { ICredentials } from 'app/interfaces/ApiCredentials';

const AUTH_API = 'http://localhost:8080/api/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(
                AUTH_API + 'signin',
                {
                    email,
                    password,
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

    register(username: string, email: string, password: string): Observable<any> {
        return this.http.post(
            AUTH_API + 'signup',
            {
                username,
                email,
                password,
            },
            httpOptions
        );
    }

    logout(): Observable<any> {
        return this.http.post(AUTH_API + 'signout', {}, httpOptions);
    }

    isAuthenticated(): Promise<boolean> {
        return new Promise((resolve) => {
            this.http.get<IApiResponse>(AUTH_API).subscribe({
                next: (response: IApiResponse) => {
                    if (!response.success) localStorage.removeItem('token');
                    resolve(response.success);
                },
                error: (e) => {
                    localStorage.removeItem('token');
                    resolve(false);
                },
            });
        });
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