import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category:Category={
    title:'',
    description:''
  }

  constructor(private _catService:CategoryService,private _snak:MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.category.title?.trim()=='' || this.category.title==null){
      this._snak.open("Title is required !",'',{
        duration:3000
      })
      return;
    }

    //add data to server
    this._catService.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        Swal.fire("Success","Category added successfully !",'success');
      },
      (error:any)=>{
        console.log(error);
        Swal.fire("Error","Something went wrong!","error");
      }
    )
  }

}
