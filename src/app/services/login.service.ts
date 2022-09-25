import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import baseUrl from './base-url';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedIn=false;
  public loginSubjectStatus=new Subject<boolean>();
  constructor(private http: HttpClient,private router:Router) {}

  //get current loggedin user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/auth`, loginData);
  }

  //login user: set token to local storage
  public loginUser(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn();
    return true;
  }

  //isLoggedIn:check
  public isLoggedIn() {
    let token = this.getToken();
    if (token == undefined || token == '' || token == null) {
      this.loggedIn=false;
    } else {
      this.loggedIn=true;
    }
    return this.loggedIn;
  }

  //logout
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn=false;
    this.router.navigateByUrl("/")
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetails
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //get userDetails
  public getUser(){
    let user=localStorage.getItem('user');
    if(user!=null){
      return JSON.parse(user);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
