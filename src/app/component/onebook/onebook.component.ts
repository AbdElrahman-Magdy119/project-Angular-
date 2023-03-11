import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../services/authors.service';
import { UserService } from '../../services/user.service';
import { book } from '../../../app/interface/book';
import { user } from '../../../app/interface/user';
import { ActivatedRoute } from '@angular/router';
import { author } from 'src/app/interface/authors';
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-onebook',
  templateUrl: './onebook.component.html',
  styleUrls: ['./onebook.component.css']
})
export class OnebookComponent {
  book!: book;
  author!: any;
  category!:any;
  user!:user;
  state!:string;
  islogin!:boolean;
  add!: number[];
  check_remove: boolean =false;
  currentuser!:any;
  new_review!:string;
  star:boolean = false;
  status = [
    {value: 'reading', viewValue: 'reading'},
    {value: 'want to read', viewValue: 'want to read'},
    {value: 'readed', viewValue: 'readed'},
  ];


  constructor(private _BooksService: BooksService, private route: ActivatedRoute, private _AuthorsService: AuthorsService,private _AuthService:AuthService,private _UserService:UserService) {
    this.route.paramMap.subscribe((paramMap) => {
      this._BooksService.getbook(paramMap.get('id')).subscribe(book => {
        this.book = book;
        this.author=this.book?.authorId;
        this.category=this.book?.categoryId;
      })
    })

    this.currentuser=this._AuthService.currentuser;

      if(_AuthService.currentuser.getValue() != null)
      {
         this.islogin = true;
      }
      else
      {
          this.islogin = false;
      }

  }

  getStatus(e:any)
    {
       this.state=e.value;
       console.log(this.state);
    }

    addReviwe(e:any)
    {
      this.new_review=e.value;
      console.log(this.new_review);
    }
    

    remove(){
      this.check_remove=true;
      console.log("remove")
    }


    // starvalue()
    // {
    //   this.star = true
    //   console.log("svbdihvdivds")
    // }
    
    getrate(e:any)
    {
        console.log(e)
    }



  ngOnInit() {
  }
}


