import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngameCardHeroComponent } from './ingame-card-hero.component';

describe('IngameCardHeroComponent', () => {
  let component: IngameCardHeroComponent;
  let fixture: ComponentFixture<IngameCardHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngameCardHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngameCardHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
