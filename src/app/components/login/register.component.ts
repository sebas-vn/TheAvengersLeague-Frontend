import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user = new User('', '', '', '', '');
  public clientMessage = new ClientMessage('');
  postId: any;
  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
 

  }
  public registerUser(): void
  {
    console.log(this.user);
    this.userService.registerUser(this.user)
      .subscribe( // subscribe to the data returned and do something like generate client message
        data => this.clientMessage.message = `Successfully registered ${data.firstName}`,   // console.log(`successfully added ${data.firstName}`)
        error => this.clientMessage.message = `Something went wrong. Error: ${error}` // console.error(`We got an error: ${error}` 
      )
  }
}
