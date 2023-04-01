import { Component } from '@angular/core';
import { author} from '../../interface/authors'
import {AuthorsService} from '../../services/authors.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent {
  image = `${environment.APIBaseURL}/assets/uploads/author`;

  authors!: author[];
  paginated!: any[];
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];
  count: number = 0;
  constructor(private _AuthorsService: AuthorsService) {
    _AuthorsService.getAllauthors().subscribe((authors) => {
      this.authors = authors.slice(0, 20);
      this.calculatePages();
      this.paginated = this.authors.slice(this.count, this.pageSize);
    });

    this.currentPage = 1;
    this.pageSize = 10;
    this.totalPages = 5;
    this.pages = [];
    this.paginated = [];
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.authors.length / this.pageSize);

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    let start = this.currentPage *10-10
    let end = this.currentPage *10
     this.paginated = this.authors.slice(this.currentPage *10-10,this.currentPage *10);
    this.count = this.currentPage *10-10;
    this.pageSize = this.currentPage *10;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }

    this.count += 10;
    this.pageSize += 10;
    this.paginated = this.authors.slice(this.count, this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    this.count -= 10;
    this.pageSize -= 10;
    this.paginated = this.authors.slice(this.count, this.pageSize);
  }
}
