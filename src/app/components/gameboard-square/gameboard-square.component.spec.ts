import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameboardSquareComponent } from './gameboard-square.component';

describe('GameboardSquareComponent', () => {
  let component: GameboardSquareComponent;
  let fixture: ComponentFixture<GameboardSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameboardSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameboardSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
