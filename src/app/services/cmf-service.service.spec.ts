import { TestBed } from '@angular/core/testing';

import { CmfServiceService } from './cmf-service.service';

describe('CmfServiceService', () => {
  let service: CmfServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmfServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
