import { TestBed } from '@angular/core/testing';

import { SyntheseService } from './synthese.service';

describe('SyntheseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SyntheseService = TestBed.get(SyntheseService);
    expect(service).toBeTruthy();
  });
});
