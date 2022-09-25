import { JsonPipe, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.scss']
})
export class QuizStartComponent implements OnInit {
  quizId=0
  questions:Question[]=[]

  attempted=0
  marksGot=0
  correctAnswer=0
  isSubmit=false;
  timer:any;

  constructor(private _locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.quizId=this._route.snapshot.params['qid'];
    this.loadQuestionOfQuiz();
  }
  loadQuestionOfQuiz() {
    this._question.getQuestionByQuizIdForTest(this.quizId).subscribe((data:any)=>{
      this.questions=data;
      
      this.timer=this.questions.length *2* 60;
      this.startTimer();
    },(error)=>{
      console.log(error);
      Swal.fire("Error","Error in loading questions of quiz","error")
      
    })
  }

  submitQuiz(){
    Swal.fire({
      showCancelButton:true,
      title:'Do you want to submit the quiz !',
      confirmButtonText:'End',
      icon:'info'
    }).then(target=>{
      if(target.isConfirmed){
        this.autoSubmitQuiz();
      }
    })    
  }

  autoSubmitQuiz(){
    this.questions.forEach(q=>{
      if(q.gievnAnswer==q.answer){
        this.correctAnswer+=1;
      }
      if(q.gievnAnswer!='' && q.gievnAnswer!=null){
        this.attempted+=1;
      }
      console.log("Given Answer: "+q.gievnAnswer);
      
    })
    this.marksGot=this.correctAnswer*(this.questions[0].quiz.maxMarks/this.questions[0].quiz.noOfQuestions);
    console.log("Attempted: "+this.attempted);
    console.log("Corrected: "+this.correctAnswer);
    console.log("Marks Got: "+this.marksGot);
    console.log(this.questions);
    this.isSubmit=true;
  }

  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer<=0){
        this.autoSubmitQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormatedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min : ${ss} sec`
  }

  preventBackButton(){
    history.pushState(null,'',location.href);
    this._locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    })
  }

}
