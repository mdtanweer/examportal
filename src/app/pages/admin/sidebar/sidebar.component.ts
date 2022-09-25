import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private login:LoginService) { }

  ngOnInit(): void {
  }

  logout(){
    this.login.logout();
    this.login.loginSubjectStatus.next(false);
  }

}
