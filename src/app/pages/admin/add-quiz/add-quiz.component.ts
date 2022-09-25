import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Quiz } from 'src/app/models/quiz.model';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss'],
})
export class AddQuizComponent implements OnInit {
  categories: Category[] = [];
  quizData: Quiz = {
    title: '',
    description: '',
    maxMarks: 0,
    noOfQuestions: 0,
    active: false,
    category: {
      id: '',
    },
  };

  constructor(
    private _category: CategoryService,
    private _quiz: QuizService,
    private _sank: MatSnackBar,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this._category.getCategory().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        Swal.fire('Error', 'Error while loading category !', 'error');
      }
    );
  }

  formSubmit() {
    if (this.quizData.title?.trim() == '' || this.quizData.title == null) {
      this._sank.open('Title is required', '', {
        duration: 3000,
      });
      return;
    }

    //send data to quiz service;
    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire('Success', 'quiz added successfully !!', 'success').then(
          (result) => {
            this._router.navigate(['admin/quizzes']);
          }
        );
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error while adding quiz !', 'error');
      }
    );
  }
}
