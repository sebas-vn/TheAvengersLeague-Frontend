import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public user: User | undefined;
  public clientMessage = new ClientMessage('');
  postId: any;
  constructor(private route: ActivatedRoute, private updateService: UpdateService, private http: HttpClient, private location: Location) { }

  ngOnInit(): void {
    this.getUser()
  }
  public update(): void
  {
    if(this.user)
    {
      console.log(this.user);
      this.updateService.updateUser(this.user);
    }
  }
  public getUser(): void
  {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.updateService.getUser(id)
     .subscribe(user => this.user = user);
  }

}
