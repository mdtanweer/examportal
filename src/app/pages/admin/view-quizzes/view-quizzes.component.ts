import { Component, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.scss']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:Quiz[]=[]

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.getQuizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Something went wrong !","error");
        
      }
    )
  }

  deleteQuiz(quizId:any){
    Swal.fire({
      icon:'info',
      title:'Are you sure !',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(quizId).subscribe(
          (data:any)=>{
            this.quizzes=this.quizzes.filter(quiz=>quiz.id!=quizId);
            Swal.fire("Success","Quiz deleted successfully !!","success");
          },
          (error)=>{
            console.log(error);
            Swal.fire("Error","Error while deleting","error");   
          }
        )
      }
    })
  }

}
