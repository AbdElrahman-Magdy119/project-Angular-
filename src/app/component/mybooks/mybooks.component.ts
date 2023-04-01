import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from '../../services/books.service';
import { environment } from 'src/environments/environment';
import { DropdownModule } from 'primeng/dropdown';
import { MatTableModule } from '@angular/material/table';
import { ReviewService } from 'src/app/services/review.service';
import Swal from 'sweetalert2';
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
  userRate!: number;
  userstate!:string;
  userId!: any;
  reviewId!:string
  status = [
    { value: 'reading', viewValue: 'reading' },
    { value: 'want to read', viewValue: 'want to read' },
    { value: 'readed', viewValue: 'readed' },
  ];



  constructor(
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _BooksService: BooksService,
    private _AuthService: AuthService,
    private ReviewService: ReviewService
  ) {
    this.currentPage = 1;
    this.pageSize = 5;
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
          });
      });
    });
  }


  getAllstatus(status: string) {
    this.router.navigate([], { queryParams: { state: status } });
  }

 

  calculatePages() {
    this.totalPages = Math.ceil(this.userbooks.length / this.pageSize);

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    let start = this.currentPage *5-5
    let end = this.currentPage *5
    this.paginated = this.userbooks.slice(this.currentPage *5-5,this.currentPage *5);
    this.count = this.currentPage *5-5;
    this.pageSize = this.currentPage *5;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }

    this.count += 5;
    this.pageSize += 5;
    this.paginated=this.userbooks.slice(this.count,this.pageSize)
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    console.log('prev');
    this.count -= 5;
    this.pageSize -= 5;
    this.paginated = this.userbooks.slice(this.count,this.pageSize);
  }

  getrate(e:any,id:string)
  {
    this.userRate=e.value;
    const data = {
      rating: this.userRate,
    };
    
      this.ReviewService.updatereview(data,id).subscribe({
        next: (d) => {
          Swal.fire("review updated successfully!", "", "success");
          this._ActivatedRoute.queryParamMap.subscribe((params) => {
            this._AuthService.currentuser.subscribe((user) => {
              this.oneuser = user;
              this.userId = this.oneuser.user_id;
              this._BooksService
                .getallbookrate(params.get('state'), this.userId)
                .subscribe((userbook) => {
                  this.userbooks = userbook;
                });
            });
          });
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: 'Oops...',
            text: "Something went wrong",
          });
        },
      });
  }
  

   getStatus(e: any,id:string) {
     this.userstate = e.value.value;
     const data = {
      status:this.userstate 
    };
    this.ReviewService.updatereview(data,id).subscribe({
      next: (d) => {
        Swal.fire("review updated successfully!", "", "success");
        this._ActivatedRoute.queryParamMap.subscribe((params) => {
          this._AuthService.currentuser.subscribe((user) => {
            this.oneuser = user;
            this.userId = this.oneuser.user_id;
            this._BooksService
              .getallbookrate(params.get('state'), this.userId)
              .subscribe((userbook) => {
                this.userbooks = userbook;
              });
          });
        });
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: 'Oops...',
          text: "Something went wrong",
        });
      },
    });


  }










}
