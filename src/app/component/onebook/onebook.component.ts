import { Component } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {AuthorsService} from '../../services/authors.service';
import{book} from '../../../app/interface/book'
import { ActivatedRoute } from '@angular/router';
import {author} from '../../interface/authors';
@Component({
  selector: 'app-onebook',
  templateUrl: './onebook.component.html',
  styleUrls: ['./onebook.component.css']
})
export class OnebookComponent {
    
     book!:book;
     author!:author;
  constructor(private _BooksService: BooksService, private route: ActivatedRoute,private _AuthorsService: AuthorsService) {
              
    this.route.paramMap.subscribe((paramMap) => {
      _BooksService.getbook( paramMap.get('id')).subscribe (book => {
       this.book = book;

       console.log( this.book );
     })   
    })

    // _AuthorsService.getauthor(this.book.authorId).subscribe(author => {
    //        this.author = author;
    //        console.log( this.author );   
    //  }) 

   
  }
}


