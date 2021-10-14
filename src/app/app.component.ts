import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  login: boolean = false;
  static login: boolean;
  public static logIn(): void
  {
    this.login=true;
  }
  public static logOut(): void
  {
    if(this.login == true)
    {
      this.login = false;
    }
  }
}
