import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { book } from 'src/app/interface/book';
import { AuthorsService } from 'src/app/services/authors.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css'],
})
export class MybooksComponent {
  books!: book[];
  authors!: any[];
  newbook!: book[];
  constructor(
    private _BooksService: BooksService,
    private _AuthorsService: AuthorsService
  ) {
    _BooksService.getAllbooks().subscribe((books) => {
      this.books = books.slice(0, 20);
    });
  }

  inputttt = new BehaviorSubject(null);

  getrate(e: any) {
    console.log(e);
  }

  OnInit() {}
}
