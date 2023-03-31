import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { ActivatedRoute } from '@angular/router';
import { author } from 'src/app/interface/authors';
import { book } from 'src/app/interface/book';
import { environment } from 'src/environments/environment';
import Swiper, { Navigation, Pagination } from 'swiper';

@Component({
  selector: 'app-one-author',
  templateUrl: './one-author.component.html',
  styleUrls: ['./one-author.component.css'],
})
export class OneAuthorComponent implements OnInit {
  imageAuthor = `${environment.APIBaseURL}/assets/uploads/author`;
  imageBook = `${environment.APIBaseURL}/assets/uploads/book`;

  author!: author;
  authorBooks!: any;
  status = [
    { value: 'reading', viewValue: 'reading' },
    { value: 'want to read', viewValue: 'want to read' },
    { value: 'readed', viewValue: 'readed' },
  ];

  constructor(
    private _AuthorsService: AuthorsService,
    private route: ActivatedRoute
  ) {
    Swiper.use([Navigation, Pagination]);
    this.route.paramMap.subscribe((paramMap) => {
      this._AuthorsService.getauthor(paramMap.get('id')).subscribe((author) => {
        this.author = author;
      });
    });

    this.route.paramMap.subscribe((paramMap) => {
      this._AuthorsService
        .getbookOfAuthor(paramMap.get('id'))
        .subscribe((authorBooks) => {
          this.authorBooks = authorBooks;
          console.log(authorBooks);
        });
    });
  }
  ngOnInit() {
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
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
  });
  }

}
