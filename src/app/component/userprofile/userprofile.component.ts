import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as bcrypt from 'bcryptjs';
import { userrate } from 'src/app/interface/userrate';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  // swiper = new Swiper(".slide-content", {
  //    slidesPerView: 3,
  //    spaceBetween: 25,
  //    loop: true,
  //    centeredSlides: true,
  //    grabCursor: false,
  //    pagination: {
  //      el: ".swiper-pagination",
  //      clickable: true,
  //      dynamicBullets: true,
  //    },
  //    navigation: {
  //      nextEl: ".swiper-button-next",
  //      prevEl: ".swiper-button-prev",
  //    },

  //    breakpoints:{
  //        0: {
  //            slidesPerView: 1,
  //        },
  //        520: {
  //            slidesPerView: 2,
  //        },
  //        950: {
  //            slidesPerView: 3,
  //        },
  //    },
  //  });










  userImage = `${environment.APIBaseURL}/assets/uploads/user/`
  userEmail: String | undefined;
  password: any
  user!: user
  iconcheckoldpass: boolean = true;
  iconcheckpass: boolean = true;
  iconcheckconfirm: boolean = true;
  check_old_pass: boolean = false;
  check_confirm_pass: boolean = false;
  userrate!: userrate;
  newUserForm!: FormGroup
  selectedImage!: File;
  error!: string
  constructor(
    private _UserService: UserService,
    private _AuthService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userEmail = ''
    this.password = ''
    this.newUserForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      oldpassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      image: ['']
    });
  }


  changeoldpass(e: HTMLInputElement) {
    this.iconcheckoldpass = !this.iconcheckoldpass;
    if (e.getAttribute('type') == 'text')
      e.setAttribute('type', 'password')
    else
      e.setAttribute('type', 'text')
  }

  changepass(e: HTMLInputElement) {
    this.iconcheckpass = !this.iconcheckpass;
    if (e.getAttribute('type') == 'text')
      e.setAttribute('type', 'password')
    else
      e.setAttribute('type', 'text')
  }

  changeconfirm(e: HTMLInputElement) {
    this.iconcheckconfirm = !this.iconcheckconfirm;
    if (e.getAttribute('type') == 'text')
      e.setAttribute('type', 'password')
    else
      e.setAttribute('type', 'text')
  }

  async checkOldPass(e: HTMLInputElement) {
    if (!await bcrypt.compare(e.value, this.password)) {
      this.check_old_pass = true
    }
    else {
      this.check_old_pass = false;
    }


  }

  checkconfirmPass(newpass: HTMLInputElement, confirm: HTMLInputElement) {
    if (newpass.value != confirm.value) {
      this.check_confirm_pass = true;
    }
    else {
      this.check_confirm_pass = false;
    }
  }


  uploadFile(e: any) {
    this.selectedImage = <File>e.target.files[0];
  }

  submitRegister() {
    var form: any = new FormData();
    const userImage = this.selectedImage;
    if (userImage) {
      form.append('image', userImage, userImage?.name);
    } else {
      form.append('image', '');
    }
    form.append('firstname', this.newUserForm.get('firstname')?.value);
    form.append('lastname', this.newUserForm.get('lastname')?.value);
    form.append('email', this.newUserForm.get('email')?.value);
    form.append('password', this.newUserForm.get('password')?.value)

    this._UserService.updateuser(this.user._id, form).subscribe({
      next: (d) => {
        Swal.fire("Account updated Successfully!", "", "success");
        this._UserService.getuser(this.userEmail).subscribe((user) => {
          this.user = user;
        })
        this._AuthService.logout();
      },
      error: (err) => {
        this.error = err.error;
        Swal.fire({
          icon: "error",
          title: 'Oops...',
          text: "Something went wrong",
        });
      },
    });


  }




  deleteaccount() {
    this._UserService.openConfirmDialog('Are you sure to delete this Account?')
      .afterClosed().subscribe(res => {
        if (res) {
          this._UserService.deleteuser(this.user._id).subscribe({
            next: (d) => {
              Swal.fire("Account Deleted Successfully!", "", "success");
              this._AuthService.logout();
              this.router.navigate(['/home']);
            },
            error: (err) => {
              Swal.fire({
                icon: "error",
                title: 'Oops...',
                text: "Something went wrong",
              });
            },
          });
        }
      });



  }





  ngOnInit() {
    this._AuthService.getuser().subscribe((user) => {
      this.userEmail = user?.email;
    })

    this._UserService.getuser(this.userEmail).subscribe((user) => {
      this.user = user;
      this.password = user.password;
      this._UserService.getAllusers_rates().subscribe((userrate) => {
        this.userrate = userrate.filter(rate => rate.user._id == this.user._id)[0];
      })
      this.newUserForm.patchValue({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      })

    });



  }



}
