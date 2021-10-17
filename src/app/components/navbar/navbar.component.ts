import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user = new User('', '', '', '', '')
  align: string;
  constructor(private userService: UserService, private http: HttpClient) { }

  ngOnInit(): void {
    this.align = "hero";
  }
  public logOut(): void
  {
    this.userService.logOut()
      .subscribe(data => this.user = data);
  }
  public switchAlignment(): void
  {
    if(this.align == "hero")
    {
      this.align = "villain";
    }
    else
    {
      if(this.align == "villain")
      {
        this.align = "hero";
      }
    }
  }
}
