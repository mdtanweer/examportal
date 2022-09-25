import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import baseUrl from './base-url';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  //get quizzes
  public getQuizzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //get quiz by id
  public getQuizId(quizId:any){
    return this._http.get(`${baseUrl}/quiz/${quizId}`);
  }

  //get quizzes by category
  public getQuizzesByCategory(catId:any){
    return this._http.get(`${baseUrl}/quiz/category/${catId}`);
  }

  //get active quiz
  public getActiveQuizzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(catId:any){
    return this._http.get(`${baseUrl}/quiz/active/category/${catId}`);
  }

  //add quiz
  public addQuiz(quiz:Quiz){
    return this._http.post(`${baseUrl}/quiz/`,quiz);
  }
  
  //delete quiz
  public deleteQuiz(quizId:any){
    return this._http.delete(`${baseUrl}/quiz/${quizId}`);
  }

  //update quiz
  public updateQuiz(quiz:Quiz){
    return this._http.put(`${baseUrl}/quiz/`,quiz);
  }
}
