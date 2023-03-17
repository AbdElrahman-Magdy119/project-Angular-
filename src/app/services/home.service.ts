import { Injectable } from '@angular/core';
import {book} from '../interface/book';
import {author} from '../interface/authors';
import {catagory} from '../interface/category';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

  getAlldata(topic:string):Observable<any[]> {
    return this.http.get<book[]>(`http://localhost:5000/${topic}/`);
  }

 



}
