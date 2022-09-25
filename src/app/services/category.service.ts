import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import baseUrl from './base-url';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  //get category
  public getCategory(){
    return this.http.get(`${baseUrl}/category/`);
  }

  //add category
  public addCategory(category:Category){
    return this.http.post(`${baseUrl}/category/`,category);
  }
}
