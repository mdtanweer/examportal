import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit {

  categories:Category[]=[]

  constructor(private login:LoginService,private _category:CategoryService) { }

  ngOnInit(): void {
    this._category.getCategory().subscribe((data:any)=>{
      this.categories=data;
      
    },(error)=>{
      Swal.fire("Error","whire while loading category !","error");
    })
  }


}
