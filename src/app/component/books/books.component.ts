import { Component, Input, OnInit } from '@angular/core';
import { book } from '../../interface/book'
import { BooksService } from '../../services/books.service';
import { author } from '../../interface/authors';
import { AuthorsService } from '../../services/authors.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/interface/review';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  image = `${environment.APIBaseURL}/assets/uploads/book`;

  books!: book[];
  authors!: any[];
  newbook!: book[];
  paginated!: any[];
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];
  count: number = 0;
  // books.name.tolowercase()
  allbookReviews: any[] = [];
  constructor(
    private _BooksService: BooksService,
    private _AuthorsService: AuthorsService,
    private ReviewService: ReviewService
  ) {

    _BooksService.getAllbooks().subscribe(books => {
      this.books = books.slice(0, 20);
      console.log(this.books);
      this.calculatePages();
      this.paginated = this.books.slice(this.count, this.pageSize);
      console.log(this.books);
    })
    this.currentPage = 1;
    this.pageSize = 10;
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
    let start = this.currentPage * 10 - 10
    let end = this.currentPage * 10
    this.paginated = this.books.slice(this.currentPage * 10 - 10, this.currentPage * 10);
    this.count = this.currentPage * 10 - 10;
    this.pageSize = this.currentPage * 10;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    // console.log('next');

    this.count += 10;
    this.pageSize += 10;
    this.paginated = this.books.slice(this.count, this.pageSize)
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    console.log('prev');
    this.count -= 10;
    this.pageSize -= 10;
    this.paginated = this.books.slice(this.count, this.pageSize);
  }



  ngOnInit() {
    this._BooksService.getAllbooks().subscribe(books => {
      books.forEach(book => {
        this._BooksService.getbookrate(book._id).subscribe(rate => {
          this.allbookReviews.push(rate.avg);
        });
      })
    })

    console.log("all revies", this.allbookReviews)

  }


}
