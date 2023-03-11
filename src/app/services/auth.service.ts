import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import {Router} from '@angular/router'
import { user } from '../interface/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient,private _Router:Router )
   {
         if(localStorage.getItem('userToken') != null) {
              this.savecurrentuser();  
        }
      
       
   }
    
     currentuser = new BehaviorSubject(null);

     


   savecurrentuser()
   {
     let token:any =localStorage.getItem('userToken')
     this.currentuser.next( jwtDecode(token)) ;
   }

  
      

    
    
    


  
  register(formdata: any):Observable<any> {
    //                             path in back
    return this._HttpClient.post('http://localhost:5000/register',formdata);
  }
  login(formdata: any):Observable<any> {
    //                             path in back
    return this._HttpClient.post('http://localhost:5000/login',formdata);
  }

  logout()
  {
    localStorage.removeItem('userToken');
    this.currentuser.next(null);
    this._Router.navigate(['/login']);
  }
}
