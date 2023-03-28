import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from '../../services/books.service';
import { environment } from 'src/environments/environment';
import { DropdownModule } from 'primeng/dropdown';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css'],
})
export class MybooksComponent {
  image = `${environment.APIBaseURL}/assets/uploads/book`;
  displayedColumns: string[] = [
    'Cover',
    'Title',
    'Author',
    'Avg Rate',
    'Rating',
    'Shelf',
  ];
  paginated!: any[];
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];
  count: number = 0;
  userbooks!: any;
  oneuser!: any;
  userId!: any;
  status = [
    { value: 'reading', viewValue: 'reading' },
    { value: 'want to read', viewValue: 'want to read' },
    { value: 'readed', viewValue: 'readed' },
  ];



  constructor(
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _BooksService: BooksService,
    private _AuthService: AuthService
  ) {
    this.currentPage = 1;
    this.pageSize = 2;
    this.totalPages = 5;
    this.pages = [];
    this.paginated = [];
    this._ActivatedRoute.queryParamMap.subscribe((params) => {
      _AuthService.currentuser.subscribe((user) => {
        this.oneuser = user;
        this.userId = this.oneuser.user_id;
        this._BooksService
          .getallbookrate(params.get('state'), this.userId)
          .subscribe((userbook) => {
            this.userbooks = userbook;
            this.calculatePages()
            this.paginated = this.userbooks.slice(this.count, this.pageSize);
            console.log(this.userbooks);
          });
      });
    });
  }


  getAllstatus(status: string) {
    this.router.navigate([], { queryParams: { state: status } });
  }

  getStatus(e: any) {
    console.log(e.value);
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.userbooks.length / this.pageSize);

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
    this.paginated = this.userbooks.slice(this.currentPage *2-2,this.currentPage *2);
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
    this.paginated=this.userbooks.slice(this.count,this.pageSize)
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    console.log('prev');
    this.count -= 2;
    this.pageSize -= 2;
    this.paginated = this.userbooks.slice(this.count,this.pageSize);
  }
}
