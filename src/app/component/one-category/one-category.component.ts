import { Component } from '@angular/core';
import { CatagoryService } from '../../services/category/catagory.service';
import { ActivatedRoute } from '@angular/router';
import { catagory } from 'src/app/interface/category';
import { book } from 'src/app/interface/book';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-one-category',
  templateUrl: './one-category.component.html',
  styleUrls: ['./one-category.component.css'],
})
export class OneCategoryComponent {
  image = `${environment.APIBaseURL}/assets/uploads/book`;

  catagory!: catagory;
  books!: any;

  constructor(
    private _CatagoryService: CatagoryService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this._CatagoryService
        .getcategory(paramMap.get('id'))
        .subscribe((catagory) => {
          this.catagory = catagory;
        });
    });

    this.route.paramMap.subscribe((paramMap) => {
      this._CatagoryService
        .getcategorybooks(paramMap.get('id'))
        .subscribe((books) => {
          this.books = books;
          console.log(this.books);
        });
    });
  }
}
