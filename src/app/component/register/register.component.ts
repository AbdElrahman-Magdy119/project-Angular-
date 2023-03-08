import { Component } from '@angular/core';
import {FormControl,FormGroup,Validators}  from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router'
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
       
       error:string =''
       form!: FormGroup;
      
       registerform = new FormGroup ({
        firstname : new FormControl(null ,
          [Validators.required , Validators.minLength(3), Validators.maxLength(10)]),
        lastname  : new FormControl(null ,
          [Validators.required , Validators.minLength(3), Validators.maxLength(10)]),
        email     : new FormControl(null ,
          [Validators.required , Validators.email]),
        password  : new FormControl(null ,
          [Validators.required , Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
          confirmPassword : new FormControl(null ,
            [Validators.required ]), 
        image     : new FormControl(null ,
    [Validators.required]),
       })
     



       constructor(private _AuthService:AuthService,private _Router:Router ,public fb: FormBuilder, private http: HttpClient) {
        this.form = this.fb.group({
          name: [''],
          avatar: [null],
        });
       }
     
       uploadFile(event:any) {
        const file:any = (event.target).files[0];
        this.form.patchValue({
          avatar: file,
        });
        this.form.get('avatar')?.updateValueAndValidity();
      }
          
   

       submitRegister(registerform:FormGroup)
       { 
          var formData: any = new FormData();
          formData.append('name', this.form.get('name')?.value);
          formData.append('avatar', this.form.get('avatar')?.value);
            registerform.value.image = formData.get('avatar').name;
              delete registerform.value.confirmPassword;

              

          this._AuthService.register(registerform.value).subscribe(
            {
              next: (v) =>
               {
                this._Router.navigate(['/login']);
               },
              error: (e) => 
              {
                  this.error =  e.error   ;
              }
            })
    }

    ngOnInit(): void {
    }    
}
