import { Component, Input } from '@angular/core';
import { book} from '../../interface/book'
import {BooksService} from '../../services/books.service';
import {author} from '../../interface/authors';
import {AuthorsService} from '../../services/authors.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
      


    books!: book[] ;
    authors!:any[];
    newbook!:book[];
   


     constructor(private _BooksService: BooksService,private _AuthorsService: AuthorsService)
     {

      _BooksService.getAllbooks().subscribe (books => {
             this.books = books.slice(0,20);
      })  
      
      
       

    }


     

     
   OnInit() {
           
  }

}
