import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import baseUrl from './base-url';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  //get question by quizid
  public getQuestionByQuizId(quizId:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${quizId}`);
  }

  //get question by quizid for test
  public getQuestionByQuizIdForTest(quizId:any){
    return this._http.get(`${baseUrl}/question/quiz/${quizId}`);
  }

  //add question to quiz
  public addQuestionQuiz(question:Question){
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //update question
  public updateQuestionQuiz(question:Question){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  //get question by id
  public getQuestionById(quesId:any){
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  //delete question by id
  public deleteQuestion(quesId:any){
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }

}
