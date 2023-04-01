import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  error: string = ''

  loginform = new FormGroup({
    email: new FormControl(null,
      [Validators.required, Validators.email]),
    password: new FormControl(null,
      [Validators.required]),
    // Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]
  })

  constructor(private _AuthService: AuthService, private _Router: Router) { }



  submitlogin(loginform: FormGroup) {
    this._AuthService.login(loginform.value).subscribe(
      {
        next: (v) => {
          localStorage.setItem('userToken', v.token)
          localStorage.setItem('userName', v.firstname)
          localStorage.setItem('image', v.image)
          this._AuthService.savecurrentuser();
          this._Router.navigate(
            ['/mybooks'],
            { queryParams: { state: "all" } }
          );
        },
        error: (e) => {
          this.error = e.error;
        }
        
      }
      )
      
  }



}
