import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityListingComponent } from './facility-listing.component';

describe('FacilityListingComponent', () => {
  let component: FacilityListingComponent;
  let fixture: ComponentFixture<FacilityListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
