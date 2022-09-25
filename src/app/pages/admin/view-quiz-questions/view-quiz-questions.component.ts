import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.scss']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId=0;
  qTitle=''
  questions:Question[]=[]

  constructor(private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    this._question.getQuestionByQuizId(this.qId).subscribe((data:any)=>{
      this.questions=data;
    },(error)=>{
      console.log(error);
      Swal.fire("Error","Error while loading quiz-questions !","error");
      console.log(error);
      
    })
  }

  deleteQuestion(quesId:any){
    Swal.fire({
      title:'Are you sure, want to delete this question',
      showCancelButton:true,
      confirmButtonText:'Delete',
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(quesId).subscribe((data:any)=>{
          Swal.fire("Success","Question deleted successfully !","success");
          this.questions=this.questions.filter(q=>q.id!=quesId);
        },
        (error)=>{
          Swal.fire("Error","Error while deleting question !","error");
          console.log(error);
          
        }
        )
      }
    })
  }

}
