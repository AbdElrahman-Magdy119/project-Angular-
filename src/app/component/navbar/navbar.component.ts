import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { user } from '../../../app/interface/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  islogin: boolean = false;
  oneuser!: any;
  image!: any;
  searchdata!: any;

  myImage = `${environment.APIBaseURL
  }/assets/uploads/user`;
  userName = localStorage.getItem('userName');

  constructor(
    private _location: Location,
    private _AuthService: AuthService,
    private _UserService: UserService,
    private _Router: Router
  ) {

    _AuthService.currentuser.subscribe((user) => {
      if (_AuthService.currentuser.getValue() != null) {
        this.islogin = true;
      } else {
        this.islogin = false;
      }

      this.oneuser = user;
      _UserService.getuser(this.oneuser?.email).subscribe((I) => {
        this.image = I?.image;
      });
    });
  }

  search() {
    let x = document.querySelector('.search-form');
    x?.classList.toggle('active');
  }

  ngOnInit() {
      window.onscroll=()=>{
       let searchForm = document.querySelector('.search-form');
       searchForm?.classList.remove('active');
       if(window.scrollY > 80){
        document.querySelector('.header .header-2')?.classList.add('active');
       }else{
        document.querySelector('.header .header-2')?.classList.remove('active');
       }
     }
  }

  currentuserlogin = new BehaviorSubject({});

  islogout() {
    this._AuthService.logout();
  }

  getresult(e: any) {
    this.searchdata = e.value;
    this._Router.navigate(['/search'], {
      queryParams: { search: this.searchdata, path: this._location.path() },
    });
  }

  getstate() {
    this._Router.navigate(['/mybooks'], { queryParams: { state: 'all' } });
  }
}
