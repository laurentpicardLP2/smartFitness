import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityCategoryBookingComponent } from './facility-category-booking.component';

describe('FacilityCategoryBookingComponent', () => {
  let component: FacilityCategoryBookingComponent;
  let fixture: ComponentFixture<FacilityCategoryBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilityCategoryBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityCategoryBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
