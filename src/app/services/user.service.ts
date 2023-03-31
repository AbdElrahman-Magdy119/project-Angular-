import { Injectable } from '@angular/core';
import { user } from '../interface/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getuser(email: String): Observable<user> {
    return this.http.get<user>(`http://localhost:5000/users/${email}`);
  }
  getAllUser(): Observable<user[]> {
    return this.http.get<user[]>(`http://localhost:5000/users`);
  }
}

