import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ActService {

    constructor(private http: HttpClient) { }
    getAct(uri): Promise<any> {
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
}
