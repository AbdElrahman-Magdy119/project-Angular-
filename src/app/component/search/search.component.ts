import { Component } from '@angular/core';
import { author } from '../../interface/authors'
import { AuthorsService } from '../../services/authors.service';
import { book } from '../../interface/book'
import { BooksService } from '../../services/books.service';
import { BehaviorSubject } from 'rxjs';
import { catagory } from '../../interface/category'
import { CatagoryService } from '../../services/category/catagory.service';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  authors!: author[]
  books!: book[];
  catagories!: catagory[];
  currentURL!:any;
  newsearch!:any
  newauthors!: author[]
  newbooks!: book[];
  newcatagories!: catagory[];
  checkbook:boolean = false;
  checkauthor:boolean = false;
  checkcategory:boolean = false;
  checkall:boolean = true;



  constructor(private _AuthorsService: AuthorsService, private _BooksService: BooksService, private _CatagoryService: CatagoryService,private route: ActivatedRoute) {
    _AuthorsService.getAllauthors().subscribe(authors => {
      this.authors = authors;
      this.route.queryParamMap.subscribe(params => {
        this.currentURL = params.get('path');
        this.newsearch = params.get('search');
           if( this.currentURL == '/authors')
           {
               this.newauthors =   this.authors.filter((elm) => elm.firstName.toLowerCase() ==  this.newsearch.toLowerCase())
           }
           if(this.newauthors.length > 0)
           {
             this.checkauthor = true;
             this.checkall = false;
           }

      })
    })

    _BooksService.getAllbooks().subscribe(books => {
      this.books = books;

      this.route.queryParamMap.subscribe(params => {
        this.currentURL = params.get('path');
        this.newsearch = params.get('search');
           if( this.currentURL == '/books')
           {
             this.newbooks =   this.books.filter((elm) => elm.title.toLowerCase() ==  this.newsearch.toLowerCase());
           }
           if(this.newbooks.length > 0)
           {
             this.checkbook = true;
             this.checkall = false;
           }

      })


    })

    _CatagoryService.getAllcategories().subscribe(catagories => {
      this.catagories = catagories;
          
      this.route.queryParamMap.subscribe(params => {
        this.currentURL = params.get('path');
        this.newsearch = params.get('search');
       
           if( this.currentURL == '/categories')
           {
               this.newcatagories =   this.catagories.filter((elm) => elm.name.toLowerCase() ==  this.newsearch.toLowerCase())
           }
           if(this.newcatagories.length > 0)
           {
             this.checkcategory = true;
             this.checkall = false;
           }
           

      })
        
    })

    
    
    
  }

      
     
  ngOnInit() {
   
  }

}




