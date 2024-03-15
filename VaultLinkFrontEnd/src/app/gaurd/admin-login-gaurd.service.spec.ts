import { TestBed } from '@angular/core/testing';

import { AdminLoginGaurdService } from './admin-login-gaurd.service';

describe('AdminLoginGaurdService', () => {
  let service: AdminLoginGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLoginGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
