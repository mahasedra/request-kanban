import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequest } from 'app/interfaces/Request';

const REQUEST_API = 'http://localhost:8000/api/document_requests/';
const TREATMENT_API = 'http://localhost:8000/api/treatments/';

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
  update(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<IRequest>(TREATMENT_API, {
        document_request : REQUEST_API + payload.id + "/"
      }).subscribe({
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
