import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.scss']
})
export class LoadQuizComponent implements OnInit {
  catId=0;
  quizzes:Quiz[]=[]

  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
      this.catId=params['catId'];
      if(this.catId==0){
        this._quiz.getActiveQuizzes().subscribe((data:any)=>{
          this.quizzes=data;
        },(error)=>{
          Swal.fire("Error","Error while loading quizzes !","error");
          console.log(error);
        })
      }
      else{
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe((data:any)=>{
          this.quizzes=data;
        },(error)=>{
          Swal.fire("Error","Error while loading quizzes !","error");
          console.log(error);
        })
      }
    })
    
  }

}
