import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user = new User('','','','','');
  constructor(user: User) {
    this.user = user;
  }
}
