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
    paginated!: any[];
    currentPage!: number;
    pageSize!: number;
    totalPages!: number;
    pages: number[] = [];
    count: number = 0;
  // books.name.tolowercase()

     constructor(private _BooksService: BooksService,private _AuthorsService: AuthorsService)
     {

      _BooksService.getAllbooks().subscribe (books => {
             this.books = books.slice(0,20);
             console.log(this.books);
             this.calculatePages();
             this.paginated = this.books.slice(this.count, this.pageSize);
             console.log(this.books);
      })
      this.currentPage = 1;
      this.pageSize = 2;
      this.totalPages = 5;
      this.pages = [];
      this.paginated = [];



    }

    calculatePages() {
      this.totalPages = Math.ceil(this.books.length / this.pageSize);

      console.log(this.totalPages);
      this.pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    }

    setPage(page: number) {
      this.currentPage = page;
    let start = this.currentPage *2-2
    let end = this.currentPage *2
     this.paginated = this.books.slice(this.currentPage *2-2,this.currentPage *2);
    this.count = this.currentPage *2-2;
    this.pageSize = this.currentPage *2;
    }

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      // console.log('next');

      this.count += 2;
      this.pageSize += 2;
      this.paginated=this.books.slice(this.count,this.pageSize)
    }

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      console.log('prev');
      this.count -= 2;
      this.pageSize -= 2;
      this.paginated = this.books.slice(this.count,this.pageSize);
    }



   OnInit() {

  }

}
