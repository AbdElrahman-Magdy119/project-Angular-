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
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent {



  constructor(private _BooksService: BooksService, private route: ActivatedRoute, private _AuthorsService: AuthorsService,private _AuthService:AuthService,private _UserService:UserService)
    {
       





    }
}
