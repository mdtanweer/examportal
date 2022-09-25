import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginData = {
    username: '',
    password: '',
  };

  constructor(private mat: MatSnackBar, private loginService:LoginService,private router:Router) {}

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username.trim() == null
    ) {
      this.mat.open('Username is required !', '', {
        duration: 3000,
      });
      return;
    }
    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password.trim() == null
    ) {
      this.mat.open('Password is required !', '', {
        duration: 3000,
      });
      return;
    }

    //login service call

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.isLoggedIn();
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setUser(user);
            console.log(user);

            //redirect ...ADMIN dashboard
            if(this.loginService.getRole()=='ROLE_ADMIN'){
              this.router.navigate(['admin']);
              this.loginService.loginSubjectStatus.next(true);
            }
            //redirect ...NORMAL dashboard
            if(this.loginService.getRole()=='ROLE_NORMAL'){
              this.router.navigate(['user','category',0]);
              this.loginService.loginSubjectStatus.next(true);
            }
          }
        )

      },(error)=>{
        console.log(error);
      }
    )
  }
}
