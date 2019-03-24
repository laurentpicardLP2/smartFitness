import { TestBed } from '@angular/core/testing';

import { AuthGuardCustomerService } from './auth-guard-customer.service';

describe('AuthGuardCustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardCustomerService = TestBed.get(AuthGuardCustomerService);
    expect(service).toBeTruthy();
  });
});
