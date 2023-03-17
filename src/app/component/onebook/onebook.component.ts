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
@Component({
  selector: 'app-onebook',
  templateUrl: './onebook.component.html',
  styleUrls: ['./onebook.component.css']
})
export class OnebookComponent {
  book!: book;
  author!: any;
  category!: any;
  reviews!:any;
  rate!: Rate;
  userlogin!: any;
  state!: string;
  islogin!: boolean;
  add!: number[];
  new_review!: string;
  star: boolean = false;
  oneuser!: any
  userId!: string;
  userimage!:any;
  userfirstname!: any;
  userlastname!: any;

  bookId!: any;
  getRate!: number;
  getUserRate!:any;
  status = [
    { value: 'reading', viewValue: 'reading' },
    { value: 'want to read', viewValue: 'want to read' },
    { value: 'readed', viewValue: 'readed' },
  ];


  constructor(private _ReviewService:ReviewService,private _Router: Router, private _BooksService: BooksService, private route: ActivatedRoute, private _AuthorsService: AuthorsService, private _AuthService: AuthService, private _UserService: UserService) {
    this.route.paramMap.subscribe((paramMap) => {
      this._BooksService.getbook(paramMap.get('id')).subscribe(book => {
        this.book = book;
        this.author = this.book?.authorId;
        this.category = this.book?.categoryId;
      })
    })
 
    this.route.paramMap.subscribe((paramMap) => {
       this.bookId = paramMap.get('id');
    })



    this.route.paramMap.subscribe((paramMap) => {
      this._BooksService.getbookrate(paramMap.get('id')).subscribe(rate => {
        this.rate = rate;
        console.log(this.rate);
      })
    })

    _AuthService.currentuser.subscribe((user) => {
      if (_AuthService.currentuser.getValue() != null) {
        this.islogin = true;
      }
      else {
        this.islogin = false;
      }

      this.oneuser = user;
      this.userId = this.oneuser.user_id;
     
      this._BooksService.getUserrateFromBook( this.userId,this.bookId).subscribe(getUserRate => {
        this.getUserRate = getUserRate;
          console.log(this.getUserRate);
      })


       
        _UserService.getuser(this.oneuser.email).subscribe( I => {
            this.userimage = I.image;
            this.userfirstname = I.firstname;
            this.userlastname = I.lastname;
            
        })
     
    })

    this.route.paramMap.subscribe((paramMap) => {
      this._BooksService.getbookreviews(paramMap.get('id')).subscribe(reviews => {
        this.reviews = reviews;
        console.log(this.reviews);
      })
    })

  }

  getStatus(e: any) {
    if (this.islogin == true) {
      this.state = e.value;
    }
    else {
      this._Router.navigate(['/login']);
    }

  }

  getrate(e: any) {
    if (this.islogin == true) {
      this.getRate = e;
    }
    else {
      this._Router.navigate(['/login']);
    }
   

  }

  addReviwe(e: any) {
     
      if(this.islogin == true)
      {
            let  bookId;
            this.route.paramMap.subscribe((paramMap) => {
              bookId =  paramMap.get('id')
          });
    


          this.new_review = e.value,
        this.reviews.push(
          {
            userId:{
              firstname:this.userfirstname,
              lastname:this.userlastname,
              image:this.userimage,
            },
            bookId:bookId,
            rating:this.getRate,
            review: this.new_review,
            status:this.state,
          })
          console.log(this.reviews);
        this.senddata();
      }
      else
      {
        this._Router.navigate(['/login']);
      }
     
  }


  remove(e:any) {
    if (this.islogin == true) {
      this.reviews.splice(e, 1);
    }
    else {
      this._Router.navigate(['/login']);
    }
  
    this.deleteReview(e);
    
  }

    senddata()
    {
        let  bookId;
        this.route.paramMap.subscribe((paramMap) => {
           bookId =  paramMap.get('id')
       });
      let data = {
        userId:this.userId,
        bookId:bookId,
        rating:this.getRate,
        review:this.new_review,
        status:this.state,
      }
      
       console.log(data);
       this._ReviewService.senddata(data);
       
    }

     deleteReview(id:any)
     {
        this._ReviewService.deleteReview(id)
     }


     
    edit(e:any)
    {
      if(this.islogin == true)
      {

         if(this.userId == e.userId._id)
         {
                    
         }
         


      }
      else
      {
        this._Router.navigate(['/login']);
      }
    }










  ngOnInit() {
  }
}


