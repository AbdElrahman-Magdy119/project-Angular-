import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent {

  userbooks!:any
  oneuser!:any
  userId!:any
  status = [
    { value: 'reading', viewValue: 'reading' },
    { value: 'want to read', viewValue: 'want to read' },
    { value: 'readed', viewValue: 'readed' },
  ];

    constructor(private router: Router,private _ActivatedRoute:ActivatedRoute,private _BooksService: BooksService,private _AuthService:AuthService)
    {
        this._ActivatedRoute.queryParamMap.subscribe(params =>{
          _AuthService.currentuser.subscribe((user) => {
            this.oneuser = user;
            this.userId = this.oneuser.user_id;
           this._BooksService.getallbookrate(params.get('state'),this.userId).subscribe(userbook => {
             this.userbooks = userbook;
             console.log(this.userbooks);
             
             
          })
       
        })
         
        })
    }



  getAllstatus(status:string)
     {
      this.router.navigate([],
        { queryParams: { state: status} }
        );
     }

     getStatus(e:any)
     {
        console.log(e.value)
     }




}
