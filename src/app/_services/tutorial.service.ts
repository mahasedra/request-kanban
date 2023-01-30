import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const ACT_API = 'http://localhost:8000/api/acts/';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(ACT_API);
  }

  get(id: any): Observable<Tutorial> {
    return this.http.get(`${ACT_API}${id}/`);
  }

  create(data: any): Observable<any> {
    return this.http.post(ACT_API, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.patch(`${ACT_API}${id}/`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${ACT_API}${id}/`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(ACT_API);
  }

  findByTitle(title: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${ACT_API}?search=${title}`);
  }
}
