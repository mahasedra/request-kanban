import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequest } from 'app/interfaces/Request';
import { rejects } from 'assert';
import { error } from 'console';
import { Observable } from 'rxjs';

const REQUEST_API = 'http://localhost:8080/api/request/';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  get(): Promise<IRequest[]> {
    return new Promise((resolve, reject) => {
      this.http.get<IRequest[]>(REQUEST_API).subscribe({
        next: (response: IRequest[]) => {
          resolve(response)
        },
        error: (e) => {
          reject(e)
        }
      });
    })
  }
  update(payload: IRequest): Promise<IRequest> {
    return new Promise((resolve, reject) => {
      this.http.put<IRequest>(REQUEST_API + payload.id, payload).subscribe({
        next: (response: IRequest) => {
          resolve(response)
        },
        error: (e) => {
          reject(e)
        }
      });
    })
  }
}
