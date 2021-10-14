import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyunitComponent } from './dummyunit.component';

describe('DummyunitComponent', () => {
  let component: DummyunitComponent;
  let fixture: ComponentFixture<DummyunitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyunitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
