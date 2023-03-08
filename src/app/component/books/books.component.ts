import { Component } from '@angular/core';
import { book} from '../../interface/book'
import {BooksService} from '../../services/books.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {
      
    books!: book[] ;

     constructor(private _BooksService: BooksService)
     {
      _BooksService.getAllbooks().subscribe (books => {
             this.books = books;
             console.log(this.books)
      })
         
     }


   

}
