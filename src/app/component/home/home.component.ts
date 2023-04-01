import { Component, OnInit } from '@angular/core';
import { book } from '../../interface/book';
import { author } from '../../interface/authors';
import { catagory } from '../../interface/category';
import { popular } from '../../interface/popular';
import { HomeService } from '../../services/home.service';
import { environment } from 'src/environments/environment';
import Swiper, { Navigation, Pagination } from 'swiper';
import { BooksService } from 'src/app/services/books.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imageCategory = `${environment.APIBaseURL}/assets/uploads/category`;
  imageBook = `${environment.APIBaseURL}/assets/uploads/book`;
  imageAuthor = `${environment.APIBaseURL}/assets/uploads/author`;
  books!: book[];
  populardata!: any[];
  popularBooks: any[] = [];
  authors: any[] = [];
  categories: any[] = [];
  uniquecategories: any[] = [];
  uniqueauthors:any[]=[];
  uniquebook:any[]=[];
  constructor(
    private _HomeService: HomeService,
    private _BookService: BooksService
  ) {
    Swiper.use([Navigation, Pagination]);
    this._BookService.getAllbooks().subscribe((books) => {
      this.books = books;
    });

    this._HomeService.getAlldata().subscribe((populardata) => {
      populardata.map((elm: any) => {
        this.popularBooks.push(elm.book.bookId);
        this.authors.push(elm.author);
        this.categories.push(elm.category);
        
      });
      

      this.uniquecategories = this.categories.filter(
        (obj, index) =>
          this.categories.findIndex((item) => item._id === obj._id) === index
      );

      this.uniqueauthors = this.authors.filter(
        (obj, index) =>
          this.authors.findIndex((item) => item._id === obj._id) === index
      );

      this.uniquebook = this.popularBooks.filter(
        (obj, index) =>
          this.popularBooks.findIndex((item) => item._id === obj._id) === index
      );
      
    });
  }

  loader() {
    document.querySelector('.loader-container')?.classList.add('active');
  }
  fadeOut() {
    setTimeout(this.loader, 1000);
  }

  ngOnInit() {
    window.onload = () => {
      if (window.scrollY > 80) {
        document.querySelector('.header .header-2')?.classList.add('active');
      } else {
        document.querySelector('.header .header-2')?.classList.remove('active');
      }
      this.fadeOut();
    };

    var swiper = new Swiper('.books-slider', {
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });

    var swiper = new Swiper('.featured-slider', {
      spaceBetween: 10,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });

    var swiper = new Swiper('.reviews-slider', {
      spaceBetween: 10,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });

    var swiper = new Swiper('.blogs-slider', {
      spaceBetween: 10,
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  }
}
