import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ClientMessage } from 'src/app/models/client-message';
import { User } from 'src/app/models/user';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public user = new User('', '', '', '', '');
  public clientMessage = new ClientMessage('');
  postId: any;
  constructor(private updateService: UpdateService, private http: HttpClient) { }

  ngOnInit(): void {
  }
  public update(): void
  {
    if(this.user)
    {
      console.log(this.user);
      this.updateService.updateUser(this.user);
    }
  }
  public getUser(id: number): void
  {
    this.updateService.getUser(id);
  }

}
