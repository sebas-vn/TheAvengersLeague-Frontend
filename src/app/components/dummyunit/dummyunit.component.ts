import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dummyunit',
  templateUrl: './dummyunit.component.html',
  styleUrls: ['./dummyunit.component.css']
})
export class DummyunitComponent {

  @Input('name') itemName;
  @Input('squareArray') squareArr;
  @Input() index;
  
  constructor() { }

}
