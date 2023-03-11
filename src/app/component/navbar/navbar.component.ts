import { Component , OnChanges } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { user } from '../../../app/interface/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent {
    islogin: boolean = false;
    oneuser!:any
    image!:any
    inputInSearch!:string;

    constructor(private _AuthService:AuthService,private _UserService:UserService){
       
     _AuthService.currentuser.subscribe((user)=>{
        if(_AuthService.currentuser.getValue() != null){
             this.islogin = true;
        }
        else{
             this.islogin = false;
        }
         
        this.oneuser= user;
      _UserService.getuser(this.oneuser.email).subscribe( I => {
          this.image = I.image;
          
      })
     
        
     })

  
       
   }

    
    
     currentuserlogin = new BehaviorSubject({})
  

     islogout()
     {
       this._AuthService.logout();
     }

     getresult(e:any)
     {
         
         this.inputInSearch= e.value;
         localStorage.setItem('search', this.inputInSearch);
     }

}
