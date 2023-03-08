import { Component } from '@angular/core';
import { author} from '../../interface/authors'
import {AuthorsService} from '../../services/authors.service';
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
    
  authors!:author[]
 
  constructor(private _AuthorsService: AuthorsService)
  {
       _AuthorsService.getAllauthors().subscribe (authors => {
           this.authors = authors.slice(0,20);
      })
    
      
  }



}
