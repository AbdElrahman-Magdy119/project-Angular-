import { Component } from '@angular/core';
import { catagory} from '../../interface/category'
import {CatagoryService} from '../../services/category/catagory.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  image = `${environment.APIBaseURL}/assets/uploads/category`;

  catagories!: catagory[];
  paginated!: any[];
  currentPage!: number;
  pageSize!: number;
  totalPages!: number;
  pages: number[] = [];
  count: number = 0;

  constructor(private _CatagoryService: CatagoryService) {
    _CatagoryService.getAllcategories().subscribe((catagories) => {
      this.catagories = catagories.slice(0, 12);
      this.calculatePages();
      this.paginated = this.catagories.slice(this.count, this.pageSize);
    });
    this.currentPage = 1;
    this.pageSize = 10 ;
    this.totalPages = 5;
    this.pages = [];
    this.paginated = [];
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.catagories.length / this.pageSize);

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

    setPage(page: number) {
      this.currentPage = page;
      let start = this.currentPage *10-10
      let end = this.currentPage *10
      this.paginated = this.catagories.slice(this.currentPage *10-10,this.currentPage *10);
      this.count = this.currentPage *10-10;
      this.pageSize = this.currentPage *10;
    }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }

    this.count += 10;
    this.pageSize += 10;
    this.paginated = this.catagories.slice(this.count, this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    console.log('prev');
    this.count -= 10;
    this.pageSize -= 10;
    this.paginated = this.catagories.slice(this.count, this.pageSize);
  }
}
