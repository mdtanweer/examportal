import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  quizId = 0;
  quizTitle = null;
  question: Question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };

  constructor(
    private _route: ActivatedRoute,
    private _snak: MatSnackBar,
    private _question: QuestionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['qid'];
    this.quizTitle = this._route.snapshot.params['title'];
    this.question.quiz['id'] = this.quizId;
  }

  addQuestion() {
    //validation
    if (this.question.content?.trim() == '' || this.question.content == null) {
      this._snak.open('Content is required', '', {
        duration: 1000,
      });
      return;
    }else if (this.question.option1?.trim() == '' || this.question.option1 == null) {
      this._snak.open('Option1 is required', '', {
        duration: 1000,
      });
      return;
    }else if (this.question.option2?.trim() == '' || this.question.option2 == null) {
      this._snak.open('Option2 is required', '', {
        duration: 2000,
      });
      return;
    }else if (this.question.answer?.trim() == '' || this.question.answer == null) {
      this._snak.open('Select answer is required', '', {
        duration: 1000,
      });
      return;
    }

    //
    this._question.addQuestionQuiz(this.question).subscribe((data: any) => {
      Swal.fire('Success', 'Question added successfully', 'success').then(
        () => {
          this._router.navigate([
            'admin',
            'quiz-questions',
            this.quizId,
            this.quizTitle,
          ]);
        },
        (error)=>{
          console.log(error);
          Swal.fire("Error","Error while adding question !!","error");          
        }
      );
    });
  }
}
