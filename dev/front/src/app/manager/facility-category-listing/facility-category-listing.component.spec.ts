import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityCategoryListingComponent } from './facility-category-listing.component';

describe('FacilityCategoryListingComponent', () => {
  let component: FacilityCategoryListingComponent;
  let fixture: ComponentFixture<FacilityCategoryListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityCategoryListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityCategoryListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
