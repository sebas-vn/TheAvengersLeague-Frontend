import { TestBed } from '@angular/core/testing';

import { TestgameService } from './testgame.service';

describe('TestgameService', () => {
  let service: TestgameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestgameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
