import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    islogin: boolean = false;

    constructor(private _AuthService:AuthService){
       
     _AuthService.currentuser.subscribe(()=>{
        
           console.log(_AuthService.currentuser);
        if(_AuthService.currentuser.getValue() != null){
             this.islogin = true;
        }
        else{
             this.islogin = false;
           
        }
     })
    }

     islogout()
     {
       this._AuthService.logout();
     }

}
