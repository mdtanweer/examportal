import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Quiz } from 'src/app/models/quiz.model';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss'],
})
export class UpdateQuizComponent implements OnInit {
  qId = 0;
  quiz!: Quiz;
  categories: Category[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _category: CategoryService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this._quiz.getQuizId(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        Swal.fire('Error', 'Error while fetching quiz', 'error');
        console.log(error);
      }
    );
    this._category.getCategory().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error', 'Error while loading category !', 'error');
      }
    );
  }

  updateQuiz() {
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Success', 'quiz updated successfully !!', 'success').then(
          (result) => {
            this._router.navigate(['admin/quizzes']);
          }
        );
      },
      (error) => {
        Swal.fire('Error', 'Error while updating quiz', 'error');
        console.log(error);
      }
    );
  }
}
