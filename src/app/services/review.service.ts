import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient)
  {
      
    if(localStorage.getItem('userToken') != null) {
      this.saveusertoken(); 
      }
   }

   usertoken = new BehaviorSubject(null);



   saveusertoken()
   {
     let token:any =localStorage.getItem('userToken')
     this.usertoken.next( token) ;
   }



   addreviewToBook(data: any): void {
        this.http.post('http://localhost:5000/reviews/',data,
        {
          headers: new HttpHeaders().set('x-token',`${this.usertoken.value}`),
        })

        
        .subscribe( res =>{
        })
  }

   
  deleteReview(id: any): void {
    this.http.delete(`http://localhost:5000/reviews/${id}`,
    {
      headers: new HttpHeaders().set('x-token',`${this.usertoken.value}`),
    })

    
    .subscribe( res =>{
    })
}


   updatereview(data:any,id:any)
   {
    this.http.patch(`http://localhost:5000/reviews/${id}`,data,
    {
      headers: new HttpHeaders().set('x-token',`${this.usertoken.value}`),
    })

    
    .subscribe( res =>{
    })

   }






}
