import { TestBed } from '@angular/core/testing';

import { FacilityCategoryService } from './facility-category.service';

describe('FacilityCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacilityCategoryService = TestBed.get(FacilityCategoryService);
    expect(service).toBeTruthy();
  });
});
