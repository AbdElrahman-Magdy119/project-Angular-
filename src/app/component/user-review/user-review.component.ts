import { Component, OnInit } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { UsersRates } from 'src/app/interface/UsersRates';
import { user } from 'src/app/interface/user';
import { userrate } from 'src/app/interface/userrate';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import Swiper, { Navigation, Pagination } from 'swiper';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css'],
})
export class UserReviewComponent implements OnInit {
  imageUser = `${environment.APIBaseURL}/assets/uploads/user`;

  usersRates!:UsersRates[]



  constructor(private _UserService: UserService) {
    Swiper.use([Navigation, Pagination]);
  }

  ngOnInit() {
   
     this._UserService.getAllusers_rates().subscribe((usersRates) => {
        this.usersRates = usersRates;
     })
    



    var swiper = new Swiper('.slide-content', {
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
          slidesPerView: 3,
        },
      },
     
    });
  }
}
