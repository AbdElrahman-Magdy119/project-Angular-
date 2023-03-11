import { Component } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { ActivatedRoute } from '@angular/router';
import { author } from 'src/app/interface/authors';
@Component({
  selector: 'app-one-author',
  templateUrl: './one-author.component.html',
  styleUrls: ['./one-author.component.css']
})
export class OneAuthorComponent {

  author!: author;
  status = [
    {value: 'reading', viewValue: 'reading'},
    {value: 'want to read', viewValue: 'want to read'},
    {value: 'readed', viewValue: 'readed'},
  ];

  constructor(private _AuthorsService: AuthorsService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap) => {
      this._AuthorsService.getauthor(paramMap.get('id')).subscribe(author => {
        this.author = author;
      })

    })

}




getStatus(e:any)
{
  console.log(e.value)
}


getrate(e:any)
{
  console.log(e)
}



}
