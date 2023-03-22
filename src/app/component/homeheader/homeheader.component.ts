import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { book} from '../../interface/book';
import {BooksService} from '../../../app/services/books.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-homeheader',
  templateUrl: './homeheader.component.html',
  styleUrls: ['./homeheader.component.css'],
})
export class HomeheaderComponent {
  image = `${environment.APIBaseURL}/assets/uploads/book`;

  books!: book[];

  constructor(private _BookService: BooksService) {
    this._BookService.getAllbooks().subscribe((books) => {
      this.books = books;
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    margin: 8,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 8,
      },
    },
    nav: true,
  };
}
