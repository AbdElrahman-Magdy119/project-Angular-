import { Injectable } from '@angular/core';
import { user } from '../interface/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userrate } from '../interface/userrate';
// import { MatConfirmDialogComponent } from './component/mat-confirm-dialog/mat-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from '../component/mat-confirm-dialog/mat-confirm-dialog.component';
// import { MatConfirmDialogComponent} from '../shared/delete-dialog/delete-dialog.component';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient,private dialog: MatDialog)
  {}
     getuser(email:String | undefined): Observable<user> {
      return this.http.get<user>(
        `http://localhost:5000/users/${email}`
      )
    }
   
    getuserrate(id:String | undefined): Observable<userrate> {
      return this.http.get<userrate>(
        `http://localhost:5000/users/rate/${id}`
      )
    }

    deleteuser(id: String| undefined): Observable<user> {
      return this.http.delete<user>(
        `http://localhost:5000/users/${id}`
      )
    }

    updateuser(id: String| undefined,data:FormData): Observable<user> {
      return this.http.patch<user>(
        `http://localhost:5000/users/${id}`,data
      )
    }
    
    openConfirmDialog(msg:string){
      return this.dialog.open(MatConfirmDialogComponent,{
         width: '390px',
         panelClass: 'confirm-dialog-container',
         disableClose: true,
         position: { top: "10px" },
         data :{
           message : msg
         }
       });
     }
  

  getAllUser(): Observable<user[]> {
    return this.http.get<user[]>(`http://localhost:5000/users`);
  }
}

