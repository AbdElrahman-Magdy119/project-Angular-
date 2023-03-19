import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  error: string = ''
  // form!: FormGroup;
  registerform: FormGroup
  selectedImage!: File;
  //    registerform = new FormGroup ({
  //     firstname : new FormControl(null ,
  //       [Validators.required , Validators.minLength(3), Validators.maxLength(10)]),
  //     lastname  : new FormControl(null ,
  //       [Validators.required , Validators.minLength(3), Validators.maxLength(10)]),
  //     email     : new FormControl(null ,
  //       [Validators.required , Validators.email]),
  //     password  : new FormControl(null ,
  //       [Validators.required , Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
  //       confirmPassword : new FormControl(null ,
  //         [Validators.required ]),
  //     image     : new FormControl(null ,
  // [Validators.required]),
  //    })




  constructor(private _AuthService: AuthService, private _Router: Router, public fb: FormBuilder, private http: HttpClient) {
    this.registerform = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      image: ['']
    });
  }

  uploadFile(event: any) {
    this.selectedImage = <File>event.target.files[0];
    console.log(this.selectedImage);
  }



  submitRegister() {
    var form: any = new FormData();
    const userImage = this.selectedImage;
    if (userImage) {
      form.append('image', userImage, userImage?.name);
    } else {
      form.append('image', '');
    }
    form.append('firstname', this.registerform.get('firstname')?.value);
    form.append('lastname', this.registerform.get('lastname')?.value);
    form.append('email', this.registerform.get('email')?.value);
    form.append('password', this.registerform.get('password')?.value)



    this._AuthService.register(form).subscribe(
      {
        next: (v) => {
          this._Router.navigate(['/login']);
        },
        error: (e) => {
          this.error = e.error;
        }
      })
  }

  ngOnInit(): void {
  }
}
