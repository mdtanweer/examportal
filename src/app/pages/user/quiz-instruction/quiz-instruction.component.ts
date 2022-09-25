import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instruction',
  templateUrl: './quiz-instruction.component.html',
  styleUrls: ['./quiz-instruction.component.scss']
})
export class QuizInstructionComponent implements OnInit {
  quizId=0
  quiz!:Quiz;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router) { }

  ngOnInit(): void {
    this.quizId=this._route.snapshot.params['qid']

    this._quiz.getQuizId(this.quizId).subscribe((data:any)=>{
      this.quiz=data;
    },(error)=>{
      Swal.fire("Error","Error while loding quiz","error");
      console.log(error);      
    })
  }
  startQuiz(){
    Swal.fire({
      title:'Are you sure, want to start the quiz',
      showCancelButton:true,
      confirmButtonText:'Start',
      icon:'info'
    }).then(result=>{
      if(result.isConfirmed){
        this._router.navigate(['quiz','start',this.quizId]);
      }
    })
  }

}
