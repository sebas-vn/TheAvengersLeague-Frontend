import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user = new User('', '', '', '', '');
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
  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    

  }
  public registerUser(): void
  {
    this.userService.registerUser(this.user)
      .subscribe( // subscribe to the data returned and do something like generate client message
        data => {this.user = data; this.clientMessage.message = `Successfully registered ${data.firstName}`; console.log(data);  this.registerStatus(JSON.stringify(data))},   // console.log(`successfully added ${data.firstName}`)
        error => {this.clientMessage.message = `Something went wrong. Error: ${error}`; this.registerStatus(error)} // console.error(`We got an error: ${error}` 
      )
  }
  private registerStatus(error: string): void
  {        
    this.taken = true;
  }
}
