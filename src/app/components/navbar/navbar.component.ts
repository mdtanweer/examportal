import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  user!:User;

  constructor(public login:LoginService) { }

  ngOnInit(): void {
    this.user=this.login.getUser();
    this.isLoggedIn=this.login.isLoggedIn();
    this.login.loginSubjectStatus.asObservable().subscribe(data=>{
      this.user=this.login.getUser();
      this.isLoggedIn=this.login.isLoggedIn();
    })
  }

  logout(){
    this.login.logout();
    this.login.loginSubjectStatus.next(false);
  }

}
