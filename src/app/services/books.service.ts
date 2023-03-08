import { Injectable } from '@angular/core';
import { book } from '../interface/book';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAllbooks(): Observable<book[]> {
    return this.http.get<book[]>('http://localhost:5000/books')
  }

  getbook(id: any): Observable<book> {
    return this.http.get<book>(
      `http://localhost:5000/books/${id}`
    )
  }

}
