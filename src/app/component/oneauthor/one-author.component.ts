import { Component } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { ActivatedRoute } from '@angular/router';
import { author } from 'src/app/interface/authors';
import { book } from 'src/app/interface/book';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-one-author',
  templateUrl: './one-author.component.html',
  styleUrls: ['./one-author.component.css'],
})
export class OneAuthorComponent {
  imageAuthor = `${environment.APIBaseURL}/assets/uploads/author`;
  imageBook = `${environment.APIBaseURL}/assets/uploads/book`;

  author!: author;
  authorBooks!: any;
  status = [
    { value: 'reading', viewValue: 'reading' },
    { value: 'want to read', viewValue: 'want to read' },
    { value: 'readed', viewValue: 'readed' },
  ];

  constructor(
    private _AuthorsService: AuthorsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this._AuthorsService.getauthor(paramMap.get('id')).subscribe((author) => {
        this.author = author;
      });
    });

    this.route.paramMap.subscribe((paramMap) => {
      this._AuthorsService
        .getbookOfAuthor(paramMap.get('id'))
        .subscribe((authorBooks) => {
          this.authorBooks = authorBooks;
          console.log(authorBooks);
        });
    });
  }
}
