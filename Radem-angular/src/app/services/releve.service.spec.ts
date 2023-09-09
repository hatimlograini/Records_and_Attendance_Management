import { TestBed } from '@angular/core/testing';

import { ReleveService } from './releve.service';

describe('ReleveService', () => {
  let service: ReleveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReleveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
