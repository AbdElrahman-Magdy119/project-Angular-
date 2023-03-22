import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../services/authors.service';
import { UserService } from '../../services/user.service';
import { book } from '../../../app/interface/book';
import { user } from '../../../app/interface/user';
import { Rate } from '../../../app/interface/Rate';
import { ActivatedRoute } from '@angular/router';
import { author } from 'src/app/interface/authors';
import { AuthService } from '../../services/auth.service'
import { ReviewService } from '../../services/review.service'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-onebook',
  templateUrl: './onebook.component.html',
  styleUrls: ['./onebook.component.css'],
})
export class OnebookComponent {
  image = `${environment.APIBaseURL}/assets/uploads/book`;

  book!: book;
  author!: any;
  category!: any;
  reviews!: any;
  newreviws: any = [];
  rate!: Rate;
  userlogin!: any;
  state!: string;
  islogin!: boolean;
  add!: number[];
  new_review!: string;
  star: boolean = false;
  oneuser!: any;
  userId!: string;
  userimage!: any;
  userfirstname!: any;
  userlastname!: any;
  bookId!: any;
  getRate!: number;
  getUserRate?: any;
  checkreview = true;
  checkEdit = false;
  editvalue!: string;
  newEditvalue!: string;
  status = [
    { value: 'reading', viewValue: 'reading' },
    { value: 'want to read', viewValue: 'want to read' },
    { value: 'readed', viewValue: 'readed' },
  ];

  constructor(
    private _ReviewService: ReviewService,
    private _Router: Router,
    private _BooksService: BooksService,
    private route: ActivatedRoute,
    private _AuthorsService: AuthorsService,
    private _AuthService: AuthService,
    private _UserService: UserService
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this._BooksService.getbook(paramMap.get('id')).subscribe((book) => {
        this.book = book;
        this.author = this.book?.authorId;
        this.category = this.book?.categoryId;
      });
    });

    this.route.paramMap.subscribe((paramMap) => {
      this.bookId = paramMap.get('id');
    });

    this.route.paramMap.subscribe((paramMap) => {
      this._BooksService.getbookrate(paramMap.get('id')).subscribe((rate) => {
        this.rate = rate;
      });
    });

    _AuthService.currentuser.subscribe((user) => {
      if (_AuthService.currentuser.getValue() != null) {
        this.islogin = true;
      } else {
        this.islogin = false;
      }

      this.oneuser = user;
      this.userId = this.oneuser.user_id;

      this._BooksService
        .getUserrateFromBook(this.userId, this.bookId)
        .subscribe((getUserRate) => {
          this.getUserRate = getUserRate;
        });

      _UserService.getuser(this.oneuser.email).subscribe((I) => {
        this.userimage = I.image;
        this.userfirstname = I.firstname;
        this.userlastname = I.lastname;
      });
    });

    this.route.paramMap.subscribe((paramMap) => {
      this._BooksService
        .getbookreviews(paramMap.get('id'))
        .subscribe((reviews) => {
          this.reviews = reviews;
          this.reviews.map((elm: any) => {
            if (elm.review != '') {
              this.newreviws.push(elm);
            }
          });
          this.newreviws.filter((elm: any) => {
            if (this.userId == elm.userId._id) {
              this.checkreview = false;
            }
          });
        });
    });
  }

  getStatus(e: any) {
    if (this.islogin == true) {
      this.state = e.value;
    } else {
      this._Router.navigate(['/login']);
    }
  }

  getrate(e: any) {
    if (this.islogin == true) {
      this.getRate = e;
    } else {
      this._Router.navigate(['/login']);
    }
  }

  addtotalReviwe() {
    if (this.islogin == true) {
      let flag = false;
      let bookId;
      let reviewId;
      this.route.paramMap.subscribe((paramMap) => {
        bookId = paramMap.get('id');
      });
      this.reviews.filter((elm: any) => {
        if (this.userId == elm.userId._id) {
          flag = true;
          reviewId = elm._id;
        }
      });

      if (flag) {
        let data = {
          userId: this.userId,
          bookId: bookId,
          rating: this.getRate,
          status: this.state,
        };

        this._ReviewService.updatereview(data, reviewId);

        console.log(reviewId, data);
      } else {
        let data = {
          userId: this.userId,
          bookId: bookId,
          rating: this.getRate,
          status: this.state,
        };
        this._ReviewService.addreviewToBook(data);

        console.log(data);
      }
    } else {
      this._Router.navigate(['/login']);
    }
  }

  addReviwe(e: any) {
    if (this.islogin == true) {
      let flag = false;
      let bookId;
      let reviewId;
      this.route.paramMap.subscribe((paramMap) => {
        bookId = paramMap.get('id');
      });
      this.reviews.filter((elm: any) => {
        if (this.userId == elm.userId._id) {
          flag = true;
          reviewId = elm._id;
        }
      });

      if (flag) {
        let data = {
          userId: this.userId,
          bookId: bookId,
          review: e.value,
        };

        this._ReviewService.updatereview(data, reviewId);

        console.log(reviewId, data);
        this.newreviws.push({
          userId: {
            firstname: this.userfirstname,
            lastname: this.userlastname,
            image: this.userimage,
          },
          bookId: bookId,
          review: e.value,
        });

        this.checkreview = false;
      } else {
        let data = {
          userId: this.userId,
          bookId: bookId,
          review: e.value,
        };
        this._ReviewService.addreviewToBook(data);

        console.log(data);

        this.newreviws.push({
          userId: {
            firstname: this.userfirstname,
            lastname: this.userlastname,
            image: this.userimage,
          },
          bookId: bookId,
          review: e.value,
        });

        this.checkreview = false;
      }
    } else {
      this._Router.navigate(['/login']);
    }
  }

  remove(e: any) {
    if (this.islogin == true) {
      if (this.userId == e.userId._id) {
        let bookId;
        let reviewId = e._id;
        this.route.paramMap.subscribe((paramMap) => {
          bookId = paramMap.get('id');
        });
        let data = {
          userId: this.userId,
          bookId: bookId,
          review: '',
        };

        this._ReviewService.updatereview(data, reviewId);
        this.newreviws.splice(e, 1);
        this.checkreview = true;
      }
    } else {
      this._Router.navigate(['/login']);
    }
  }

  edit(e: any) {
    if (this.islogin == true) {
      console.log('asdfvddvd');
      // if(this.userId == e.userId._id)
      // {
      //      this.checkreview=true
      //     this.checkEdit = true
      //     this.editvalue=e.review

      //     let bookId;
      //     let reviewId = e._id;
      //   this.route.paramMap.subscribe((paramMap) => {
      //       bookId = paramMap.get('id')
      //     });
      // let data = {
      //    userId: this.userId,
      //   bookId: bookId,
      //   review: this.newEditvalue
      //  }

      //  this._ReviewService.updatereview(data, reviewId);

      // }
    } else {
      this._Router.navigate(['/login']);
    }
  }

  ngOnInit() {}
}


