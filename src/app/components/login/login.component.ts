import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User('', '', '', '', '');
  public clientMessage = new ClientMessage('');


  constructor(private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
  }
  public logIn(): void
  {
    this.loginService.logIn(this.user.password)
  }

}
