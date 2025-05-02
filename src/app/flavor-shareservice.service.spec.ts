import { TestBed } from '@angular/core/testing';

import { FlavorShareserviceService } from './flavor-shareservice.service';

describe('FlavorShareserviceService', () => {
  let service: FlavorShareserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlavorShareserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
