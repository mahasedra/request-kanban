import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const ACT_API = "http://localhost:8000/api/acts/"

@Injectable({
    providedIn: 'root'
})
export class ActService {

    constructor(private http: HttpClient) { }
    getAll(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get<any>(ACT_API).subscribe({
                next: (response: any) => {
                    resolve(response)
                },
                error: (e) => {
                    reject(e)
                }
            });
        })
    }
    getAct(uri: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get<any>(uri).subscribe({
                next: (response: any) => {
                    resolve(response)
                },
                error: (e) => {
                    reject(e)
                }
            });
        })
    }
    search(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get<any>(ACT_API).subscribe({
                next: (response: any) => {
                    resolve(response)
                },
                error: (e) => {
                    reject(e)
                }
            });
        })
    }
    add(payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post<any>(ACT_API, payload).subscribe({
                next: (response: any) => {
                    resolve(response)
                },
                error: (e) => {
                    reject(e)
                }
            });
        })
    }
    edit(payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.patch<any>(ACT_API + payload.id, payload).subscribe({
                next: (response: any) => {
                    resolve(response)
                },
                error: (e) => {
                    reject(e)
                }
            });
        })
    }
    remove(payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete<any>(ACT_API + payload.id).subscribe({
                next: (response: any) => {
                    resolve(response)
                },
                error: (e) => {
                    reject(e)
                }
            });
        })
    }
}
