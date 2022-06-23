import { TestBed } from '@angular/core/testing';

import { HandleErrorService } from './handle-error.service';

describe('HandleErrorServiceService', () => {
  let service: HandleErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
