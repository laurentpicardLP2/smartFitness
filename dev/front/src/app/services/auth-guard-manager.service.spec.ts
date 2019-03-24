import { TestBed } from '@angular/core/testing';

import { AuthGuardManagerService } from './auth-guard-manager.service';

describe('AuthGuardManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardManagerService = TestBed.get(AuthGuardManagerService);
    expect(service).toBeTruthy();
  });
});
