import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoginMessage } from 'src/app/models/login-message';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LoginMessage = new LoginMessage('','');
  status: string = '';

  constructor(private router: Router, private userService: UserService) { }
  ngOnInit(): void {}

  public logIn(): void
  {
    if(this.login.password.length > 0 && this.login.username.length > 0) {
      this.userService.logIn(this.login)
      .subscribe(
        data => {
          const user: User = data.body;
          if('email' in data.body && user.username == this.login.username)
            this.router.navigate(['/home']);
        },
        error => {
          console.log(`Error occured trying to login: ${error}`);
          this.showLoginStatus(error);
        }
      );
    }
  }

  private showLoginStatus(error: string): void
  {
    this.status = 'Failed to login';
        
    if(error.startsWith('no user exists')) {
      this.status = 'Incorrect username or password';
    }
    if(error.startsWith('incorrect password')) {
      this.status = 'Incorrect username or password';
    }
    if(error.startsWith('logout before')) {
      this.status = 'You are already logged in';
    }
  }

}
