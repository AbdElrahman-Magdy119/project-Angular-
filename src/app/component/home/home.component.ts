import { Component } from '@angular/core';
import { book} from '../../interface/book'
import { author} from '../../interface/authors'
import { catagory} from '../../interface/category'
import {popular} from '../../interface/popular'
import {HomeService} from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  populardata!:any[]
  books: any[]=[] ;
  authors: any[]=[];
  categories: any[]=[];
  uniquecategories: any[]=[];
  constructor(private _HomeService: HomeService)
     {
   
         this._HomeService.getAlldata().subscribe((populardata) => {
              populardata.map((elm:any)=>{
                this.books.push(elm.book); 
                this.authors.push(elm.author);
                this.categories.push(elm.category);
              })
              this.uniquecategories =   this.categories.filter(
                (obj, index) =>
                this.categories.findIndex((item) => item._id === obj._id) === index
              );
            })

  


      
     }





}
