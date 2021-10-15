import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDoorComponent } from './front-door.component';

describe('FrontDoorComponent', () => {
  let component: FrontDoorComponent;
  let fixture: ComponentFixture<FrontDoorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontDoorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontDoorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
