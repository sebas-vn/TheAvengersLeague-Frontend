import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = new User('', '', '', '', '')
  constructor(private router: Router, private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
  }
  public logOut(): void
  {
    this.userService.logOut()
      .subscribe(
        data => {
          this.user = data;
          this.router.navigate(['/front-door']);
        },
        error => console.log(`Failed to log out: ${error}`)
      );
  }
}
