import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-door',
  templateUrl: './front-door.component.html',
  styleUrls: ['./front-door.component.css']
})
export class FrontDoorComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrent()
      .subscribe(
        data => {
          if('email' in data.body)
            this.router.navigate(['/home']);
        }
      );
  }
}
