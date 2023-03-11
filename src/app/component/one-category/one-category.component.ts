import { Component } from '@angular/core';
import { CatagoryService } from '../../services/category/catagory.service';
import { ActivatedRoute } from '@angular/router';
import { catagory } from 'src/app/interface/category';
@Component({
  selector: 'app-one-category',
  templateUrl: './one-category.component.html',
  styleUrls: ['./one-category.component.css']
})
export class OneCategoryComponent {

  catagory!:catagory;


  constructor(private _CatagoryService: CatagoryService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap) => {
      this._CatagoryService.getcategory(paramMap.get('id')).subscribe(catagory => {
        this.catagory = catagory;
         console.log(this.catagory)
      })

    })


  }
}
