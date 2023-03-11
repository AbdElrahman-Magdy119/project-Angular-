import { Injectable } from '@angular/core';
import {catagory} from '../../interface/category';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor(private http:HttpClient) { }

  getAllcategories():Observable<catagory[]> {
    return this.http.get<catagory[]>('http://localhost:5000/categories');
  }

  getcategory(id:any):Observable<catagory> {
    return this.http.get<catagory>(
      `http://localhost:5000/categories/${id}`
    );
   
  }






}

