import { AppComponent } from './../app.component';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user = new User('','','','','');
  username: string = '';
  pass: string = '';
  constructor(private userService: UserService) {  }
  public findByUsername() : boolean 
  {
    let exists: boolean = true;
    this.userService.findByUsername(this.username)
      .subscribe(data => this.user = data)
    if(this.user == null)
    {
      exists = false;
    }
    return exists;
  }
  public logIn(pass: string) : boolean
  {
    let passMatch = false;
    if(this.pass == this.user.password)
    {
      passMatch = true;
      AppComponent.logIn();
    }
    return passMatch;
  }
}
