import { Component } from '@angular/core';
import { book} from '../../interface/book'
import { author} from '../../interface/authors'
import { catagory} from '../../interface/category'
import {HomeService} from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  books!: book[] ;
  authors!: author[];
  categories!: catagory[];

  constructor(private _HomeService: HomeService)
  {
    _HomeService.getAlldata("books").subscribe (books => {
          this.books = books;
          console.log(this.books)
   })
    
   _HomeService.getAlldata("authors").subscribe (categories => {
         this.authors = categories;
         console.log(this.authors)

    _HomeService.getAlldata("categories").subscribe (categories => {
        this.categories = categories.slice(0,10);
      console.log(this.categories)
})


})






      
  }





}
