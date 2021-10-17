import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserInventory } from 'src/app/models/user-inventory';

@Component({
  selector: 'app-dummyunit',
  templateUrl: './dummyunit.component.html',
  styleUrls: ['./dummyunit.component.css']
})
export class DummyunitComponent {

  user: User = new User();
  inventory: UserInventory;

  @Input('name') itemName;
  @Input('squareArray') squareArr;
  @Input() index;
  
  constructor(private userService:UserService, private router: Router) { }


  ngOnInit(): void {

    this.userService.getCurrent()
    .subscribe(
      data => {
        if('email' in data.body) {
          this.user = data.body;
          this.userService.getInventory(this.user.id)
            .subscribe(data => {
              this.inventory = data.body;
            });
        } else {
          this.router.navigate(['/front-door']);
        }
      },
      error => this.router.navigate(['/front-door'])
    );
  }

  

}
