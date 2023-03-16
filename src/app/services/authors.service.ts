import { Injectable } from '@angular/core';
import {author} from '../interface/authors';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { book } from '../interface/book';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

    
  constructor(private http:HttpClient) { }

  getAllauthors():Observable<author[]> {
    return this.http.get<author[]>('http://localhost:5000/authors/');
  }
  
  getauthor(id:any):Observable<author> {
    return this.http.get<author>(
      `http://localhost:5000/authors/${id}`
    );
   
  }




}
