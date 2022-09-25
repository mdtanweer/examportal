import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit {

  categories:Category[]=[]

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Something went wrong !","error");
        
      }
    )
  }

}
