import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user = new User('','','','','');
  username: string = '';
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
}
