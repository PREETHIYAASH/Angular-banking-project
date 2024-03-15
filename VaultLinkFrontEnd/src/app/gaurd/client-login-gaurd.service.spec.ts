import { TestBed } from '@angular/core/testing';

import { ClientLoginGaurdService } from './client-login-gaurd.service';

describe('ClientLoginGaurdService', () => {
  let service: ClientLoginGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientLoginGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
