import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoginMessage } from 'src/app/models/login-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: LoginMessage = new LoginMessage('','');
  status: string = '';

  constructor(private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {}

  public logIn(): void
  {
    if(this.login.password.length > 0 && this.login.username.length > 0) {
      this.loginService.logIn(this.login)
      .subscribe(
        data => {
          if('username' in data && data.username == this.login.username)
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
        
    if(error.startsWith('No user exists')) {
      this.status = 'Incorrect username or password';
    }
    if(error.startsWith('Incorrect password')) {
      this.status = 'Incorrect username or password';
    }
    if(error.startsWith('Logout before')) {
      this.status = 'You are already logged in';
    }
  }

}
