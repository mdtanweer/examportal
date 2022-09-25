import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public user:User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: 0,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  formSubmit() {
    
    //saving data to backend
    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        console.log(data);
        Swal.fire("Successfully Registered!","Username "+data.username, "success");
        
      },
      (error) => {
        console.log(error);
        alert('Something went wrong !');
      }
    );
  }
}
