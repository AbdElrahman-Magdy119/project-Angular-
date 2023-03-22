import { Component , OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { author } from 'src/app/interface/authors';
import { book } from 'src/app/interface/book';
import { catagory } from 'src/app/interface/category';
import { Rate } from 'src/app/interface/Rate';
import { Review } from 'src/app/interface/review';
import { user } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';

import { BooksService } from 'src/app/services/books.service';
import { ReviewService } from 'src/app/services/review.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit{
  status = [
    { value: 'reading', viewValue: 'reading' },
    { value: 'want to read', viewValue: 'want to read' },
    { value: 'readed', viewValue: 'readed' },
  ];
  bookImage=`${environment.APIBaseURL}/assets/uploads/book/`
  userImage=`${environment.APIBaseURL}/assets/uploads/user/`
  userName =localStorage.getItem('userName')
  book!:book
  bookId!:String|null
  authorObj!:author | undefined
  categoryObj!:catagory | undefined
  bookRate:Rate
  userReview!:Review
  userId:String | undefined
  userStatus!:string
  userRate!:number
  allReviews!:any
  constructor(
   private bookService:BooksService,
   private activatedRoute:ActivatedRoute,
   private authentaciteService:AuthService,
   private router:Router,
   private ReviewService:ReviewService
  ){
    this.bookRate={
      avg:0,
      count:0
    }
    this.userId=''
    
  }
  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      this.bookId=params.get('id');
      this.bookService.getbook(this.bookId).subscribe(book=>{
        this.book = book
        this.categoryObj=book.categoryId
        this.authorObj=book.authorId
      })
    })

    this.authentaciteService.getuser().subscribe(user=>{
      this.userId = user?.user_id
      console.log(this.userId)
    })


    this.bookService.getbookrate(this.bookId).subscribe(bookRate=>{
      this.bookRate=bookRate
    });

    this.bookService.getUserrateFromBook(this.userId,this.bookId).subscribe(userRate=>{
      console.log(userRate)
       this.userReview=userRate
    })

    this.bookService.getbookreviews(this.bookId).subscribe(bookReviews=>{
      this.allReviews=bookReviews
      console.log(this.allReviews)

    })

  }


  getStatus(e: any) {
    if (localStorage.getItem('userName')) {
      this.userStatus = e.value
    }
    else {
      this.router.navigate(['/login']);
    }

  }

  getrate(e: any) {
    if (localStorage.getItem('userName')) {
      this.userRate = e.value
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  addReview()
  { 
    let data={
      userId:this.userId,
      bookId:this.bookId, 
      rating:this.userRate,
      review:"", 
      status:this.userStatus 
    }

     if(this.userReview.rating)
     {
      
        // console.log('data before send',this.userReview._id);
        this.ReviewService.updatereview(data,this.userReview._id).subscribe({
                  next:(d)=>{
                    console.log('data after',d);
                    Swal.fire("review added successfully!",'',"success")
                    this.bookService.getbookrate(this.bookId).subscribe(bookRate=>{
                      this.bookRate=bookRate
                    });
                  },
                  error:(err)=>{
                    Swal.fire({
                      icon: "error",
                      title:'Oops...',
                      text:"Something went wrong",
                    })
                  }
                })
     }
     else
     {
          this.ReviewService.addreviewToBook(data).subscribe({
            next:(d)=>{
              console.log('data after',d);
              Swal.fire("review added successfully!",'',"success")
              this.bookService.getbookrate(this.bookId).subscribe(bookRate=>{
                this.bookRate=bookRate
              });
            },
            error:(err)=>{
              Swal.fire({
                icon: "error",
                title:'Oops...',
                text:"Something went wrong",
              })
            }
          })
        
     }

  }
  
}