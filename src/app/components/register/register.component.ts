import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user = new User();
  public clientMessage = new ClientMessage('');
  postId: any;
  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    

  }
  public registerUser(): void
  {
    this.userService.registerUser(this.user)
      .subscribe( // subscribe to the data returned and do something like generate client message
        data => {
          const user: User = data.body;
          this.clientMessage.message = `Successfully registered ${user.firstName}`;
          this.router.navigate(['/home']);
        },
        error => {
          this.clientMessage.message = `Something went wrong. Error: ${error}`; 
          console.log(error)
        }
      );
  }
}
