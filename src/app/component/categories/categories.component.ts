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
      console.log(this.catagories);
    });
    this.currentPage = 1;
    this.pageSize = 2;
    this.totalPages = 5;
    this.pages = [];
    this.paginated = [];
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.catagories.length / this.pageSize);

    console.log(this.totalPages);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

    setPage(page: number) {
      this.currentPage = page;
      let start = this.currentPage *2-2
      let end = this.currentPage *2
      this.paginated = this.catagories.slice(this.currentPage *2-2,this.currentPage *2);
      this.count = this.currentPage *2-2;
      this.pageSize = this.currentPage *2;
    }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
    // console.log('next');

    this.count += 2;
    this.pageSize += 2;
    this.paginated = this.catagories.slice(this.count, this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
    console.log('prev');
    this.count -= 2;
    this.pageSize -= 2;
    this.paginated = this.catagories.slice(this.count, this.pageSize);
  }
}
