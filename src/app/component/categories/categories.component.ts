import { Component } from '@angular/core';
import { catagory} from '../../interface/category'
import {CatagoryService} from '../../services/category/catagory.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  catagories!: catagory[] ;

  constructor(private _CatagoryService: CatagoryService)
     {
      _CatagoryService.getAllcategories().subscribe (catagories => {
             this.catagories = catagories;
             console.log(this.catagories)
      })
         
     }



}
