import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Requests } from 'app/interfaces/Requests';

const REQUEST_API = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }
  get() {
    return this.http.get<Requests[]>(REQUEST_API);
  }
  update(payload: Requests) {
    return this.http.put(REQUEST_API + payload.id, payload);
  }
}
