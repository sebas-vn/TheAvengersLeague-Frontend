import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
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
  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required, Validators.minLength(3)])
  username = new FormControl('', [Validators.required, Validators.minLength(3)])
  first = new FormControl('', [Validators.required])
  last = new FormControl('', [Validators.required])
  taken = false;
  errorMessages: {[key : string]: string} = {
    nothing: "You must enter a value",
    short: "Too small",
    invEmail: "Invalid email",
    taken: "Username is already taken"
  }
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
  private registerStatus(error: string): void
  {        
    this.taken = true;
  }
}
