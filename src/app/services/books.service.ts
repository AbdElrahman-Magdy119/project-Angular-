import { Injectable } from '@angular/core';
import { book } from '../interface/book';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Rate } from '../interface/Rate';
import { Review } from '../interface/review';
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

  getUserrateFromBook(id_user: any,id_book:any): Observable<Review> {
    return this.http.get<Review>(
      `http://localhost:5000/reviews/${id_user}/${id_book}`
    )
  }

  getallbookrate(state:any,userId:string): Observable<any>
  {
    return this.http.get<any>(
      `http://localhost:5000/reviews?state=${state}&id=${userId}`
    )
  }








}
