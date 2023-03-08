import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../services/authors.service';
import { book } from '../../../app/interface/book'
import { ActivatedRoute } from '@angular/router';
import { author } from 'src/app/interface/authors';
@Component({
  selector: 'app-onebook',
  templateUrl: './onebook.component.html',
  styleUrls: ['./onebook.component.css']
})
export class OnebookComponent {
  book!: book;
  author!: any;
  constructor(private _BooksService: BooksService, private route: ActivatedRoute, private _AuthorsService: AuthorsService) {
    this.route.paramMap.subscribe((paramMap) => {
      this._BooksService.getbook(paramMap.get('id')).subscribe(book => {
        this.book = book;
        this.author=this.book?.authorId;
      })
    })
  }

  ngOnInit() {

  }
}


