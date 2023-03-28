import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private router: Router,
  )
{

}
  getAllstatus(status: string) {
    this.router.navigate([], { queryParams: { state: status } });
  }

  getStatus(e: any) {
    console.log(e.value);
  }
}
