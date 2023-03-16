import { Injectable } from '@angular/core';
import { book } from '../interface/book';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Rate } from '../interface/Rate';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {
         
   }

  getAllbooks(): Observable<book[]> {
    return this.http.get<book[]>('http://localhost:5000/books/')
  }

  getbook(id: any): Observable<book> {
    return this.http.get<book>(
      `http://localhost:5000/books/${id}`
    )
  }

     
  getbookrate(id: any): Observable<Rate> {
    return this.http.get<Rate>(
      `http://localhost:5000/ratings/${id}`
    )
  }

  getbookreviews(id: any): Observable<Rate> {
    return this.http.get<Rate>(
      `http://localhost:5000/reviews/${id}`
    )
  }

  getUserrateFromBook(id_user: any,id_book:any): Observable<Rate> {
    return this.http.get<Rate>(
      `http://localhost:5000/reviews/${id_user}/${id_book}`
    )
  }




}
